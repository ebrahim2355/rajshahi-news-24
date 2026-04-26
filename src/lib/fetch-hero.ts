import { getServerApiBaseUrl } from "./api";
import {
  leadStory,
  topRowStories,
  type Story,
} from "./news-data";

type HeroResponse = { lead: Story | null; top: Story[] };

export type HeroData = { lead: Story; top: Story[] };

/**
 * Fetches lead + top strip from the Express API; falls back to static `news-data` if the
 * API is down, Mongo is empty, or `NEXT_PUBLIC_API_URL` is unset in production.
 */
export async function getHeroData(): Promise<HeroData> {
  const base = getServerApiBaseUrl();
  if (!base) {
    return { lead: leadStory, top: topRowStories };
  }
  try {
    const res = await fetch(`${base}/api/stories/hero`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return { lead: leadStory, top: topRowStories };
    }
    const data = (await res.json()) as HeroResponse;
    const lead: Story =
      data.lead && data.lead.id && data.lead.title ? data.lead : leadStory;
    const top: Story[] =
      Array.isArray(data.top) && data.top.length > 0 ? data.top : topRowStories;
    return { lead, top };
  } catch {
    return { lead: leadStory, top: topRowStories };
  }
}
