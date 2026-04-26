import Image from "next/image";
import Link from "next/link";
import { BrandType } from "./brand-type";
import { footerColumns, site } from "@/lib/news-data";
import { Container } from "./container";

function StoreBadge({ type }: { type: "apple" | "google" }) {
  if (type === "apple") {
    return (
      <span className="inline-flex items-center gap-2 rounded border border-zinc-500 bg-black/30 px-3 py-2 text-xs text-white">
        <span className="text-lg leading-none">⌘</span>
        <span className="text-left">
          <span className="block text-[9px] leading-tight">ডাউনলোড করুন</span>
          <span className="block text-sm font-semibold">অ্যাপ স্টোর</span>
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded border border-zinc-500 bg-black/30 px-3 py-2 text-xs text-white">
      <span className="text-base leading-none">▶</span>
        <span className="text-left">
          <span className="block text-[9px] leading-tight">পান</span>
          <span className="block text-sm font-semibold">গুগল প্লে</span>
        </span>
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy text-zinc-200">
      <Container className="py-10">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="inline-flex max-w-full items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:gap-2.5"
            >
              <Image
                src="/brand/rajshahi-news-24-icon.png"
                alt=""
                width={100}
                height={100}
                className="h-9 w-auto shrink-0 object-contain sm:h-10"
              />
              <BrandType variant="onDark" size="sm" />
            </Link>
            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              {site.tagline} বিশ্বাসযোগ্য প্রতিবেদন — ওয়েবে, ইমেইলে ও মোবাইলে।
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-500 text-xs font-bold text-white hover:border-white"
                aria-label="ফেসবুক"
              >
                f
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-500 text-xs font-bold text-white hover:border-white"
                aria-label="এক্স"
              >
                X
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-500 text-xs font-bold text-white hover:border-white"
                aria-label="ইউটিউব"
              >
                ▶
              </Link>
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-3">
            <StoreBadge type="apple" />
            <StoreBadge type="google" />
          </div>
        </div>
        <p className="border-t border-white/10 pt-4 text-center text-xs text-zinc-500 sm:text-left">
          © {new Date().getFullYear()} {site.name}। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </Container>
    </footer>
  );
}
