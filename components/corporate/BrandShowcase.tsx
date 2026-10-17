"use client";

import Image from "next/image";
import Link from "next/link";
import { getPublicBrands, type Brand } from "@/lib/brands";
import { BRAND_SHOWCASE, BRANDS_SECTION } from "@/lib/corporate-content";
import { cn } from "@/lib/utils";
import { FadeInSection, SectionHeading } from "./CorporateUi";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function BrandRow({
  brand,
  imageOnRight = false,
  priority = false,
}: {
  brand: Brand;
  imageOnRight?: boolean;
  priority?: boolean;
}) {
  const showcase = BRAND_SHOWCASE[brand.id as keyof typeof BRAND_SHOWCASE];
  if (!showcase) return null;

  const imageSrc = showcase.image;
  const imageAlt = showcase.imageAlt;
  const cta = "cta" in showcase ? showcase.cta : null;
  const cardHref = brand.exploreHref || brand.route || cta?.href || null;

  const locationLine = brand.location
    ? [brand.location.area, brand.location.detail].filter(Boolean).join(" · ")
    : null;

  const textBlock = (
    <div
      className={cn(
        "flex min-w-0 flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 md:py-0 lg:px-12",
        imageOnRight
          ? "md:order-1 md:pl-6 md:pr-10 lg:pl-10 lg:pr-16"
          : "md:order-2 md:pl-10 md:pr-6 lg:pl-16 lg:pr-10",
      )}
    >
      <h3 className="font-heading text-2xl font-normal text-[#2D2D2D] sm:text-3xl md:text-4xl lg:text-[2.75rem]">
        {brand.name}
      </h3>

      <p className="mt-2 font-body text-sm font-normal tracking-[0.02em] text-[#C6A86B] sm:mt-3 sm:text-base">
        {brand.tagline}
      </p>

      {locationLine ? (
        <p className="mt-3 font-body text-xs text-[#2D2D2D] sm:mt-4 sm:text-sm">
          {locationLine}
        </p>
      ) : null}

      <p className="mt-4 font-body text-[0.65rem] font-medium uppercase tracking-[0.1em] text-[#2D2D2D]/75 sm:mt-5 sm:text-[0.7rem] sm:tracking-[0.12em]">
        {brand.positioning}
      </p>

      {cta && cardHref ? (
        <div className="mt-5 sm:mt-7">
          <span className="inline-flex items-center gap-2 border border-[#C6A86B] bg-[#C6A86B] px-4 py-2.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#2D2D2D] transition-colors [@media(hover:hover)]:group-hover:bg-[#b8975a] sm:px-5 sm:py-3 sm:text-[0.72rem] sm:tracking-[0.16em]">
            {cta.label}
            <span aria-hidden>→</span>
          </span>
        </div>
      ) : null}
    </div>
  );

  const imageBlock = (
    <div
      className={cn(
        "relative min-h-56 overflow-hidden bg-[#E6DDCF] sm:min-h-72 md:min-h-[32rem] lg:min-h-[40rem]",
        imageOnRight ? "md:order-2" : "md:order-1",
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        quality={85}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 68vw"
      />
    </div>
  );

  const rowClass = cn(
    "grid w-full items-stretch grid-cols-1",
    imageOnRight ? "md:grid-cols-[1fr_68%]" : "md:grid-cols-[68%_1fr]",
  );

  const rowInner = (
    <>
      {imageBlock}
      {textBlock}
    </>
  );

  if (cardHref) {
    const linkClass = cn("group block touch-manipulation", rowClass);
    if (isExternalHref(cardHref)) {
      return (
        <a
          href={cardHref}
          aria-label={`Explore ${brand.name}`}
          className={linkClass}
          rel="noopener noreferrer"
        >
          {rowInner}
        </a>
      );
    }

    return (
      <Link
        href={cardHref}
        prefetch
        aria-label={`Explore ${brand.name}`}
        className={linkClass}
      >
        {rowInner}
      </Link>
    );
  }

  return <article className={rowClass}>{rowInner}</article>;
}

export function BrandShowcase({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const brands = getPublicBrands();

  return (
    <section id="brands" className="bg-white py-12 sm:py-16 lg:py-20">
      {showHeading ? (
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <FadeInSection>
            <SectionHeading>{BRANDS_SECTION.title}</SectionHeading>
          </FadeInSection>
        </div>
      ) : null}

      <div
        className={cn(
          "flex w-full flex-col gap-10 sm:gap-16 md:gap-20 lg:gap-24",
          showHeading ? "mt-8 sm:mt-12 lg:mt-14" : "",
        )}
      >
        {brands.map((brand, index) => (
          <BrandRow
            key={brand.id}
            brand={brand}
            imageOnRight={index % 2 === 1}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
