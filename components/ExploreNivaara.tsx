"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SoftReveal } from "@/components/SoftReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionBodyClass, sectionHeadingClass } from "@/lib/section-typography";
import { EXPLORE_SPACES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_DURATION = 1.55;
const SCROLL_EASE = [0.33, 1, 0.68, 1] as const;
const SLIDE_GAP = 20;
const STRIP_TEXT_PAD = 24;
const DESKTOP_VISIBLE_SLIDES = 6;
const MOBILE_VISIBLE_SLIDES = 6;
const DESKTOP_BREAKPOINT = 1024;

function MobileTwoLineTitle({ title }: { title: string }) {
  const parts = title.split(" ");
  if (parts.length < 2) return title;

  const firstLine = parts.slice(0, -1).join(" ");
  const secondLine = parts[parts.length - 1];

  return (
    <>
      <span className="block lg:inline">{firstLine}</span>
      <span className="hidden lg:inline"> </span>
      <span className="block lg:inline">{secondLine}</span>
    </>
  );
}

function NavArrow({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "h-3 w-8 shrink-0 text-current transition-colors duration-500",
        className,
      )}
      aria-hidden
    >
      {direction === "left" ? (
        <>
          <path
            d="M28 6H4"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M8 2L4 6L8 10"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M4 6H28"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M24 2L28 6L24 10"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

function fallbackWidths() {
  if (typeof window === "undefined") {
    return { intro: 320, slide: 320 };
  }
  const w = window.innerWidth;
  if (w >= 1280) return { intro: w * 0.3, slide: w * 0.23 };
  if (w >= 1024) return { intro: w * 0.34, slide: w * 0.27 };
  if (w >= 768) return { intro: 0, slide: w * 0.34 };
  if (w >= 640) return { intro: 0, slide: w * 0.42 };
  return { intro: 0, slide: w * 0.48 };
}

function getVisibleViewportWidth(viewport: HTMLElement) {
  const style = getComputedStyle(viewport);
  const paddingLeft = parseFloat(style.paddingLeft) || 0;
  const paddingRight = parseFloat(style.paddingRight) || 0;
  return viewport.clientWidth - paddingLeft - paddingRight;
}

function getMaxScrollOffset(
  track: HTMLElement,
  viewport: HTMLElement,
  lastImage: HTMLElement,
) {
  const trackRect = track.getBoundingClientRect();
  const imageRect = lastImage.getBoundingClientRect();
  const lastImageEnd = imageRect.right - trackRect.left;
  const visibleWidth = getVisibleViewportWidth(viewport);
  return Math.max(0, lastImageEnd - visibleWidth);
}

function buildScrollOffsets(
  introWidth: number,
  slideWidth: number,
  maxScrollOffset: number,
  hasIntro: boolean,
): number[] {
  if (maxScrollOffset <= 0) return [0];

  const slideStep = slideWidth + SLIDE_GAP;
  const offsets: number[] = [0];
  let current = 0;

  if (hasIntro && introWidth > 0) {
    const afterIntro = Math.min(introWidth + SLIDE_GAP, maxScrollOffset);
    if (afterIntro - current > 1) {
      offsets.push(afterIntro);
      current = afterIntro;
    }
  }

  while (current + slideStep < maxScrollOffset - 1) {
    current += slideStep;
    offsets.push(current);
  }

  if (Math.abs(offsets[offsets.length - 1] - maxScrollOffset) > 1) {
    offsets.push(maxScrollOffset);
  }

  return offsets;
}

export function ExploreNivaara() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlideCount, setVisibleSlideCount] = useState(MOBILE_VISIBLE_SLIDES);
  const [stepCount, setStepCount] = useState(1);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [stripStyle, setStripStyle] = useState({ top: 0 });
  const [introPadTop, setIntroPadTop] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const firstSlideRef = useRef<HTMLElement>(null);
  const lastImageRef = useRef<HTMLDivElement>(null);
  const offsetsRef = useRef<number[]>([0]);
  const touchStartX = useRef(0);
  const visibleSpaces = EXPLORE_SPACES.slice(0, visibleSlideCount);
  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === stepCount - 1;

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

    const applyVisibleSlides = () => {
      setVisibleSlideCount(
        media.matches ? DESKTOP_VISIBLE_SLIDES : MOBILE_VISIBLE_SLIDES,
      );
    };

    applyVisibleSlides();
    media.addEventListener("change", applyVisibleSlides);
    return () => media.removeEventListener("change", applyVisibleSlides);
  }, []);

  const updateStrip = useCallback(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const sectionRect = section.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();
    const imageMidY = imageRect.top + imageRect.height / 2 - sectionRect.top;

    setStripStyle({
      top: imageMidY,
    });
    setIntroPadTop(image.offsetHeight / 2 + STRIP_TEXT_PAD);
  }, []);

  const measure = useCallback(() => {
    const intro = introRef.current;
    const firstSlide = firstSlideRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const lastImage = lastImageRef.current;
    const fallback = fallbackWidths();

    const introWidth =
      intro && intro.offsetWidth > 0 ? intro.offsetWidth : fallback.intro;
    const slideWidth =
      firstSlide && firstSlide.offsetWidth > 0
        ? firstSlide.offsetWidth
        : fallback.slide;

    const maxScrollOffset =
      track && viewport && lastImage
        ? getMaxScrollOffset(track, viewport, lastImage)
        : Math.max(
            0,
            introWidth + visibleSlideCount * (slideWidth + SLIDE_GAP),
          );

    const offsets = buildScrollOffsets(
      introWidth,
      slideWidth,
      maxScrollOffset,
      introWidth > 0,
    );
    offsetsRef.current = offsets;
    setStepCount(offsets.length);
    updateStrip();

    return offsets;
  }, [updateStrip, visibleSlideCount]);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(stepCount - 1, 0)));
  }, [stepCount]);

  const applyOffsetForIndex = useCallback(
    (index: number) => {
      const offsets = offsetsRef.current.length ? offsetsRef.current : measure();
      setScrollOffset(offsets[index] ?? 0);
    },
    [measure],
  );

  useLayoutEffect(() => {
    const offsets = measure();
    setScrollOffset(offsets[Math.min(activeIndex, offsets.length - 1)] ?? 0);
  }, [activeIndex, measure, visibleSlideCount]);

  useLayoutEffect(() => {
    updateStrip();
  }, [updateStrip]);

  useEffect(() => {
    measure();
    applyOffsetForIndex(activeIndex);

    const viewport = viewportRef.current;
    const track = trackRef.current;
    const intro = introRef.current;
    const firstSlide = firstSlideRef.current;
    const lastImage = lastImageRef.current;

    const observer = new ResizeObserver(() => {
      measure();
      applyOffsetForIndex(activeIndex);
    });

    if (viewport) observer.observe(viewport);
    if (track) observer.observe(track);
    if (intro) observer.observe(intro);
    if (firstSlide) observer.observe(firstSlide);
    if (lastImage) observer.observe(lastImage);

    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", updateStrip, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", updateStrip);
    };
  }, [activeIndex, applyOffsetForIndex, measure, updateStrip]);

  const advance = useCallback(() => {
    setActiveIndex((index) => {
      const maxIndex = Math.max(offsetsRef.current.length - 1, 0);
      return Math.min(index + 1, maxIndex);
    });
  }, []);

  const retreat = useCallback(() => {
    setActiveIndex((index) => Math.max(index - 1, 0));
  }, []);

  const editorialContent = (onStrip: boolean) => (
    <SectionIntro
      label="Explore Nivaãra"
      title="Discover Spaces Designed for Every Moment in Goa"
      description="Whether you're visiting Nerul for work, a quiet escape, meaningful conversations, or moments of leisure, Nivaãra brings together thoughtfully crafted spaces that balance productivity, comfort, and relaxation."
      light={onStrip}
      align="left"
      titleAs="h2"
    />
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 mb-[-1px] w-full overflow-hidden bg-transparent pt-8 pb-16 md:pt-10 md:pb-24 lg:pt-12 lg:pb-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 bg-[#245F73]/88 transition-[top] duration-300 ease-out"
        style={{
          top: stripStyle.top,
        }}
        aria-hidden
      />

      <aside className="relative z-10 mx-auto max-w-[90rem] shrink-0 px-6 lg:hidden">
        <SoftReveal>{editorialContent(false)}</SoftReveal>
      </aside>

      <div className="relative z-10 mt-16 w-full min-w-0 lg:mt-0">
        <div
          ref={viewportRef}
          className="w-full overflow-hidden pl-6 lg:pl-0"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const delta = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) < 40) return;
            if (delta > 0) advance();
            else retreat();
          }}
        >
          <motion.div
            ref={trackRef}
            className="flex w-max items-start will-change-transform"
            style={{ gap: SLIDE_GAP }}
            animate={{ x: -scrollOffset }}
            transition={{ duration: SCROLL_DURATION, ease: SCROLL_EASE, type: "tween" }}
          >
            <article
              ref={introRef}
              aria-label="Explore Nivaãra introduction"
              className="hidden shrink-0 lg:block lg:w-[34vw] lg:max-w-[28rem] xl:w-[30vw] xl:max-w-[32rem]"
              style={introPadTop > 0 ? { paddingTop: introPadTop } : undefined}
            >
              <SoftReveal className="w-full pl-6 pr-2 xl:pl-10 2xl:pl-16">
                {editorialContent(true)}
              </SoftReveal>
            </article>

            {visibleSpaces.map((space, index) => {
              const isFirst = index === 0;
              const isLast = index === visibleSpaces.length - 1;

              return (
                <article
                  key={space.title}
                  ref={isFirst ? firstSlideRef : undefined}
                  className="w-[48vw] shrink-0 sm:w-[42vw] md:w-[34vw] lg:w-[27vw] xl:w-[23vw]"
                >
                  <SoftReveal index={index + 1}>
                    <div className="group w-full overflow-hidden">
                      <div
                        ref={
                          isFirst
                            ? imageRef
                            : isLast
                              ? lastImageRef
                              : undefined
                        }
                        className="relative aspect-[4/3] w-full overflow-hidden bg-[#c8d5d2]"
                      >
                        <Image
                          src={space.image}
                          alt={space.alt}
                          fill
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 48vw, (max-width: 1280px) 34vw, 23vw"
                          priority={isFirst || isLast}
                          onLoad={isFirst || isLast ? measure : undefined}
                        />
                      </div>
                    </div>

                    <div className="mt-7 w-full">
                      <h3 className={sectionHeadingClass(true, "mt-0")}>
                        <MobileTwoLineTitle title={space.title} />
                      </h3>
                      <p className={sectionBodyClass(true, "mt-3 lg:mt-4")}>
                        {space.description}
                      </p>
                    </div>
                  </SoftReveal>
                </article>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-10 flex justify-end px-6 lg:absolute lg:right-6 lg:bottom-0 lg:mt-0 xl:right-10 2xl:right-16">
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={retreat}
              disabled={isAtStart}
              className={cn(
                "group flex items-center justify-center p-1 text-gold transition-colors duration-500",
                isAtStart
                  ? "cursor-default opacity-35"
                  : "hover:text-gold/80",
              )}
              aria-label="Previous space"
            >
              <NavArrow direction="left" />
            </button>

            <span className="min-w-[2.75rem] text-center font-body text-sm tabular-nums tracking-[0.12em] text-gold">
              {activeIndex + 1}
              <span className="mx-1.5 text-gold/60">/</span>
              {stepCount}
            </span>

            <button
              type="button"
              onClick={advance}
              disabled={isAtEnd}
              className={cn(
                "group flex items-center justify-center p-1 text-gold transition-colors duration-500",
                isAtEnd ? "cursor-default opacity-35" : "hover:text-gold/80",
              )}
              aria-label="Next space"
            >
              <NavArrow direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
