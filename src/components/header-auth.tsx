"use client";

import { useAuth } from "@/components/auth/auth-context";

export function HeaderAuth() {
  const { user, ready, login, logout, loading, error } = useAuth();

  if (!ready) {
    return <span className="text-zinc-500">…</span>;
  }
  if (user) {
    return (
      <span className="flex max-w-full flex-wrap items-center gap-2">
        {user.picture && (
          <img
            src={user.picture}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 rounded-full border border-zinc-500"
            referrerPolicy="no-referrer"
          />
        )}
        <span className="max-w-[140px] truncate text-zinc-200" title={user.name}>
          {user.name}
        </span>
        <button
          type="button"
          onClick={logout}
          className="rounded border border-zinc-500 px-2 py-0.5 text-xs font-medium text-zinc-200 hover:border-white hover:text-white"
        >
          লগআউট
        </button>
      </span>
    );
  }
  return (
    <span className="flex flex-col items-end gap-0.5 sm:items-center">
      {error && (
        <span className="text-[10px] text-amber-200" title={error}>
          ত্রুটি
        </span>
      )}
      <button
        type="button"
        onClick={login}
        disabled={loading}
        className="rounded border border-zinc-500 bg-[#1877F2] px-2.5 py-0.5 text-xs font-bold text-white hover:border-white disabled:opacity-50"
      >
        {loading ? "…" : "Facebook দিয়ে লগইন"}
      </button>
    </span>
  );
}
