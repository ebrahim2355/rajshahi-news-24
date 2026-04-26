import type { PublicArticle } from "@/lib/article-types";

/**
 * Returns ordered hero images: primary, then `imageGallery` (deduplicated by `imageSrc`).
 */
export function buildArticleImageSlides(article: PublicArticle): {
  imageSrc: string;
  imageAlt: string;
}[] {
  const main = { imageSrc: article.imageSrc, imageAlt: article.imageAlt };
  const out: { imageSrc: string; imageAlt: string }[] = [main];
  const seen = new Set([main.imageSrc]);
  for (const g of article.imageGallery ?? []) {
    if (!g?.imageSrc) continue;
    if (seen.has(g.imageSrc)) continue;
    seen.add(g.imageSrc);
    out.push({ imageSrc: g.imageSrc, imageAlt: g.imageAlt || article.imageAlt });
  }
  return out;
}
