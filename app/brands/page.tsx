import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { BrandShowcase } from "@/components/corporate/BrandShowcase";
import { CorporateFooter } from "@/components/corporate/CorporateFooter";
import {
  FadeInSection,
  SectionHeading,
} from "@/components/corporate/CorporateUi";
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
      <main className="pt-14 md:pt-16">
        <section className="relative w-full">
          <div className="relative aspect-[21/9] w-full min-h-[220px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
            <Image
              src={BRANDS_PAGE.heroImage}
              alt={BRANDS_PAGE.heroImageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </section>

        <section className="pt-12 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
            <FadeInSection>
              <SectionHeading as="h1">{BRANDS_PAGE.headline}</SectionHeading>
              <p className="mt-6 max-w-3xl font-body text-base font-normal leading-relaxed text-black sm:mt-8 sm:text-[1.0625rem]">
                {BRANDS_PAGE.paragraph}
              </p>
            </FadeInSection>
          </div>
        </section>

        <BrandShowcase showHeading={false} />
      </main>
      <CorporateFooter />
    </div>
  );
}
