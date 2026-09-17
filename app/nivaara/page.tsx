import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { GhdGroupIntro } from "@/components/GhdGroupIntro";
import { ExploreNivaara } from "@/components/ExploreNivaara";
import { ArrivalQuote } from "@/components/ArrivalQuote";
import { Experiences } from "@/components/Experiences";
import { GoanFlavoursDuplicate } from "@/components/GoanFlavoursDuplicate";
import { Testimonials } from "@/components/Testimonials";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Footer } from "@/components/Footer";
import { BookingCta } from "@/components/BookingCta";
import { FAMILY_AT_BEACH_VIDEO } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute:
      "Boutique Hotel in Nerul, North Goa | Near Candolim & Coco Beach | Nivaãra",
  },
  description:
    "Boutique hotel in Nerul, North Goa — minutes from Coco Beach, Candolim & Calangute. Rooftop pool, spacious studio rooms, and warm Goan hospitality at Nivaãra by GHD Hotels.",
};

export default function NivaaraPage() {
  return (
    <div className="home-page">
      <div className="home-page__texture" aria-hidden />
      <Header />
      <main>
        <HeroSection />
        <GhdGroupIntro />

        <ExploreNivaara />

        <BookingCta
          title="Stay Close to North Goa's Best Beaches"
          description="Wake up just minutes from Coco Beach and spend your days exploring Candolim, Calangute, Baga, and Panaji before returning to the comfort of Nivaãra."
          buttonLabel="Discover"
          href="/city-attractions/beaches-of-goa"
          actionStyle="link"
          tone="transparent"
          className="py-16 md:py-20 lg:py-24"
        />

        <Experiences />

        <ArrivalQuote />
        <GoanFlavoursDuplicate />
        <Testimonials />

        <BookingCta
          title="Experience Nivaãra Yourself"
          description="Join guests who have discovered thoughtful hospitality, spacious studio rooms, and memorable stays in North Goa."
          buttonLabel="Book Your Stay Today"
          videoSrc={FAMILY_AT_BEACH_VIDEO}
        />

        <NewsletterSignup idSuffix="-nivaara" />
      </main>
      <Footer />
    </div>
  );
}
