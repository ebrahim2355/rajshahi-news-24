"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 5500;

export type ImageFadeSlide = {
  key: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional link (e.g. home hero). When missing, the slide is not clickable. */
  href?: string;
  /** Dots, live region, and aria labels */
  caption: string;
};

type ImageFadeCarouselProps = {
  slides: ImageFadeSlide[];
  imageSizes: string;
  groupAriaLabel: string;
  /** Slightly enlarges the active image on hover (hero links) */
  hoverScale?: boolean;
};

export function ImageFadeCarousel({
  slides,
  imageSizes,
  groupAriaLabel,
  hoverScale = true,
}: ImageFadeCarouselProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (reducedMotion || pause || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, pause, count]);

  if (count === 0) return null;

  const imageClass = hoverScale
    ? "object-cover transition duration-500 group-hover:scale-[1.02]"
    : "object-cover transition duration-500";

  if (count === 1) {
    const s = slides[0];
    const inner = (
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={s.imageSrc}
          alt={s.imageAlt}
          fill
          className={imageClass}
          sizes={imageSizes}
          priority
        />
      </div>
    );
    if (s.href) {
      return (
        <Link
          href={s.href}
          className="group relative block overflow-hidden rounded-sm"
        >
          {inner}
        </Link>
      );
    }
    return (
      <div className="group relative block overflow-hidden rounded-sm">{inner}</div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start == null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) < 48) return;
        if (dx < 0) go(1);
        else go(-1);
      }}
    >
      <p className="sr-only" aria-live="polite">
        স্লাইড {index + 1} / {count} — {slides[index]!.caption}
      </p>
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-sm"
        role="group"
        aria-label={groupAriaLabel}
        aria-roledescription="ক্যারোসেল"
      >
        {slides.map((s, i) => {
          const active = i === index;
          const className = `absolute inset-0 block transition-[opacity,transform] duration-500 ${
            active ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
          } group`;
          const img = (
            <Image
              src={s.imageSrc}
              alt={s.imageAlt}
              fill
              className={imageClass}
              sizes={imageSizes}
              priority={i === 0}
            />
          );
          const withLink = Boolean(s.href && s.href !== "#");
          if (withLink) {
            return (
              <Link
                key={s.key}
                href={s.href!}
                className={className}
                aria-hidden={!active}
                tabIndex={active ? 0 : -1}
              >
                {img}
              </Link>
            );
          }
          return (
            <div key={s.key} className={className} aria-hidden={!active}>
              {img}
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex h-full items-center justify-between px-1 sm:px-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(-1);
            }}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-foreground/45 text-lg text-white shadow-sm backdrop-blur-sm transition hover:bg-foreground/60"
            aria-label="পূর্ববর্তী ছবি"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(1);
            }}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-foreground/45 text-lg text-white shadow-sm backdrop-blur-sm transition hover:bg-foreground/60"
            aria-label="পরবর্তী ছবি"
          >
            ›
          </button>
        </div>

        <div className="pointer-events-none absolute bottom-2 left-0 right-0 z-[2] flex justify-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={i === index}
              aria-label={`${i + 1} নম্বর ছবি, ${s.caption}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex(i);
              }}
              className="pointer-events-auto h-1.5 rounded-full border border-white/50 bg-white/40 transition sm:h-2"
              style={{ width: i === index ? "1.25rem" : "0.4rem" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
