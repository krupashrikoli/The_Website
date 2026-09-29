"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { NIVAARA_FAVICON } from "@/lib/constants";

function setFavicon(href: string) {
  const head = document.head;
  const existing = head.querySelectorAll<HTMLLinkElement>(
    "link[rel='icon'], link[rel='shortcut icon']",
  );

  existing.forEach((link) => link.remove());

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/webp";
  link.href = href;
  head.appendChild(link);
}

/** Keeps the tab icon on the current Nivaãra mark across client navigations. */
export function FaviconSwitcher() {
  const pathname = usePathname();

  useEffect(() => {
    // Cache-bust so browsers pick up logo replacements at the same brand path.
    setFavicon(`${NIVAARA_FAVICON}?v=2`);
  }, [pathname]);

  return null;
}
