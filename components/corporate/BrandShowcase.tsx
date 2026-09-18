"use client";

import Image from "next/image";
import { getPublicBrands, type Brand } from "@/lib/brands";
import { BRAND_SHOWCASE, BRANDS_SECTION } from "@/lib/corporate-content";
import {
  FadeInSection,
  GoldLink,
  SectionHeading,
} from "./CorporateUi";

function BrandImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 65vw"
      />
    </div>
  );
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
  const isComingSoon = brand.status === "coming-soon";

  const textBlock = (
    <div className="flex h-full flex-col justify-center p-5 sm:p-6 lg:p-7">
      {isComingSoon ? (
        <span className="mb-2 inline-block w-fit border border-[#C6A86B]/60 px-2 py-0.5 font-body text-[0.55rem] uppercase tracking-[0.16em] text-[#C6A86B]">
          Coming Soon
        </span>
      ) : null}
      <h3 className="font-heading text-3xl font-normal text-[#2D2D2D] sm:text-4xl">
        {brand.name}
      </h3>
      <p className="mt-2 font-body text-sm font-normal tracking-[0.02em] text-[#C6A86B] sm:text-base">
        {brand.tagline}
      </p>
      {brand.location ? (
        <div className="mt-3 space-y-0.5">
          <p className="font-body text-xs text-[#2D2D2D] sm:text-sm">
            {brand.location.area}
          </p>
          {brand.location.detail ? (
            <p className="font-body text-xs text-[#6F6A62] sm:text-sm">
              {brand.location.detail}
            </p>
          ) : null}
        </div>
      ) : null}
      {cta ? (
        <div className="mt-5">
          <GoldLink href={cta.href}>{cta.label}</GoldLink>
        </div>
      ) : null}
    </div>
  );

  const imageBlock = <BrandImage src={imageSrc} alt={imageAlt} priority={priority} />;

  return (
    <article
      className={
        imageOnRight
          ? "grid overflow-hidden border border-[#E6DDCF] md:grid-cols-[1fr_1.75fr]"
          : "grid overflow-hidden border border-[#E6DDCF] md:grid-cols-[1.75fr_1fr]"
      }
    >
      {imageOnRight ? (
        <>
          <div className="order-2 h-full md:order-1">{textBlock}</div>
          <div className="order-1 h-full md:order-2">{imageBlock}</div>
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </article>
  );
}

export function BrandShowcase({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const brands = getPublicBrands();

  return (
    <section id="brands" className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {showHeading ? (
          <FadeInSection>
            <SectionHeading>{BRANDS_SECTION.title}</SectionHeading>
          </FadeInSection>
        ) : null}

        <div
          className={
            showHeading ? "mt-6 space-y-5 sm:mt-8 lg:space-y-6" : "space-y-5 lg:space-y-6"
          }
        >
          {brands.map((brand, index) => (
            <FadeInSection key={brand.id}>
              <BrandRow
                brand={brand}
                imageOnRight={index % 2 === 1}
                priority={index === 0}
              />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
