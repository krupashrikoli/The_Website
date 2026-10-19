"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getPublicBrands, type Brand } from "@/lib/brands";
import { BRAND_SHOWCASE, BRANDS_SECTION } from "@/lib/corporate-content";
import { cn } from "@/lib/utils";
import { FadeInSection, SectionHeading } from "./CorporateUi";

/** Visual order: Nivaãra left · Samrāya center · Celéstra right */
const BRAND_DISPLAY_ORDER = ["nivaara", "samraya", "celestra"] as const;

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function getShowcase(brand: Brand) {
  return BRAND_SHOWCASE[brand.id as keyof typeof BRAND_SHOWCASE] ?? null;
}

function brandHref(brand: Brand) {
  const showcase = getShowcase(brand);
  const cta = showcase && "cta" in showcase ? showcase.cta : null;
  return brand.exploreHref || brand.route || cta?.href || null;
}

function orderedBrands(): Brand[] {
  const all = getPublicBrands();
  return BRAND_DISPLAY_ORDER.map((id) => all.find((brand) => brand.id === id)).filter(
    (brand): brand is Brand => Boolean(brand),
  );
}

function LandscapeBrandCard({
  brand,
  priority = false,
  interactive = false,
}: {
  brand: Brand;
  priority?: boolean;
  interactive?: boolean;
}) {
  const showcase = getShowcase(brand);
  if (!showcase) return null;

  const href = brandHref(brand);
  const cta = "cta" in showcase ? showcase.cta : null;
  const locationLine = brand.location
    ? [brand.location.area, brand.location.detail].filter(Boolean).join(" · ")
    : null;

  const ctaClassName =
    "relative z-[70] inline-flex items-center gap-2 border border-[#C6A86B] bg-[#C6A86B] px-3.5 py-2 font-body text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#2D2D2D] transition-colors hover:bg-[#b8975a] sm:px-4 sm:text-[0.7rem]";

  return (
    <article className="group relative w-full overflow-hidden border border-[#C6A86B]/35 bg-white shadow-[0_22px_55px_rgba(45,45,45,0.18)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6DDCF] sm:aspect-[16/9]">
        <Image
          src={showcase.image}
          alt={showcase.imageAlt}
          fill
          priority={priority}
          quality={85}
          className="pointer-events-none object-cover"
          sizes="(max-width: 768px) 88vw, 720px"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(18,14,10,0.72)_100%)]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-10 text-left sm:px-7 sm:pb-6">
          <h3 className="font-heading text-2xl font-normal text-white sm:text-3xl md:text-[2.15rem]">
            {brand.name}
          </h3>
          <p className="mt-1.5 max-w-xl font-body text-sm text-white/90 sm:text-base">
            {brand.tagline}
          </p>
          {locationLine ? (
            <p className="mt-2 font-body text-xs text-white/75 sm:text-sm">
              {locationLine}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-body text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/80 sm:text-[0.7rem]">
              {brand.positioning}
            </p>
            {cta && href ? (
              interactive ? (
                isExternalHref(href) ? (
                  <a
                    href={href}
                    rel="noopener noreferrer"
                    className={cn(ctaClassName, "touch-manipulation")}
                    onClick={(event) => event.stopPropagation()}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    {cta.label}
                    <span aria-hidden>→</span>
                  </a>
                ) : (
                  <Link
                    href={href}
                    prefetch
                    className={cn(ctaClassName, "touch-manipulation")}
                    onClick={(event) => event.stopPropagation()}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    {cta.label}
                    <span aria-hidden>→</span>
                  </Link>
                )
              ) : (
                <span className={ctaClassName}>
                  {cta.label}
                  <span aria-hidden>→</span>
                </span>
              )
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Shortest circular offset in range [-floor(n/2), ...] so 3 cards stay left/center/right */
function circularOffset(index: number, active: number, count: number) {
  let diff = index - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
}

function coverflowStyle(offset: number, dragProgress: number, spread: number) {
  const position = offset - dragProgress;
  const abs = Math.abs(position);
  const side = Math.sign(position);

  return {
    x: position * spread,
    scale: abs < 0.01 ? 1 : Math.max(0.82, 1 - abs * 0.1),
    opacity: abs < 0.01 ? 1 : Math.max(0.35, 1 - abs * 0.38),
    blur: abs < 0.01 ? 0 : Math.min(3.5, abs * 2.2),
    zIndex: Math.round(30 - abs * 10),
    rotateY: side * Math.min(abs, 1.2) * -8,
  };
}

function BrandCoverflow({ brands }: { brands: Brand[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);
  const startIndex = Math.max(
    0,
    brands.findIndex((brand) => brand.id === "samraya"),
  );
  const activeIndexRef = useRef(startIndex);
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [dragProgress, setDragProgress] = useState(0);
  const [spread, setSpread] = useState(260);
  const [isDragging, setIsDragging] = useState(false);

  const count = brands.length;

  const goToBrand = useCallback(
    (index: number) => {
      if (count === 0) return;
      const next = ((index % count) + count) % count;
      activeIndexRef.current = next;
      setActiveIndex(next);
      setDragProgress(0);
    },
    [count],
  );

  const rotateBy = useCallback(
    (step: number) => {
      goToBrand(activeIndexRef.current + step);
    },
    [goToBrand],
  );

  useEffect(() => {
    const updateSpread = () => {
      const width = stageRef.current?.clientWidth ?? window.innerWidth;
      // Keep side cards peeking out beyond the center card
      setSpread(Math.min(380, Math.max(180, width * 0.34)));
    };

    updateSpread();
    window.addEventListener("resize", updateSpread);
    return () => window.removeEventListener("resize", updateSpread);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        rotateBy(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        rotateBy(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [rotateBy]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    // Let Explore More / side hit-zones receive the full click (no capture steal)
    const target = event.target as Element | null;
    if (target?.closest("a, button")) {
      didDrag.current = false;
      dragStartX.current = null;
      return;
    }

    dragStartX.current = event.clientX;
    didDrag.current = false;
    stageRef.current?.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const deltaX = event.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 10) {
      didDrag.current = true;
      setIsDragging(true);
    }

    if (!didDrag.current) return;

    const next = Math.max(
      -1,
      Math.min(1, -deltaX / Math.max(180, spread * 0.9)),
    );
    setDragProgress(next);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const deltaX = event.clientX - dragStartX.current;
    dragStartX.current = null;
    setIsDragging(false);

    try {
      stageRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }

    if (didDrag.current && (Math.abs(deltaX) > 50 || Math.abs(dragProgress) > 0.32)) {
      rotateBy(deltaX < 0 ? 1 : -1);
    } else {
      setDragProgress(0);
    }

    // Clear after the click event so side-card / hit-zone handlers still see drag state
    window.setTimeout(() => {
      didDrag.current = false;
    }, 0);
  };

  return (
    <div className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      <div
        className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10"
        role="region"
        aria-roledescription="carousel"
        aria-label="GHD Hotels brands carousel"
      >
        <div
          ref={stageRef}
          className={cn(
            "relative mx-auto flex h-[min(58vw,22rem)] w-full max-w-[1100px] items-center justify-center touch-pan-y sm:h-[24rem] md:h-[26rem] lg:h-[28rem]",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          style={{ perspective: "1600px" }}
          onPointerDownCapture={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {brands.map((brand, index) => {
            const offset = circularOffset(index, activeIndex, count);
            const style = coverflowStyle(offset, dragProgress, spread);
            const isActive =
              index === activeIndex && Math.abs(dragProgress) < 0.2;

            return (
              <motion.div
                key={brand.id}
                className={cn(
                  "absolute left-1/2 top-1/2 w-[min(82vw,40rem)] sm:w-[min(70vw,42rem)] md:w-[44rem] lg:w-[48rem]",
                  !isActive && "cursor-pointer",
                )}
                initial={false}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  opacity: style.opacity,
                  rotateY: style.rotateY,
                  filter: `blur(${style.blur}px)`,
                }}
                transformTemplate={({ x, scale, rotateY }) =>
                  `translate(-50%, -50%) translateX(${x}) rotateY(${rotateY}) scale(${scale})`
                }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 0.85,
                }}
                style={{
                  zIndex: style.zIndex,
                  transformStyle: "preserve-3d",
                  // Side peeks stay clickable so left/right brands rotate into center
                  pointerEvents: "auto",
                }}
                aria-hidden={!isActive}
                onClick={() => {
                  if (!isActive && !didDrag.current) {
                    goToBrand(index);
                  }
                }}
              >
                <div
                  onClickCapture={(event) => {
                    if (didDrag.current) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }}
                >
                  <LandscapeBrandCard
                    brand={brand}
                    priority={brand.id === "samraya"}
                    interactive={isActive}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Side peeks for rotation — leave the bottom CTA band free for Explore More */}
          <button
            type="button"
            aria-label="Show previous brand"
            className="absolute bottom-[30%] left-0 top-0 z-[60] w-[34%] cursor-pointer bg-transparent"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!didDrag.current) rotateBy(-1);
            }}
          />
          <button
            type="button"
            aria-label="Show next brand"
            className="absolute bottom-[30%] right-0 top-0 z-[60] w-[34%] cursor-pointer bg-transparent"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!didDrag.current) rotateBy(1);
            }}
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          {brands.map((brand, index) => (
            <button
              key={brand.id}
              type="button"
              aria-label={`Show ${brand.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goToBrand(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-7 bg-[#C6A86B]"
                  : "w-2 bg-[#2D2D2D]/25 hover:bg-[#2D2D2D]/4",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticBrandFallback({ brands }: { brands: Brand[] }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {brands.map((brand, index) => (
        <div
          key={brand.id}
          className="w-[min(88vw,40rem)] shrink-0 snap-center"
        >
          <LandscapeBrandCard
            brand={brand}
            priority={index === 0}
            interactive
          />
        </div>
      ))}
    </div>
  );
}

export function BrandShowcase({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const brands = useMemo(() => orderedBrands(), []);
  const reduceMotion = useReducedMotion();

  return (
    <section id="brands" className="bg-white">
      {showHeading ? (
        <div className="mx-auto max-w-[1100px] px-6 pt-12 sm:pt-16 lg:px-10 lg:pt-20">
          <FadeInSection>
            <SectionHeading>{BRANDS_SECTION.title}</SectionHeading>
          </FadeInSection>
        </div>
      ) : (
        <div className="pt-8 sm:pt-10" />
      )}

      {reduceMotion ? (
        <div className="pb-12 sm:pb-16 lg:pb-20">
          <StaticBrandFallback brands={brands} />
        </div>
      ) : (
        <BrandCoverflow brands={brands} />
      )}
    </section>
  );
}
