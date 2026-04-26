import Image from "next/image";
import Link from "next/link";
import { columnists } from "@/lib/news-data";
import { Container } from "./container";
import { SectionTitle } from "./section-title";

export function OpinionSection() {
  return (
    <section
      id="opinion"
      className="bg-section-pink/90 py-10"
    >
      <Container>
        <SectionTitle>মতামত ও কলাম</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {columnists.map((c) => (
            <article
              key={c.id}
              className="flex gap-4 rounded-sm border border-red-100/80 bg-white/90 p-4 shadow-sm"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-red-200">
                <Image
                  src={c.avatar}
                  alt=""
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">{c.name}</p>
                <p className="text-xs text-muted">{c.title}</p>
                <h3 className="mt-2 text-sm font-bold leading-snug sm:text-base">
                  <Link href="#" className="hover:text-brand">
                    {c.articleTitle}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
