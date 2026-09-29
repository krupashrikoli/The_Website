"use client";

import { useEffect, useRef, useState } from "react";
import { ReservationBar } from "@/components/ReservationWidget";
import { CORPORATE_HERO } from "@/lib/corporate-content";
import { CORPORATE_SEARCH_DESTINATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FadeInSection } from "./CorporateUi";

const heroMediaClass =
  "absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center";

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

export function CorporateHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Preload poster only — avoid tying up the network with the full hero video.
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
      <section className="relative min-h-[88vh] overflow-hidden bg-[#2D2D2D]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/85 via-[#2D2D2D]/45 to-[#2D2D2D]/25" />
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
          />
        </FadeInSection>
      </div>
    </div>
  );
}
