"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  BookingCta,
  BoutiqueUrgencyBanner,
} from "@/components/BookingCta";
import { SoftReveal } from "@/components/SoftReveal";
import { NIVAARA_LOGO, SILHOUETTE_VIDEO } from "@/lib/constants";
import { sectionBodyClass } from "@/lib/section-typography";

export function GhdGroupIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, []);

  return (
    <section className="bg-transparent px-0 pt-12 pb-0 md:pt-16">
      <div className="mx-auto max-w-[88rem] px-6 text-center lg:px-10">
        <SoftReveal>
          <Image
            src={NIVAARA_LOGO}
            alt="Nivaãra by GHD Hotels"
            width={736}
            height={510}
            className="mx-auto h-20 w-auto object-contain sm:h-[5.5rem] md:h-24"
            priority
          />
        </SoftReveal>
        <SoftReveal index={1}>
          <p className={sectionBodyClass(false, "mx-auto mt-4 max-w-[82rem] sm:mt-5")}>
            Nivaãra by GHD Hotels is a boutique luxury hotel in Nerul, North Goa — just
            minutes from Coco Beach and a short drive from Candolim, Calangute and Baga.
            As a sea-view property, it welcomes fresh breezes from the Arabian Sea and
            offers beautiful views of the Goa landscape. Built on the belief that great
            stays come from comfort, thoughtful service, and genuine experiences, Nivaãra
            combines contemporary design, warm hospitality, and inviting spaces—including
            an open terrace pool to relax and unwind. Whether you&apos;re here for
            business, a quiet escape, or a family holiday in Goa, our focus stays simple:
            hospitality that feels real, intuitive, and memorable.
          </p>
        </SoftReveal>
      </div>

      <div className="relative mt-10 overflow-hidden md:mt-12">
        <div className="absolute inset-0" aria-hidden>
          <video
            ref={videoRef}
            src={SILHOUETTE_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10">
          <BookingCta
            title="Ready for Your Goa Escape?"
            description="Stay just minutes from Coco Beach in spacious studio rooms, enjoy our rooftop pool, warm hospitality, and thoughtfully designed spaces for work or relaxation."
            buttonLabel="Check Our Rooms"
            href="/rooms"
            actionStyle="link"
            benefits={[
              "Best Available Rate",
              "Instant Confirmation",
              "Direct Booking Benefits",
            ]}
            tone="onDark"
          />

          <BoutiqueUrgencyBanner light />
        </div>
      </div>
    </section>
  );
}
