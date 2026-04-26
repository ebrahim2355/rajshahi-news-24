"use client";

import { useCallback, useEffect, useState } from "react";
import { clientFetch, postPollVote } from "@/lib/api-client";
import { Container } from "./container";

type PollOption = { id: string; text: string; count: number };
type Poll = { id: string; question: string; options: PollOption[] };

export function LandingPoll() {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);

  const load = useCallback(async () => {
    setErr(null);
    setLoading(true);
    const out = await clientFetch<{ poll: Poll | null }>("/api/polls/current");
    if (!out.ok) {
      setErr(out.error ?? "পোল লোড করা যায়নি");
      setPoll(null);
    } else if (out.data?.poll) {
      setPoll(out.data.poll);
    } else {
      setPoll(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const total = poll?.options.reduce((a, o) => a + (o.count ?? 0), 0) ?? 0;

  const onVote = async (optionId: string) => {
    if (!poll || voting) return;
    setVoting(true);
    setErr(null);
    const res = await postPollVote(poll.id, optionId);
    if (!res.ok || !res.data?.poll) {
      setErr(res.error ?? "ভোট দেওয়া যায়নি");
      setVoting(false);
      return;
    }
    setPoll(res.data.poll as Poll);
    setVoting(false);
  };

  if (loading) {
    return (
      <section className="border-t border-border bg-section-gray/50 py-10" aria-busy="true">
        <Container>
          <p className="text-sm text-muted">পোল লোড হচ্ছে…</p>
        </Container>
      </section>
    );
  }

  if (!poll) {
    return null;
  }

  return (
    <section className="border-t border-border bg-section-gray/50 py-10" aria-labelledby="poll-heading">
      <Container>
        <h2 id="poll-heading" className="text-lg font-extrabold tracking-tight text-foreground">
          পাঠক জরিপ
        </h2>
        <p className="mt-2 text-base font-semibold text-foreground/90">{poll.question}</p>
        {err && (
          <p className="mt-2 text-sm text-red-700" role="alert">
            {err}
          </p>
        )}
        <ul className="mt-4 space-y-3">
          {poll.options.map((o) => {
            const pct = total > 0 ? Math.round(((o.count ?? 0) / total) * 100) : 0;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  disabled={voting}
                  onClick={() => void onVote(o.id)}
                  className="group w-full rounded-sm border border-border bg-white p-3 text-left transition hover:border-brand disabled:opacity-60"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-foreground group-hover:text-brand">{o.text}</span>
                    <span className="text-xs text-muted">
                      {o.count ?? 0} ভোট · {pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100" aria-hidden>
                    <div
                      className="h-full rounded-full bg-brand transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-muted">
          একবার ভোট দিতে পারবেন। ফেসবুকে লগইন থাকলে অ্যাকাউন্ট অনুযায়ী, না থাকলে এই ডিভাইসের জন্য একক ভোট।
        </p>
      </Container>
    </section>
  );
}
