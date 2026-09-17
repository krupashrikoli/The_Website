import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CorporateFooter } from "@/components/corporate/CorporateFooter";
import { CorporateHero } from "@/components/corporate/CorporateHero";
import { CorporateIntro } from "@/components/corporate/CorporateIntro";
import { CorporateBeachBanner } from "@/components/corporate/CorporateBeachBanner";
import { BrandShowcase } from "@/components/corporate/BrandShowcase";
import {
  CultureSection,
  WhatWeBelieveSection,
} from "@/components/corporate/AboutPhilosophy";
import {
  GetInTouchSection,
} from "@/components/corporate/LeadershipDestinations";
import {
  CinematicSection,
  FinalBookingCta,
} from "@/components/corporate/HomeSections";

export const metadata: Metadata = {
  title: {
    absolute:
      "Hotels in North Goa | Best Boutique Hotel in Nerul | GHD Hotels",
  },
  description:
    "Looking for hotels in North Goa? Book Nivaãra by GHD Hotels in Nerul — boutique stay near Coco Beach, Candolim & Calangute with rooftop pool and spacious studio rooms.",
};

export default function HomePage() {
  return (
    <div className="corporate-site bg-white text-[#2D2D2D]">
      <Header />
      <main className="pt-0">
        <CorporateHero />
        <CorporateIntro />
        <CorporateBeachBanner />
        <BrandShowcase />
        <CultureSection />
        <WhatWeBelieveSection />
        <GetInTouchSection className="bg-white" />
        <CinematicSection />
        <FinalBookingCta />
      </main>
      <CorporateFooter />
    </div>
  );
}
