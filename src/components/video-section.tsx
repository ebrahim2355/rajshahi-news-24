import Image from "next/image";
import Link from "next/link";
import { videos } from "@/lib/news-data";
import { Container } from "./container";
import { IconPlay } from "./icons";

export function VideoSection() {
  return (
    <section className="bg-navy py-10 text-zinc-100" aria-labelledby="video-heading">
      <Container>
        <div className="mb-6 flex flex-col gap-3 border-b border-white/20 pb-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="video-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            দেখুন
          </h2>
          <Link href="#" className="text-sm font-semibold text-red-200 hover:text-white">
            সব ভিডিও →
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Link href="#" className="group relative block overflow-hidden rounded-sm">
              <div className="relative aspect-video w-full">
                <Image
                  src={videos.main.thumb}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:opacity-90"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconPlay className="h-14 w-14 drop-shadow md:h-16 md:w-16" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-20">
                  <p className="text-xs font-semibold text-white/80">
                    সম্পূর্ণ প্রতিবেদন · {videos.main.duration}
                  </p>
                  <p className="mt-1 text-lg font-bold leading-snug text-white sm:text-xl">
                    {videos.main.title}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {videos.more.map((v) => (
              <Link
                key={v.id}
                href="#"
                className="group flex gap-3 rounded-sm border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
              >
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-sm sm:h-24 sm:w-36">
                  <Image
                    src={v.thumb}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 text-[10px] font-bold text-white">
                    {v.duration}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold leading-snug group-hover:text-red-200">
                    {v.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
