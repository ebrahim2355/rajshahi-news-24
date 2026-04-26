import Image from "next/image";
import Link from "next/link";
import {
  headlineList,
  leadStory as defaultLead,
  secondaryStrip,
  topRowStories as defaultTopRow,
  trendingGallery,
} from "@/lib/news-data";
import type { Story } from "@/lib/news-data";
import { Container } from "./container";

type HeroSectionProps = {
  lead?: Story;
  topRow?: Story[];
};

export function HeroSection({
  lead = defaultLead,
  topRow = defaultTopRow,
}: HeroSectionProps) {
  return (
    <section className="bg-white py-8">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              {lead.category} · {lead.timeAgo}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              <Link href="#" className="hover:text-brand">
                {lead.title}
              </Link>
            </h1>
            {lead.summary && (
              <p className="mt-3 text-base text-muted">{lead.summary}</p>
            )}
          </div>
          <div className="lg:col-span-7">
            <Link href="#" className="group relative block overflow-hidden rounded-sm">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={lead.imageSrc}
                  alt={lead.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold uppercase tracking-widest text-muted">
              সর্বশেষ
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              {topRow.map((s) => (
                <article
                  key={s.id}
                  className="flex flex-col border-b border-border pb-4 sm:border-b-0 sm:pb-0"
                >
                  <Link href="#" className="group">
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm">
                      <Image
                        src={s.imageSrc}
                        alt={s.imageAlt}
                        fill
                        className="object-cover transition group-hover:opacity-95"
                        sizes="(min-width: 1024px) 25vw, 100vw"
                      />
                    </div>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                      {s.category}
                    </p>
                    <h2 className="mt-1 text-base font-bold leading-snug group-hover:text-brand">
                      {s.title}
                    </h2>
                    {s.summary && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted">{s.summary}</p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted">
              শিরোনাম
            </p>
            <ul className="mt-3 divide-y divide-border border-t border-border">
              {headlineList.map((h) => (
                <li key={h.id} className="py-3">
                  <Link href="#" className="group flex items-start justify-between gap-2">
                    <span className="text-[15px] font-semibold leading-snug group-hover:text-brand">
                      {h.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted">{h.time}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            আরও খবর
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {secondaryStrip.map((r) => (
              <Link
                key={r.id}
                href="#"
                className="group flex gap-3 border border-border p-2 transition hover:border-zinc-300"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={r.src}
                    alt=""
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted">{r.time} আগে</p>
                  <p className="mt-0.5 text-sm font-semibold leading-snug group-hover:text-brand">
                    {r.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            ছবিতে
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trendingGallery.map((g) => (
              <Link key={g.id} href="#" className="group text-center">
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <Image
                    src={g.src}
                    alt=""
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(min-width: 640px) 20vw, 50vw"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-xs font-semibold leading-tight text-foreground/90 group-hover:text-brand sm:text-sm">
                  {g.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
