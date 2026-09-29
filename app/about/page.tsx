import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CorporateFooter } from "@/components/corporate/CorporateFooter";
import { CorporatePageHero } from "@/components/corporate/CorporatePageHero";
import {
  FadeInSection,
  GoldLink,
  SectionHeading,
} from "@/components/corporate/CorporateUi";
import { ABOUT_PAGE } from "@/lib/corporate-content";
import { VisionMissionSection, PhilosophySection } from "@/components/corporate/AboutPhilosophy";
import { OurLeadershipSection } from "@/components/corporate/LeadershipProfiles";
import { GetInTouchSection } from "@/components/corporate/LeadershipDestinations";

export const metadata: Metadata = {
  title: "Who We Are | GHD Hotels",
  description:
    "A new-generation hospitality group creating distinctive hotels and destinations across India, blending contemporary luxury with meaningful experiences.",
};

export default function AboutPage() {
  return (
    <div className="corporate-site bg-white text-[#2D2D2D]">
      <Header />
      <main className="pt-0">
        <CorporatePageHero
          image={ABOUT_PAGE.heroImage}
          imageAlt={ABOUT_PAGE.heroImageAlt}
          headline={ABOUT_PAGE.headline}
          paragraph={ABOUT_PAGE.paragraph}
        />

        <section className="border-b border-[#E6DDCF] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
            <FadeInSection>
              <h2 className="font-heading text-2xl font-normal text-black sm:text-3xl">
                {ABOUT_PAGE.subheading}
              </h2>
              <div className="mx-auto mt-5 max-w-4xl space-y-4 sm:mt-6">
                {ABOUT_PAGE.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="font-body text-base font-normal leading-relaxed text-black sm:text-[1.0625rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex justify-center pt-2">
                <GoldLink href="/brands">Explore Our Brands</GoldLink>
              </div>
            </FadeInSection>
          </div>
        </section>

        <VisionMissionSection />
        <PhilosophySection />
        <OurLeadershipSection />
        <GetInTouchSection className="bg-white" centered />
      </main>
      <CorporateFooter />
    </div>
  );
}
