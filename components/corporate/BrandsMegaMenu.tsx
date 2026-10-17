"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicBrands, type Brand } from "@/lib/brands";
import { getDefaultBookingHref } from "@/lib/booking";
import { cn } from "@/lib/utils";

function BrandMegaPanel({
  brand,
  onNavigate,
}: {
  brand: Brand;
  onNavigate: () => void;
}) {
  return (
    <div className="relative min-h-[280px] p-6 sm:p-8 md:p-10">
      <div className="relative z-10 max-w-lg">
        <div className="flex items-center gap-3">
          <h3 className="font-heading text-2xl text-[#2D2D2D] sm:text-3xl">
            {brand.name}
          </h3>
          {brand.status === "coming-soon" ? (
            <span className="border border-[#C6A86B]/40 px-2 py-0.5 font-body text-[0.6rem] uppercase tracking-[0.14em] text-[#C6A86B]">
              Coming Soon
            </span>
          ) : null}
        </div>
        <p className="mt-2 font-body text-sm text-[#6F6A62]">{brand.tagline}</p>

        {brand.location ? (
          <div className="mt-5 space-y-1">
            <p className="font-body text-xs font-medium uppercase tracking-[0.12em] text-[#C6A86B]">
              Location
            </p>
            <p className="font-body text-sm text-[#2D2D2D]">{brand.location.area}</p>
            {brand.location.detail ? (
              <p className="font-body text-sm text-[#6F6A62]">{brand.location.detail}</p>
            ) : null}
          </div>
        ) : null}

        <p className="mt-5 font-body text-sm leading-relaxed text-[#6F6A62]">
          {brand.megaMenuDescription}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          {brand.exploreHref || brand.route ? (
            <a
              href={brand.exploreHref || brand.route}
              onClick={onNavigate}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#2D2D2D] transition-colors touch-manipulation hover:text-[#C6A86B]"
            >
              Explore {brand.name}
              <span aria-hidden>→</span>
            </a>
          ) : null}
          {brand.status === "live" && brand.bookHref ? (
            <a
              href={getDefaultBookingHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="inline-flex items-center gap-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#C6A86B] transition-colors touch-manipulation hover:text-[#2D2D2D]"
            >
              Book Your Stay
              <span aria-hidden>→</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] md:block">
        <Image
          src={brand.image}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="400px"
        />
      </div>
    </div>
  );
}

export function BrandsMegaMenu({
  open,
  onClose,
  topOffset,
}: {
  open: boolean;
  onClose: () => void;
  topOffset: number;
}) {
  const brands = getPublicBrands();
  const [activeId, setActiveId] = useState(brands[0]?.id ?? "nivaara");
  const active = brands.find((b) => b.id === activeId) ?? brands[0];
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !active) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-[#2D2D2D]/20 backdrop-blur-[2px]"
        aria-hidden
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="fixed left-0 right-0 z-[95] mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10"
        style={{ top: topOffset }}
        role="dialog"
        aria-label="Our brands"
      >
        <div className="overflow-hidden border border-[#E6DDCF] bg-[#FCFBF8] shadow-[0_24px_80px_rgba(45,45,45,0.12)]">
          <div className="grid md:grid-cols-[minmax(220px,280px)_1fr]">
            <div className="border-b border-[#E6DDCF] bg-[#FAF7F2] p-6 md:border-b-0 md:border-r md:p-8">
              <p className="font-body text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#C6A86B]">
                Our Brands
              </p>
              <ul className="mt-5 space-y-1">
                {brands.map((brand) => {
                  const href = brand.exploreHref || brand.route;
                  const itemClass = cn(
                    "block w-full border-l-2 py-3 pl-4 text-left transition-colors touch-manipulation",
                    activeId === brand.id
                      ? "border-[#C6A86B] bg-white/60"
                      : "border-transparent hover:border-[#E6DDCF] hover:bg-white/40",
                  );
                  const label = (
                    <>
                      <span className="block font-heading text-lg text-[#2D2D2D]">
                        {brand.name}
                      </span>
                      <span className="mt-0.5 block font-body text-xs text-[#6F6A62]">
                        {brand.status === "coming-soon"
                          ? "Coming Soon"
                          : brand.tagline}
                      </span>
                    </>
                  );

                  return (
                    <li key={brand.id}>
                      {href ? (
                        <a
                          href={href}
                          onClick={onClose}
                          onMouseEnter={() => setActiveId(brand.id)}
                          onFocus={() => setActiveId(brand.id)}
                          rel="noopener noreferrer"
                          className={itemClass}
                        >
                          {label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveId(brand.id)}
                          className={itemClass}
                        >
                          {label}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/brands"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#C6A86B] transition-colors hover:text-[#2D2D2D]"
              >
                View all brands
                <span aria-hidden>→</span>
              </Link>
            </div>

            <BrandMegaPanel brand={active} onNavigate={onClose} />
          </div>
        </div>
      </div>
    </>
  );
}
