"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-context";
import { clientFetch } from "@/lib/api-client";

type CRow = {
  id: string;
  text: string;
  createdAt: string;
  user: { name: string; picture?: string };
};

export function CommentSection({ slug }: { slug: string }) {
  const { user, login, loading: authLoading } = useAuth();
  const [items, setItems] = useState<CRow[]>([]);
  const [text, setText] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    setErr(null);
    setLoading(true);
    const res = await clientFetch<{ comments: CRow[] }>(
      `/api/articles/${encodeURIComponent(slug)}/comments`
    );
    if (!res.ok) {
      setErr(res.error ?? "মন্তব্য লোড করা যায়নি");
    } else {
      setItems(res.data?.comments ?? []);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim() || sending) return;
    setSending(true);
    setErr(null);
    const res = await clientFetch<{ comment: CRow }>(
      `/api/articles/${encodeURIComponent(slug)}/comments`,
      { method: "POST", body: JSON.stringify({ text: text.trim() }) }
    );
    if (!res.ok) {
      setErr(res.error ?? "পাঠানো যায়নি");
      setSending(false);
      return;
    }
    if (res.data?.comment) {
      setItems((p) => [res.data!.comment, ...p]);
    }
    setText("");
    setSending(false);
  };

  return (
    <section
      className="border-t-2 border-border pt-8 scroll-mt-24"
      id="comments"
      aria-label="মন্তব্য"
    >
      <h2 className="text-xl font-extrabold">মন্তব্য</h2>
      <p className="mt-1 text-sm text-muted">
        {user ? "আপনি লগইন আছেন — নিচে মন্তব্য লিখতে পারেন।" : "নিচে Facebook দিয়ে লগইন করে মন্তব্য করতে পারবেন।"}
      </p>
      {loading && <p className="mt-2 text-sm text-muted">মন্তব্যের তালিকা লোড হচ্ছে…</p>}
      {err && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {err}
        </p>
      )}
      <ul className="mt-4 space-y-4">
        {items.map((c) => (
          <li key={c.id} className="rounded-sm border border-border bg-white/80 p-3">
            <p className="text-xs font-bold text-muted">{c.user.name}</p>
            <p className="mt-1 whitespace-pre-wrap text-[15px] text-foreground">{c.text}</p>
            <p className="mt-1 text-xs text-muted">
              {new Date(c.createdAt).toLocaleString("bn-BD", { dateStyle: "short", timeStyle: "short" })}
            </p>
          </li>
        ))}
      </ul>
      {!user && (
        <p className="mt-4 text-sm text-muted">
          {authLoading ? (
            "সেশন যাচাই হচ্ছে…"
          ) : (
            <>
              মন্তব্য করতে{" "}
              <button
                type="button"
                onClick={login}
                className="font-bold text-brand underline decoration-brand/40 underline-offset-2 hover:decoration-brand"
              >
                Facebook দিয়ে লগইন
              </button>{" "}
              করুন।
            </>
          )}
        </p>
      )}
      {user && (
        <form onSubmit={submit} className="mt-4">
          <label htmlFor="comment-text" className="text-sm font-semibold text-foreground/90">
            আপনার মন্তব্য
          </label>
          <textarea
            id="comment-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            maxLength={2000}
            className="mt-2 w-full rounded-sm border border-border bg-white p-2 text-[15px] text-foreground shadow-inner outline-none focus:border-brand"
            placeholder="সংবেদনশীলতা বজায় রাখতে অনুরোধ করি…"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="mt-2 rounded-sm bg-foreground px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {sending ? "পাঠানো হচ্ছে…" : "মন্তব্য পাঠান"}
          </button>
        </form>
      )}
    </section>
  );
}
