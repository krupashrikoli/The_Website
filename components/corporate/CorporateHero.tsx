"use client";

import { useEffect, useRef, useState } from "react";
import { ReservationBar } from "@/components/ReservationWidget";
import { BRAND_SITES } from "@/lib/brands";
import { CORPORATE_HERO } from "@/lib/corporate-content";
import { CORPORATE_SEARCH_DESTINATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FadeInSection } from "./CorporateUi";

/** Cover the full hero frame on every screen — no letterboxing / black bars */
const heroMediaClass =
  "absolute inset-0 h-full w-full object-cover object-center";

const corporatePropertyOptions = CORPORATE_SEARCH_DESTINATIONS.map((destination) => ({
  value: destination.value,
  label: destination.label,
}));

function resolveCorporatePropertyId(value: string) {
  return (
    CORPORATE_SEARCH_DESTINATIONS.find((destination) => destination.value === value)
      ?.propertyId ?? "nivaara"
  );
}

function visitBrandSite(propertyId: string) {
  const href =
    BRAND_SITES[propertyId as keyof typeof BRAND_SITES] ?? BRAND_SITES.nivaara;
  window.location.assign(href);
}

function HeroRotatingWords() {
  const words = CORPORATE_HERO.rotatingWords;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, CORPORATE_HERO.wordIntervalMs);

    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
      <div className="relative flex min-h-[5.5rem] w-full max-w-5xl items-center justify-center sm:min-h-[6.5rem] md:min-h-[7.5rem]">
        <p className="text-center font-hero text-[clamp(2.5rem,8vw,6.5rem)] font-semibold uppercase leading-[1.05] tracking-[0.1em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:tracking-[0.14em]">
          {words[index]}
        </p>
      </div>
    </div>
  );
}

export function CorporateHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = CORPORATE_HERO.poster;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reveal = () => {
      void video.play().finally(() => {
        setVideoReady(true);
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      reveal();
      return;
    }

    video.addEventListener("loadeddata", reveal, { once: true });
    video.addEventListener("canplay", reveal, { once: true });
    video.addEventListener("error", reveal, { once: true });

    return () => {
      video.removeEventListener("loadeddata", reveal);
      video.removeEventListener("canplay", reveal);
      video.removeEventListener("error", reveal);
    };
  }, []);

  return (
    <div className="relative z-10">
      <section className="relative h-[100svh] min-h-[32rem] overflow-hidden bg-[#2D2D2D] sm:min-h-[36rem]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <img
            src={CORPORATE_HERO.poster}
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            className={cn(
              heroMediaClass,
              "transition-opacity duration-700",
              videoReady && "opacity-0",
            )}
          />
          <video
            ref={videoRef}
            src={CORPORATE_HERO.video}
            poster={CORPORATE_HERO.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={cn(
              heroMediaClass,
              "opacity-0 transition-opacity duration-700",
              videoReady && "opacity-100",
            )}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-[#2D2D2D]/30 to-[#2D2D2D]/35" />

        <HeroRotatingWords />
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-4 sm:px-6 lg:px-10">
        <FadeInSection className="pointer-events-auto mx-auto max-w-[1100px]">
          <ReservationBar
            variant="booking"
            fields="location"
            submitLabel="Visit"
            initialProperty="nivaara"
            propertyOptions={corporatePropertyOptions}
            propertyPlaceholder="Hotel or Destination"
            resolvePropertyId={resolveCorporatePropertyId}
            onVisit={visitBrandSite}
          />
        </FadeInSection>
      </div>
    </div>
  );
}
