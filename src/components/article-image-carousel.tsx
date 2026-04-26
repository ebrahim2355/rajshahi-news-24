"use client";

import { buildArticleImageSlides } from "@/lib/article-image-slides";
import type { PublicArticle } from "@/lib/article-types";
import { ImageFadeCarousel, type ImageFadeSlide } from "./image-fade-carousel";

type Props = {
  article: PublicArticle;
};

export function ArticleImageCarousel({ article }: Props) {
  const raw = buildArticleImageSlides(article);
  const fadeSlides: ImageFadeSlide[] = raw.map((g, i) => ({
    key: `${article.slug}-img-${i}`,
    imageSrc: g.imageSrc,
    imageAlt: g.imageAlt,
    caption: g.imageAlt,
  }));
  return (
    <ImageFadeCarousel
      slides={fadeSlides}
      imageSizes="(min-width: 768px) 720px, 100vw"
      groupAriaLabel={`${article.title} — প্রতিবেদন ছবি`}
      hoverScale={false}
    />
  );
}
