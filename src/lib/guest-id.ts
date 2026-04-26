const KEY = "project-news-guest";

export function getOrCreateGuestId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(KEY);
  if (id) return id;
  id =
    globalThis.crypto?.randomUUID?.() ??
    "g-" +
      Array.from({ length: 3 }, () =>
        Math.random().toString(36).slice(2, 10)
      ).join("");
  localStorage.setItem(KEY, id);
  return id;
}
