import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BrandShowcase } from "@/components/corporate/BrandShowcase";
import { CorporateFooter } from "@/components/corporate/CorporateFooter";
import { CorporatePageHero } from "@/components/corporate/CorporatePageHero";
import { BRANDS_PAGE } from "@/lib/corporate-content";

export const metadata: Metadata = {
  title: "Our Brands | GHD Hotels",
  description:
    "Explore the GHD Hotels portfolio — Nivaãra in North Goa, and Samrāya and Celéstra in Dodamarg, coming soon — distinctive hotels and destinations across India.",
};

export default function BrandsPage() {
  return (
    <div className="corporate-site bg-white text-[#2D2D2D]">
      <Header />
      <main className="pt-0">
        <CorporatePageHero
          image={BRANDS_PAGE.heroImage}
          imageAlt={BRANDS_PAGE.heroImageAlt}
          headline={BRANDS_PAGE.headline}
          paragraph={BRANDS_PAGE.paragraph}
        />

        <BrandShowcase showHeading={false} />
      </main>
      <CorporateFooter />
    </div>
  );
}
