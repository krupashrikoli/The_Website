"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BEACH_EXPERIENCES_POSTER, BEACH_EXPERIENCES_VIDEO } from "@/lib/constants";
import { fadeUp, fadeUpStagger, viewportOnce } from "@/lib/animations";

export function Experiences() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, []);

  return (
    <section
      id="accommodation"
      className="relative -mt-px w-full overflow-hidden aspect-[3/2] lg:aspect-auto lg:min-h-screen"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <video
          ref={videoRef}
          src={BEACH_EXPERIENCES_VIDEO}
          poster={BEACH_EXPERIENCES_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute bottom-0 left-0 h-full w-[108%] max-w-none object-cover object-left-bottom lg:w-[115%]"
        />
      </div>
      <div className="absolute inset-0 bg-black/15" aria-hidden />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 py-10 lg:justify-start lg:px-10 lg:py-16 xl:px-16">
        <motion.div
          variants={fadeUpStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto w-full max-w-2xl -translate-y-6 text-center lg:mx-0 lg:max-w-[22rem] lg:-translate-y-28 lg:text-left xl:max-w-[24rem]"
        >
          <motion.div variants={fadeUp}>
            <SectionIntro
              label="Beaches"
              title="Wake Up Minutes From the Shore"
              description="From quiet Coco Beach to the energy of Candolim, Calangute, and Baga, Nivaãra places you at the heart of North Goa's coastline — sea breezes, golden light, and days shaped by the Arabian Sea."
              light
              align="left"
              className="text-balance lg:text-left"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-6 flex justify-start"
          >
            <Link
              href="/nivaara/city-attractions/beaches-of-goa"
              className="group inline-flex items-center gap-2 border-b border-white/80 pb-1 font-body text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white hover:text-white/85"
            >
              Discover
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
