"use client";

import type { Story } from "@/lib/news-data";
import { getStoryHref } from "@/lib/story-href";
import { ImageFadeCarousel, type ImageFadeSlide } from "./image-fade-carousel";

type HeroImageCarouselProps = {
  slides: Story[];
};

export function HeroImageCarousel({ slides }: HeroImageCarouselProps) {
  const fadeSlides: ImageFadeSlide[] = slides.map((s) => ({
    key: s.id,
    imageSrc: s.imageSrc,
    imageAlt: s.imageAlt,
    href: getStoryHref(s),
    caption: s.title,
  }));
  return (
    <ImageFadeCarousel
      slides={fadeSlides}
      imageSizes="(min-width: 1024px) 58vw, 100vw"
      groupAriaLabel="হোম হিরো — একাধিক ছবি"
      hoverScale
    />
  );
}
