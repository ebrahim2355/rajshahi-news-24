"use client";

import { useState } from "react";
import Link from "next/link";
import { clientFormData } from "@/lib/api-client";

type GalleryRow = { id: string; file: File | null; alt: string };
type VideoRow = { id: string; file: File | null; title: string };

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `g-${Date.now()}-${Math.random()}`;

const emptyG = (): GalleryRow => ({ id: newId(), file: null, alt: "" });
const emptyV = (): VideoRow => ({ id: newId(), file: null, title: "" });

/** Same border/padding as text inputs; `file:` only styles the native file button. */
const fileInputClassMain =
  "w-full cursor-pointer rounded border border-border px-3 py-2 " +
  "file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-zinc-100 file:px-3 file:py-1 file:text-sm";

const fileInputClassRow =
  "w-full cursor-pointer rounded border border-border px-2 py-1.5 " +
  "file:mr-2 file:cursor-pointer file:rounded file:border-0 file:bg-zinc-100 file:px-2 file:py-0.5 file:text-sm";

export function AdminArticleForm() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("জাতীয়");
  const [timeAgo, setTimeAgo] = useState("এইমাত্র");
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  const [gallery, setGallery] = useState<GalleryRow[]>([]);
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "ok" | "err";
    text: string;
    slug?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!mainFile) {
      setMessage({ type: "err", text: "মূল ছবি বেছে নিন।" });
      return;
    }
    setSaving(true);

    const videoFiles = videos.filter((r) => r.file);
    const videoTitles = videoFiles.map((r) => r.title.trim() || "ভিডিও");
    const galleryFiles = gallery.filter((r) => r.file);
    const alts = galleryFiles.map((r) => (r.alt.trim() || "গ্যালারি ছবি"));

    const form = new FormData();
    form.set("slug", slug.trim().toLowerCase());
    form.set("title", title.trim());
    if (summary.trim()) form.set("summary", summary.trim());
    form.set("content", content.trim());
    form.set("category", category.trim());
    form.set("timeAgo", timeAgo.trim() || "এইমাত্র");
    form.set("imageAlt", imageAlt.trim());
    form.set("mainImage", mainFile);
    for (const g of galleryFiles) {
      if (g.file) form.append("gallery", g.file);
    }
    form.set("galleryAlts", JSON.stringify(alts));
    for (const v of videoFiles) {
      if (v.file) form.append("videoFiles", v.file);
    }
    if (videoTitles.length > 0) {
      form.set("videoTitles", JSON.stringify(videoTitles));
    }

    const res = await clientFormData<{
      article: { id: string; slug: string; title: string };
    }>("/api/admin/articles", form);

    setSaving(false);
    if (res.ok && res.data?.article) {
      setMessage({
        type: "ok",
        text: "খবর সেভ হয়েছে।",
        slug: res.data.article.slug,
      });
      return;
    }
    setMessage({
      type: "err",
      text: res.error ?? "অনুরোধ ব্যর্থ।",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded border border-border bg-white p-6 shadow-sm"
      encType="multipart/form-data"
    >
      {message && (
        <div
          role="alert"
          className={
            message.type === "ok"
              ? "rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900"
              : "rounded border border-red-200 bg-red-50 p-3 text-sm text-red-900"
          }
        >
          {message.text}
          {message.type === "ok" && message.slug && (
            <p className="mt-1">
              <Link
                className="font-semibold text-brand underline"
                href={`/news/${encodeURIComponent(message.slug)}`}
              >
                পাতাটি দেখুন → /news/{message.slug}
              </Link>
            </p>
          )}
        </div>
      )}

      <p className="text-sm text-muted">
        অ্যাডমিন — এখনো লক করা হয়নি। <strong>slug</strong> শুধু ইংরেজি ছোট হাতের অক্ষর, সংখ্যা ও হাইফেন
        (যেমন <code className="rounded bg-zinc-100 px-1">amader-khobor-2026</code>)।
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-bold uppercase text-muted">Slug (URL) *</span>
          <input
            className="mt-1 w-full rounded border border-border px-3 py-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            title="অনুমোদিত: a-z, 0-9, হাইফেন"
            placeholder="bonya-protirodh"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase text-muted">বিভাগ *</span>
          <input
            className="mt-1 w-full rounded border border-border px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="জাতীয়"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-bold uppercase text-muted">শিরোনাম *</span>
        <input
          className="mt-1 w-full rounded border border-border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase text-muted">সারাংশ</span>
        <textarea
          className="mt-1 min-h-[4rem] w-full rounded border border-border px-3 py-2"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase text-muted">মূল বিষয়বস্তু * (অনুচ্ছেদ — খালি সারিতে পৃথক)</span>
        <textarea
          className="mt-1 min-h-[12rem] w-full rounded border border-border px-3 py-2 font-mono text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>

      <label className="block sm:max-w-xs">
        <span className="text-xs font-bold uppercase text-muted">সময় (প্রদর্শন) *</span>
        <input
          className="mt-1 w-full rounded border border-border px-3 py-2"
          value={timeAgo}
          onChange={(e) => setTimeAgo(e.target.value)}
        />
      </label>

      <div className="border-t border-border pt-4">
        <h2 className="text-sm font-bold uppercase text-muted">মুখ্য ছবি *</h2>
        <p className="text-xs text-muted">
          ফাইল — JPEG, PNG, WebP বা GIF (সর্বোচ্চ ~৮ মেগাবাইট)। সার্ভারে <code className="rounded bg-zinc-100 px-1">/uploads/articles/</code> এ
          সেভ হবে।
        </p>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium">চিত্র ফাইল *</span>
            <input
              className={`mt-1 ${fileInputClassMain}`}
              onChange={(e) => {
                const f = e.target.files?.[0];
                setMainFile(f ?? null);
              }}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              required
            />
            {mainFile && (
              <p className="mt-0.5 text-xs text-muted">{mainFile.name}</p>
            )}
          </label>
          <label className="block">
            <span className="text-xs font-medium">বিকল্প টেক্সট (alt) *</span>
            <input
              className="mt-1 w-full rounded border border-border px-3 py-2"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              required
            />
          </label>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold uppercase text-muted">অতিরিক্ত ছবি</h2>
          <button
            type="button"
            className="rounded border border-border bg-section-gray px-2 py-1 text-xs font-semibold"
            onClick={() => setGallery((g) => [...g, emptyG()])}
          >
            + ছবি সারি
          </button>
        </div>
        <p className="text-xs text-muted">প্রতি সারিতে ফাইল ও বর্ণনা; ক্রম সেভে মিলিয়ে যাবে।</p>
        <ul className="mt-2 space-y-3">
          {gallery.map((row) => (
            <li
              key={row.id}
              className="flex flex-col gap-2 rounded border border-border p-3 sm:flex-row sm:items-end"
            >
              <label className="min-w-0 flex-1">
                <span className="text-xs">ফাইল</span>
                <input
                  className={`mt-0.5 ${fileInputClassRow}`}
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setGallery((list) =>
                      list.map((r) => (r.id === row.id ? { ...r, file: f } : r))
                    );
                  }}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                />
                {row.file && (
                  <p className="text-xs text-muted">{row.file.name}</p>
                )}
              </label>
              <label className="min-w-0 flex-1">
                <span className="text-xs">বর্ণনা</span>
                <input
                  className="mt-0.5 w-full rounded border border-border px-2 py-1.5"
                  value={row.alt}
                  onChange={(e) => {
                    const v = e.target.value;
                    setGallery((list) =>
                      list.map((r) => (r.id === row.id ? { ...r, alt: v } : r))
                    );
                  }}
                />
              </label>
              <button
                type="button"
                className="shrink-0 text-xs text-red-600 hover:underline"
                onClick={() => setGallery((g) => g.filter((r) => r.id !== row.id))}
              >
                সরান
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold uppercase text-muted">ভিডিও</h2>
          <button
            type="button"
            className="rounded border border-border bg-section-gray px-2 py-1 text-xs font-semibold"
            onClick={() => setVideos((v) => [...v, emptyV()])}
          >
            + ভিডিও
          </button>
        </div>
        <p className="text-xs text-muted">
          MP4, WebM, Ogg ইত্যাদি (সর্বোচ্চ ~১০০ মেগাবাইট/ফাইল)। সেভ: <code className="rounded bg-zinc-100 px-1">/uploads/videos/</code>।
        </p>
        <ul className="mt-2 space-y-3">
          {videos.map((row) => (
            <li
              key={row.id}
              className="flex flex-col gap-2 rounded border border-border p-3 sm:flex-row sm:items-end"
            >
              <label className="min-w-0 flex-1">
                <span className="text-xs">ভিডিও ফাইল *</span>
                <input
                  className={`mt-0.5 ${fileInputClassRow}`}
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setVideos((list) =>
                      list.map((r) => (r.id === row.id ? { ...r, file: f } : r))
                    );
                  }}
                  type="file"
                  accept="video/*,.mp4,.webm,.ogg,.ogv,.mov"
                />
                {row.file && (
                  <p className="text-xs text-muted">{row.file.name}</p>
                )}
              </label>
              <label className="min-w-0 flex-1">
                <span className="text-xs">শিরোনাম (ঐচ্ছিক)</span>
                <input
                  className="mt-0.5 w-full rounded border border-border px-2 py-1.5"
                  value={row.title}
                  onChange={(e) => {
                    const v = e.target.value;
                    setVideos((list) =>
                      list.map((r) => (r.id === row.id ? { ...r, title: v } : r))
                    );
                  }}
                />
              </label>
              <button
                type="button"
                className="shrink-0 text-xs text-red-600 hover:underline"
                onClick={() => setVideos((v) => v.filter((r) => r.id !== row.id))}
              >
                সরান
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border pt-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-brand px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          {saving ? "সেভ হচ্ছে…" : "প্রকাশ / সেভ"}
        </button>
      </div>
    </form>
  );
}
