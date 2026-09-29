"use client";

import Image from "next/image";
import { CULTURE, PHILOSOPHY, VISION_MISSION, WHAT_WE_BELIEVE } from "@/lib/corporate-content";
import { cn } from "@/lib/utils";
import {
  FadeInSection,
  GoldLink,
  SectionEyebrow,
  SectionHeading,
} from "./CorporateUi";

export function CultureSection() {
  return (
    <section id="our-culture" className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10">
        <FadeInSection>
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
            <Image
              src={CULTURE.image}
              alt={CULTURE.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </FadeInSection>
        <FadeInSection>
          <SectionEyebrow>{CULTURE.eyebrow}</SectionEyebrow>
          <SectionHeading className="mt-2">{CULTURE.headline}</SectionHeading>
          <p className="mt-4 font-body text-base font-normal leading-relaxed text-black">
            {CULTURE.paragraph}
          </p>
          <div className="mt-6">
            <GoldLink href="/culture">Explore our culture</GoldLink>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

export function WhatWeBelieveSection() {
  const data = WHAT_WE_BELIEVE;

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
        <FadeInSection>
          <SectionHeading className="text-center">{data.headline}</SectionHeading>
          <div className="mt-4 space-y-4 sm:mt-5">
            {data.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="font-body text-base font-normal leading-relaxed text-black"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function VisionMissionCard({
  label,
  headline,
  body,
}: {
  label: string;
  headline: string;
  body: string;
}) {
  return (
    <article className="flex h-full flex-col border border-[#E6DDCF] bg-white px-6 py-8 text-center sm:px-8 sm:py-10">
      <p className="font-heading text-xl font-normal uppercase tracking-[0.14em] text-[#C6A86B] sm:text-2xl md:text-[1.75rem]">
        {label}
      </p>
      <h3 className="mt-5 font-heading text-2xl font-normal leading-snug text-black sm:text-[1.75rem]">
        {headline}
      </h3>
      <p className="mt-4 font-body text-base font-normal leading-relaxed text-black sm:text-[1.0625rem]">
        {body}
      </p>
    </article>
  );
}

export function VisionMissionSection({ className }: { className?: string }) {
  const { vision, mission } = VISION_MISSION;

  return (
    <section className={cn("bg-white py-12 sm:py-16 lg:py-20", className)}>
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <FadeInSection>
            <VisionMissionCard
              label={vision.label}
              headline={vision.headline}
              body={vision.body}
            />
          </FadeInSection>
          <FadeInSection>
            <VisionMissionCard
              label={mission.label}
              headline={mission.headline}
              body={mission.body}
            />
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

export function PhilosophySection({ className }: { className?: string }) {
  const data = PHILOSOPHY;

  return (
    <section className={cn("bg-white pb-12 sm:pb-16 lg:pb-20", className)}>
      <FadeInSection>
        <div className="relative w-full overflow-hidden">
          <div className="relative aspect-[16/10] w-full min-h-[220px] sm:aspect-[21/9] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[480px] xl:min-h-[560px]">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={85}
            />
          </div>
        </div>
      </FadeInSection>

      <div className="mx-auto max-w-[1100px] px-6 pt-10 text-center sm:px-6 sm:pt-12 lg:px-10 lg:pt-14">
        <FadeInSection>
          <SectionHeading className="text-center">{data.headline}</SectionHeading>
          <div className="mx-auto mt-6 max-w-4xl space-y-4 sm:mt-8">
            {data.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="font-body text-base font-normal leading-relaxed text-black sm:text-[1.0625rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
