"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GHD_FAVICON } from "@/lib/constants";

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

/** Keeps the tab icon on the GHD Hotels mark across client navigations. */
export function FaviconSwitcher() {
  const pathname = usePathname();

  useEffect(() => {
    // Cache-bust so browsers pick up logo replacements at the same path.
    setFavicon(`${GHD_FAVICON}?v=4`);
  }, [pathname]);

  return null;
}
