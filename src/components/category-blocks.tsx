import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/news-data";
import { getStoryHref } from "@/lib/story-href";
import {
  businessFeatured,
  businessList,
  entertainmentGrid,
  sportsGrid,
  worldFeatured,
  worldList,
} from "@/lib/news-data";
import { Container } from "./container";
import { SectionTitle } from "./section-title";

function SmallRow({ s }: { s: Story }) {
  return (
    <li className="border-b border-border last:border-0">
      <Link href={getStoryHref(s)} className="group flex gap-3 py-3">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm sm:h-[72px] sm:w-28">
          <Image
            src={s.imageSrc}
            alt={s.imageAlt}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase text-muted">
            {s.category}
          </p>
          <h3 className="mt-0.5 text-sm font-bold leading-snug group-hover:text-brand sm:text-base">
            {s.title}
          </h3>
          <p className="mt-1 text-xs text-muted">{s.timeAgo}</p>
        </div>
      </Link>
    </li>
  );
}

function FeaturedLeft({ s }: { s: Story }) {
  return (
    <div>
      <Link href={getStoryHref(s)} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[16/10]">
          <Image
            src={s.imageSrc}
            alt={s.imageAlt}
            fill
            className="object-cover transition group-hover:opacity-95"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
        <p className="mt-3 text-xs font-bold uppercase text-brand">
          {s.category} · {s.timeAgo}
        </p>
        <h3 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl group-hover:underline">
          {s.title}
        </h3>
        {s.summary && <p className="mt-2 text-sm text-muted sm:text-base">{s.summary}</p>}
      </Link>
    </div>
  );
}

function CardGrid({ items, cols = 4 }: { items: Story[]; cols?: 3 | 4 }) {
  return (
    <div
      className={
        cols === 4
          ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {items.map((s) => (
        <article key={s.id} className="border-b border-border pb-4 sm:border-0 sm:pb-0">
          <Link href={getStoryHref(s)} className="group block">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm">
              <Image
                src={s.imageSrc}
                alt={s.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase text-muted">
              {s.category} · {s.timeAgo}
            </p>
            <h3 className="mt-1 text-base font-bold leading-snug group-hover:text-brand">
              {s.title}
            </h3>
          </Link>
        </article>
      ))}
    </div>
  );
}

export function WorldSection() {
  return (
    <section id="world" className="border-t border-border bg-white py-10">
      <Container>
        <SectionTitle>বিশ্ব</SectionTitle>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FeaturedLeft s={worldFeatured} />
          </div>
          <div className="lg:col-span-5">
            <ul>
              {worldList.map((s) => (
                <SmallRow key={s.id} s={s} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SportsSection() {
  return (
    <section id="sports" className="bg-section-gray py-10">
      <Container>
        <SectionTitle>খেলা</SectionTitle>
        <CardGrid items={sportsGrid} cols={4} />
      </Container>
    </section>
  );
}

export function BusinessSection() {
  return (
    <section id="business" className="bg-white py-10">
      <Container>
        <SectionTitle>বাণিজ্য ও প্রযুক্তি</SectionTitle>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FeaturedLeft s={businessFeatured} />
          </div>
          <div className="lg:col-span-5">
            <ul>
              {businessList.map((s) => (
                <SmallRow key={s.id} s={s} />
              ))}
            </ul>
            <div className="mt-4 rounded-sm border border-dashed border-border p-4 text-sm text-muted">
              <p className="font-semibold text-foreground/80">পাঠক সুবিধা</p>
              <p className="mt-1">
                বাজার এক নজরে: আগামীকালের বাণিজ্য ব্রিফিংয়ে টিকার ওপর ট্যাপ করলে এক বছরের প্রেক্ষাপট
                পাবেন।
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function EntertainmentSection() {
  return (
    <section id="entertainment" className="bg-white py-10">
      <Container>
        <SectionTitle>বিনোদন</SectionTitle>
        <CardGrid items={entertainmentGrid} cols={3} />
      </Container>
    </section>
  );
}
