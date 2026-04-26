import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import multer, { type FileFilterCallback } from "multer";
import { ArticleModel } from "../models/Article.js";
import { isDbReady } from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../../..");
const UPLOAD_DIR = path.join(PROJECT_ROOT, "public", "uploads", "articles");
const VIDEO_DIR = path.join(PROJECT_ROOT, "public", "uploads", "videos");

const webPathImage = (filename: string) => `/uploads/articles/${filename}`;
const webPathVideo = (filename: string) => `/uploads/videos/${filename}`;

function ensureDirImage() {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
function ensureDirVideo() {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.fieldname === "videoFiles") {
      ensureDirVideo();
      cb(null, VIDEO_DIR);
    } else {
      ensureDirImage();
      cb(null, UPLOAD_DIR);
    }
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    if (file.fieldname === "videoFiles") {
      const safe = ext && ext.length < 7 ? ext.toLowerCase() : ".mp4";
      const name = `v-${Date.now()}-${randomBytes(4).toString("hex")}${safe}`;
      cb(null, name);
      return;
    }
    const safe = ext && ext.length <= 8 ? ext.toLowerCase() : ".jpg";
    const name = `${Date.now()}-${randomBytes(5).toString("hex")}${safe}`;
    cb(null, name);
  },
});

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  if (file.fieldname === "mainImage" || file.fieldname === "gallery") {
    if (/^image\/(jpeg|png|webp|gif)$/i.test(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("মূল/গ্যালারি: শুধু JPEG, PNG, WebP বা GIF।"));
    return;
  }
  if (file.fieldname === "videoFiles") {
    if (/^video\//i.test(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("ভিডিও: শুধু স্ট্যান্ডার্ড ভিডিও ফরম্যাট (যেমন MP4, WebM)।"));
    return;
  }
  cb(new Error("অজানা ফিল্ড"));
}

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB per file (images usually smaller; videos up to this)
    files: 50,
  },
  fileFilter,
});

type GalleryIn = { imageSrc: string; imageAlt: string };
type VideoIn = { url: string; title?: string };

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

function trimString(v: unknown, max: number, fallback: string = ""): string {
  if (typeof v !== "string") return fallback;
  return v.trim().slice(0, max);
}

function unlinkUploaded(files: Express.Multer.File[] | undefined) {
  if (!files) return;
  for (const f of files) {
    try {
      if (f.path) fs.unlinkSync(f.path);
    } catch {
      // ignore
    }
  }
}

type MulterFieldFiles = { [field: string]: Express.Multer.File[] };

function parseTitlesJson(s: string | undefined): string[] {
  if (!s || !s.trim()) return [];
  try {
    const a = JSON.parse(s) as unknown;
    if (!Array.isArray(a)) return [];
    return a.map((x) => (typeof x === "string" ? x : ""));
  } catch {
    return [];
  }
}

export const adminRouter = Router();

/**
 * Create a news article. Multipart: mainImage, gallery[], videoFiles[], text fields, galleryAlts, videoTitles (JSON string arrays for each file list order).
 * Unauthenticated (secure later).
 */
adminRouter.post(
  "/articles",
  (req, res, next) => {
    const handler = upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "gallery", maxCount: 25 },
      { name: "videoFiles", maxCount: 15 },
    ]);
    handler(req, res, (err) => {
      if (err) {
        const msg = err instanceof Error ? err.message : "Upload error";
        return res.status(400).json({ error: msg });
      }
      next();
    });
  },
  async (req, res) => {
    const files = req.files as MulterFieldFiles | undefined;
    const mainList = files?.mainImage;
    const galleryList = files?.gallery ?? [];
    const videoList = files?.videoFiles ?? [];

    const cleanupAll = () => {
      unlinkUploaded(mainList);
      unlinkUploaded(galleryList);
      unlinkUploaded(videoList);
    };

    if (!isDbReady()) {
      cleanupAll();
      return res.status(503).json({ error: "Database unavailable" });
    }

    const b = req.body as Record<string, string | undefined>;
    if (!b || typeof b !== "object") {
      cleanupAll();
      return res.status(400).json({ error: "Invalid form" });
    }

    const slug = trimString(b.slug, 120).toLowerCase();
    if (!slug || !SLUG.test(slug)) {
      cleanupAll();
      return res.status(400).json({
        error: "slug is required and must be lowercase Latin, e.g. my-news-title",
      });
    }

    const title = trimString(b.title, 400);
    const content = trimString(b.content, 200_000);
    const category = trimString(b.category, 100);
    const timeAgo = trimString(b.timeAgo, 80) || "এইমাত্র";
    const imageAlt = trimString(b.imageAlt, 500);
    const summary = b.summary == null || b.summary === "" ? undefined : trimString(b.summary, 2_000);

    if (!title || !content || !category || !imageAlt) {
      cleanupAll();
      return res.status(400).json({
        error: "title, content, category, and imageAlt are required",
      });
    }

    if (!mainList?.[0]) {
      cleanupAll();
      return res.status(400).json({ error: "A main image file is required" });
    }

    for (const f of [...mainList, ...galleryList]) {
      if (f.size > MAX_IMAGE_BYTES) {
        cleanupAll();
        return res.status(400).json({
          error: "ছবির আকার সর্বোচ্চ ৮ মেগাবাইট। ভিডিও আলাদা সীমা (১০০ মেগাবাইট)।",
        });
      }
    }

    const taken = await ArticleModel.findOne({ slug }).lean();
    if (taken) {
      cleanupAll();
      return res.status(409).json({ error: "An article with this slug already exists" });
    }

    const mainFile = mainList[0];
    const imageSrc = webPathImage(mainFile.filename);

    const vTitles = parseTitlesJson(b.videoTitles);
    const videos: VideoIn[] = [];
    for (let i = 0; i < videoList.length; i++) {
      const f = videoList[i]!;
      const t = trimString(vTitles[i], 200) || `ভিডিও ${i + 1}`;
      videos.push({ url: webPathVideo(f.filename), title: t });
    }

    const alts = parseTitlesJson(b.galleryAlts);
    const imageGallery: GalleryIn[] = [];
    for (let i = 0; i < galleryList.length; i++) {
      const f = galleryList[i]!;
      const alt = trimString(alts[i], 500) || `গ্যালারি ${i + 1}`;
      imageGallery.push({ imageSrc: webPathImage(f.filename), imageAlt: alt });
    }

    const doc = await ArticleModel.create({
      slug,
      title,
      summary,
      content,
      category,
      timeAgo,
      imageSrc,
      imageAlt,
      imageGallery: imageGallery.length > 0 ? imageGallery : undefined,
      videos: videos.length > 0 ? videos : undefined,
    });

    return res.status(201).json({
      article: {
        id: String(doc._id),
        slug: doc.slug,
        title: doc.title,
      },
    });
  }
);
