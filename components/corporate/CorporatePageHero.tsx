"use client";

import Image from "next/image";
import { FadeInSection } from "./CorporateUi";

type CorporatePageHeroProps = {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  headline: string;
  paragraph?: string;
};

export function CorporatePageHero({
  image,
  imageAlt,
  eyebrow,
  headline,
  paragraph,
}: CorporatePageHeroProps) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#1a1a1a]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="corporate-hero-zoom object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-28 pt-32 sm:px-8 lg:px-10 lg:pb-32">
        <FadeInSection>
          {eyebrow ? (
            <p className="font-body text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#C6A86B] sm:text-[0.75rem]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={
              eyebrow
                ? "mt-4 max-w-3xl font-heading text-[2.5rem] font-normal leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
                : "max-w-3xl font-heading text-[2.5rem] font-normal leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            }
          >
            {headline}
          </h1>
          {paragraph ? (
            <p className="mt-6 max-w-2xl font-body text-base font-normal leading-relaxed text-white/88 sm:mt-8 sm:text-[1.0625rem]">
              {paragraph}
            </p>
          ) : null}
        </FadeInSection>
      </div>
    </section>
  );
}
