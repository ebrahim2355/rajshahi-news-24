import Image from "next/image";
import Link from "next/link";
import { photoOfDay } from "@/lib/news-data";
import { Container } from "./container";

export function PhotoFeature() {
  return (
    <section className="py-0">
      <div className="relative min-h-[280px] w-full sm:min-h-[360px]">
        <Image
          src={photoOfDay.src}
          alt={photoOfDay.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <Container className="relative flex min-h-[280px] items-end sm:min-h-[360px]">
          <div className="max-w-2xl py-8 text-white sm:py-12">
            <p className="text-xs font-bold uppercase tracking-widest text-red-200">
              {photoOfDay.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-4xl">
              <Link href="#" className="hover:underline">
                {photoOfDay.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-zinc-200 sm:text-base">
              {photoOfDay.caption}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
