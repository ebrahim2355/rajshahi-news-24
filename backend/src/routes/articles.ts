import { Router } from "express";
import { ArticleModel } from "../models/Article.js";
import { isDbReady } from "../db.js";
import { CommentModel } from "../models/Comment.js";
import { UserModel } from "../models/User.js";
import { requireUser, type AuthedRequest } from "../middleware/auth.js";
import { Types } from "mongoose";

type GalleryItem = { imageSrc: string; imageAlt: string };
type VideoItem = { url: string; title?: string };

type LeanArticle = {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  summary?: string;
  content: string;
  category: string;
  timeAgo: string;
  imageSrc: string;
  imageAlt: string;
  imageGallery?: GalleryItem[];
  videos?: VideoItem[];
};

export const articlesRouter = Router();

articlesRouter.get("/", async (_req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  const items = await ArticleModel.find()
    .sort({ createdAt: -1 })
    .select("slug title summary category timeAgo imageSrc imageAlt")
    .lean();
  return res.json({ articles: items });
});

articlesRouter.get("/:slug/comments", async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  const articleDoc = (await ArticleModel.findOne({ slug: req.params.slug }).lean()) as LeanArticle | null;
  if (!articleDoc) {
    return res.status(404).json({ error: "Article not found" });
  }
  const rows = await CommentModel.find({ article: articleDoc._id })
    .sort({ createdAt: -1 })
    .populate("user", "name picture")
    .lean();
  const comments = rows.map((c) => {
    const u = c.user as { name?: string; picture?: string } | null;
    return {
      id: String(c._id),
      text: c.text,
      createdAt: c.createdAt,
      user: {
        name: u?.name ?? "User",
        picture: u?.picture,
      },
    };
  });
  return res.json({ comments });
});

articlesRouter.post("/:slug/comments", requireUser, async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  const userId = (req as AuthedRequest & { userId: string }).userId;
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }
  const article = await ArticleModel.findOne({ slug: req.params.slug });
  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }
  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user" });
  }
  const u = await UserModel.findById(userId);
  if (!u) {
    return res.status(401).json({ error: "User not found" });
  }
  const c = await CommentModel.create({
    article: article._id,
    user: u._id,
    text: text.slice(0, 2000),
  });
  return res.status(201).json({
    comment: {
      id: String(c._id),
      text: c.text,
      createdAt: (c as { createdAt: Date }).createdAt,
      user: { name: u.name, picture: u.picture },
    },
  });
});

articlesRouter.get("/:slug", async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  const d = (await ArticleModel.findOne({ slug: req.params.slug }).lean()) as LeanArticle | null;
  if (!d) {
    return res.status(404).json({ error: "Article not found" });
  }
  const body: {
    id: string;
    slug: string;
    title: string;
    summary?: string;
    content: string;
    category: string;
    timeAgo: string;
    imageSrc: string;
    imageAlt: string;
    imageGallery?: GalleryItem[];
    videos?: VideoItem[];
  } = {
    id: String(d._id),
    slug: d.slug,
    title: d.title,
    summary: d.summary,
    content: d.content,
    category: d.category,
    timeAgo: d.timeAgo,
    imageSrc: d.imageSrc,
    imageAlt: d.imageAlt,
  };
  if (d.imageGallery && d.imageGallery.length > 0) {
    body.imageGallery = d.imageGallery;
  }
  if (d.videos && d.videos.length > 0) {
    body.videos = d.videos;
  }
  return res.json({ article: body });
});
