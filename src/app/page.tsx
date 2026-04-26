import {
  BusinessSection,
  EntertainmentSection,
  SportsSection,
  WorldSection,
} from "@/components/category-blocks";
import { HeroSection } from "@/components/hero-section";
import { InfographicStrip } from "@/components/infographic-strip";
import { OpinionSection } from "@/components/opinion-section";
import { PhotoFeature } from "@/components/photo-feature";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VideoSection } from "@/components/video-section";
import { getHeroData } from "@/lib/fetch-hero";

export default async function Home() {
  const { lead, top } = await getHeroData();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        বিষয়বস্তুতে যান
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <HeroSection lead={lead} topRow={top} />
        <WorldSection />
        <SportsSection />
        <BusinessSection />
        <EntertainmentSection />
        <OpinionSection />
        <VideoSection />
        <PhotoFeature />
        <InfographicStrip />
      </main>
      <SiteFooter />
    </>
  );
}
