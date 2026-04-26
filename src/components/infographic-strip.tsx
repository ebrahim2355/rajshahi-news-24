import Link from "next/link";
import { infographics } from "@/lib/news-data";
import { Container } from "./container";
import { SectionTitle } from "./section-title";

export function InfographicStrip() {
  return (
    <section className="bg-section-mint/90 py-10">
      <Container>
        <SectionTitle
          action={
            <Link href="#" className="text-sm font-semibold text-foreground/80 hover:text-brand">
              তথ্য কেন্দ্র →
            </Link>
          }
        >
          দিনের সংখ্যায়
        </SectionTitle>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {infographics.map((i) => (
            <li
              key={i.id}
              className="flex flex-col justify-between border border-emerald-100 bg-white/90 p-4 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {i.label}
              </span>
              <div className="mt-2 flex items-end gap-2">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-red-100 text-sm font-bold text-brand"
                  aria-hidden
                >
                  ত
                </span>
                <span className="text-2xl font-extrabold text-navy">{i.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
