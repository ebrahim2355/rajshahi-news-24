export type PublicArticle = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  content: string;
  category: string;
  timeAgo: string;
  imageSrc: string;
  imageAlt: string;
  /** Extra photos shown after the lead image in the article carousel. */
  imageGallery?: { imageSrc: string; imageAlt: string }[];
  /** Embedded video or external video URLs. */
  videos?: { url: string; title?: string }[];
};
