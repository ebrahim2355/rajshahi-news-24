import Link from "next/link";
import { Container } from "./container";
import { IconSearch } from "./icons";
import { navPrimary, navTrending, site } from "@/lib/news-data";

function SocialIcon({
  letter,
  href,
  ariaLabel,
}: {
  letter: string;
  href: string;
  ariaLabel: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-[11px] font-bold text-foreground/80 transition hover:border-brand hover:text-brand"
      aria-label={ariaLabel}
    >
      {letter}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="bg-foreground/90 text-zinc-100">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
          <div className="flex items-center gap-3">
            <Link
              href="#search"
              className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-white"
            >
              <IconSearch className="h-4 w-4" />
              <span className="hidden sm:inline">খুঁজুন</span>
            </Link>
            <span className="h-3 w-px bg-zinc-600" aria-hidden />
            <a href={`tel:${site.phoneTel}`} className="text-zinc-200 hover:text-white">
              {site.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              লাইভ
            </span>
            <Link
              href="#"
              className="rounded border border-zinc-500 px-2.5 py-0.5 text-xs font-medium text-zinc-200 hover:border-white hover:text-white"
            >
              লাইভ টিভি
            </Link>
          </div>
        </Container>
      </div>

      <div className="pt-4 pb-2">
        <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="order-2 text-sm text-muted sm:order-1">{site.dateLine}</p>
          <div className="order-1 text-center sm:order-2 sm:flex-1">
            <Link href="/" className="group inline-block">
              <span className="text-2xl font-black tracking-tight text-brand sm:text-4xl">
                {site.name}
              </span>
              <span className="mt-0.5 block text-xs text-muted sm:text-sm">
                {site.tagline}
              </span>
            </Link>
          </div>
          <div className="order-3 flex items-center justify-center gap-2 sm:justify-end">
            <SocialIcon letter="f" href="#" ariaLabel="ফেসবুকে ফলো করুন" />
            <SocialIcon letter="X" href="#" ariaLabel="এক্সে ফলো করুন" />
            <SocialIcon letter="▶" href="#" ariaLabel="ইউটিউবে ফলো করুন" />
            <SocialIcon letter="R" href="#" ariaLabel="আরএসএস ফিড" />
          </div>
        </Container>
      </div>

      <nav
        className="border-t border-b border-border bg-section-gray/80"
        aria-label="প্রধান নেভিগেশন"
      >
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0 py-2 text-sm font-semibold sm:gap-x-2 sm:justify-between sm:py-0 sm:text-[13px]">
            {navPrimary.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-sm px-2 py-2 text-foreground/90 hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div className="bg-white">
        <Container className="flex flex-wrap items-center gap-2 border-b border-border py-2 text-xs text-muted sm:text-sm">
          <span className="font-semibold uppercase tracking-wider text-foreground/70">
            ট্রেন্ডিং
          </span>
          {navTrending.map((t) => (
            <Link
              key={t}
              href="#"
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-foreground/80 hover:bg-zinc-200"
            >
              {t}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
