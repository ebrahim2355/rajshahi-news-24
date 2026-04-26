import { getStaticArticleBySlug } from "./article-fallback";
import type { PublicArticle } from "./article-types";
import { getServerApiBaseUrl } from "./api";

export type { PublicArticle };

export async function getArticleBySlug(
  slug: string
): Promise<PublicArticle | null> {
  const base = getServerApiBaseUrl();

  if (base) {
    try {
      const res = await fetch(
        `${base.replace(/\/$/, "")}/api/articles/${encodeURIComponent(slug)}`,
        { next: { revalidate: 30 } }
      );
      if (res.ok) {
        const data = (await res.json()) as { article: PublicArticle };
        if (data.article) {
          return data.article;
        }
      }
    } catch {
      // API unreachable — use static fallback below
    }
  }

  return getStaticArticleBySlug(slug);
}
