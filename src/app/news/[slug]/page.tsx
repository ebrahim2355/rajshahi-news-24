import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleImageCarousel } from "@/components/article-image-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { getArticleBySlug } from "@/lib/fetch-article";
import { buildArticleImageSlides } from "@/lib/article-image-slides";
import { site } from "@/lib/news-data";
import { CommentSection } from "@/components/comment-section";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "খবর পাওয়া যায়নি" };
  }
  const images = buildArticleImageSlides(article).map((g) => g.imageSrc);
  return {
    title: `${article.title} — ${site.name}`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: images.length > 0 ? images : [article.imageSrc],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        বিষয়বস্তুতে যান
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 bg-white">
        <Container className="max-w-3xl py-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            {article.category} · {article.timeAgo}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          {article.summary && (
            <p className="mt-3 text-base text-muted sm:text-lg">{article.summary}</p>
          )}
          <p className="mt-3 text-sm">
            <a
              href="#comments"
              className="font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
            >
              মন্তব্য — নিচে দেখুন
            </a>
          </p>
          <div className="mt-6 sm:mt-8">
            <ArticleImageCarousel article={article} />
          </div>
          {article.videos && article.videos.length > 0 && (
            <div className="mt-8 space-y-6" aria-label="প্রতিবেদন ভিডিও">
              {article.videos.map((v, i) => (
                <figure key={`${v.url}-${i}`} className="overflow-hidden rounded-sm border border-border bg-black/5">
                  {v.title && (
                    <figcaption className="border-b border-border bg-white px-3 py-2 text-sm font-semibold">
                      {v.title}
                    </figcaption>
                  )}
                  {v.url.startsWith("/uploads/") ? (
                    <video
                      className="h-auto w-full max-h-[70vh] bg-black"
                      controls
                      playsInline
                      preload="metadata"
                      src={v.url}
                    >
                      <a href={v.url} className="p-4 text-sm text-white underline">
                        ভিডিও খুলুন
                      </a>
                    </video>
                  ) : (
                    <div className="p-3 text-sm">
                      <a
                        className="font-medium text-brand underline"
                        href={v.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        বাহ্যিক ভিডিও / লিংক খুলুন
                      </a>
                    </div>
                  )}
                </figure>
              ))}
            </div>
          )}
          <div className="mt-8 space-y-4 text-[16px] leading-[1.75] text-foreground">
            {article.content.split(/\n\n+/).map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            <Link href="/" className="font-bold text-brand hover:underline">
              ← প্রচ্ছদে ফিরে যান
            </Link>
          </p>
        </Container>
        <div className="bg-section-gray/50 py-6">
          <Container className="max-w-3xl pb-12 pt-2">
            <CommentSection slug={article.slug} />
          </Container>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
