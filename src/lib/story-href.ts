import type { Story } from "./news-data";

export function getStoryHref(s: Story): string {
  return s.slug ? `/news/${encodeURIComponent(s.slug)}` : "#";
}
