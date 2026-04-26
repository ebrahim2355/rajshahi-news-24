import type { Story } from "@/lib/news-data";

const MAX_SLIDES = 5;

/** Lead story first, then top row — deduplicated, capped (for the hero image carousel). */
export function buildHeroCarouselSlides(lead: Story, topRow: Story[]): Story[] {
  const out: Story[] = [lead];
  const seen = new Set([lead.id]);
  for (const s of topRow) {
    if (seen.has(s.id)) continue;
    seen.add(s.id);
    out.push(s);
    if (out.length >= MAX_SLIDES) break;
  }
  return out;
}
