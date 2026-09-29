"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { getDefaultBookingHref } from "@/lib/booking";
import { NIVAARA_QUICK_CONTACT } from "@/lib/constants";

/** Property routes where the sticky Book Now strip should appear */
const PROPERTY_ROUTE_PREFIXES = [
  "/nivaara",
  "/rooms",
  "/booking",
  "/faqs",
  "/city-attractions",
  "/gallery",
];

function isPropertyRoute(pathname: string) {
  return PROPERTY_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

const WHATSAPP_ICON = "/icons/whatsapp.svg";
const CALL_ICON = "/icons/call.svg";

const iconLinkClass =
  "inline-flex size-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function StickyBookingButton() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isPropertyRoute(pathname)) {
    return null;
  }

  const href = getDefaultBookingHref();
  const { phoneHref, whatsappHref } = NIVAARA_QUICK_CONTACT;

  const contactIcons = (
    <>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Nivaãra"
        className={iconLinkClass}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={WHATSAPP_ICON} alt="" width={26} height={26} className="size-[26px]" />
      </a>
      <a
        href={phoneHref}
        aria-label="Call Nivaãra"
        className={iconLinkClass}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CALL_ICON} alt="" width={24} height={24} className="size-6" />
      </a>
    </>
  );

  return createPortal(
    <>
      {/* Mobile: icons above Book Now */}
      <div className="mobile-book-cluster md:hidden">
        <div className="mobile-book-cluster__icons">{contactIcons}</div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book your stay at Nivaãra"
          className="mobile-book-cluster__book"
        >
          Book Now
        </a>
      </div>

      {/* Desktop: icons stacked above Book Now */}
      <div className="fixed right-8 bottom-8 z-[9998] hidden flex-col items-end gap-3 md:flex">
        <div className="flex flex-col items-center gap-2.5">{contactIcons}</div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book your stay at Nivaãra"
          className="inline-flex items-center justify-center bg-gold px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(198,168,106,0.45)] transition-all duration-300 hover:bg-[#b89755] hover:shadow-[0_16px_36px_rgba(198,168,106,0.5)]"
        >
          Book Now
        </a>
      </div>
    </>,
    document.body,
  );
}
