import type { Story } from "./news-data";
import {
  businessFeatured,
  businessList,
  entertainmentGrid,
  leadStory,
  sportsGrid,
  topRowStories,
  worldFeatured,
  worldList,
} from "./news-data";
import type { PublicArticle } from "./article-types";

const galleryImg = (slug: string, n: number) =>
  `https://picsum.photos/seed/${encodeURIComponent(`${slug}-g${n}`)}/960/540`;

function allLinkedStories(): Story[] {
  return [
    leadStory,
    ...topRowStories,
    worldFeatured,
    ...worldList,
    ...sportsGrid,
    businessFeatured,
    ...businessList,
    ...entertainmentGrid,
  ];
}

/**
 * When the API is offline or the article is not in MongoDB yet, still show a full
 * page for any story that has a `slug` in `news-data` (matches seed slugs).
 */
export function getStaticArticleBySlug(slug: string): PublicArticle | null {
  const s = allLinkedStories().find((x) => x.slug === slug);
  if (!s?.slug) {
    return null;
  }
  const content = [
    s.summary ?? "",
    "উপরের ছবি ও শিরোনাম প্রতিবেদনের মূল বিষয়বস্তু ধরে রাখে। পূর্ণ কপি ও আরও কনটেক্সট শীঘ্রই আমাদের পাতায়। নিচের মন্তব্যের ঘরে Facebook দিয়ে লগইন করে আপনার বক্তব্য জানান।",
    "বিস্তারিত বা সংশোধনের দরকার হলে সম্পাদকীয় টিমকে জানান। সার্ভার সংযোগ ঠিক থাকলে এখানে সার্ভার থেকেও পূর্ণ প্রতিবেদনের টেক্সট লোড হবে।",
  ]
    .filter((p) => p.length > 0)
    .join("\n\n");

  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    summary: s.summary,
    content,
    category: s.category,
    timeAgo: s.timeAgo,
    imageSrc: s.imageSrc,
    imageAlt: s.imageAlt,
    imageGallery: [
      { imageSrc: galleryImg(s.slug, 1), imageAlt: `অনুষঙ্গ চিত্র (১) — ${s.title}` },
      { imageSrc: galleryImg(s.slug, 2), imageAlt: `অনুষঙ্গ চিত্র (২) — ${s.title}` },
    ],
  };
}
