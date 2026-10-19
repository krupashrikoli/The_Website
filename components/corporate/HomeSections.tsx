"use client";

import Image from "next/image";
import {
  CINEMATIC_STATEMENT,
  FINAL_BOOKING_CTA,
  GET_IN_TOUCH,
} from "@/lib/corporate-content";
import {
  FadeInSection,
  GoldButton,
  SectionHeading,
} from "./CorporateUi";

export function CinematicSection() {
  return (
    <section className="relative flex min-h-[36vh] items-center justify-center overflow-hidden sm:min-h-[40vh] md:min-h-[44vh]">
      <Image
        src={CINEMATIC_STATEMENT.image}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#2D2D2D]/50" />
      <FadeInSection className="relative z-10 px-6 py-12 text-center sm:py-14">
        <p className="font-heading text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          {CINEMATIC_STATEMENT.line1}
          <br />
          {CINEMATIC_STATEMENT.line2}
        </p>
        <div className="mt-7 flex justify-center sm:mt-8">
          <GoldButton href={GET_IN_TOUCH.cta.href}>
            {GET_IN_TOUCH.cta.label}
          </GoldButton>
        </div>
      </FadeInSection>
    </section>
  );
}

export function FinalBookingCta() {
  return (
    <section className="border-t border-[#E6DDCF] bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[800px] px-6 text-center lg:px-10">
        <FadeInSection>
          <SectionHeading>{FINAL_BOOKING_CTA.headline}</SectionHeading>
          <p className="mt-3 font-body text-base font-normal text-black">
            {FINAL_BOOKING_CTA.subheading}
          </p>
          <div className="mt-6 flex justify-center">
            <GoldButton href={FINAL_BOOKING_CTA.cta.href}>
              {FINAL_BOOKING_CTA.cta.label}
            </GoldButton>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
