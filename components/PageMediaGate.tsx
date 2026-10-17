"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { waitForPageMediaWithUpdates } from "@/lib/media-preload";

const PAGE_READY_TIMEOUT_MS = 12_000;

/**
 * Softens first paint by waiting for above-the-fold media once.
 * Client navigations stay interactive — no full-screen block / no visibility:hidden
 * (those forced a “second click” feel after every Link tap).
 */
export function PageMediaGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRevealedOnce = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // After the first reveal, never hide the page or put an overlay over clicks.
    if (hasRevealedOnce.current) {
      setReady(true);
      return;
    }

    let cancelled = false;

    const reveal = () => {
      if (cancelled) return;
      hasRevealedOnce.current = true;
      setReady(true);
    };

    const timeoutId = window.setTimeout(reveal, PAGE_READY_TIMEOUT_MS);

    const loadMedia = async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      if (cancelled) return;

      try {
        await waitForPageMediaWithUpdates(container);
      } catch {
        // Never block the page indefinitely.
      }

      reveal();
    };

    void loadMedia();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={containerRef}
        className={ready || hasRevealedOnce.current ? "page-media-ready" : "page-media-loading"}
        aria-busy={!ready && !hasRevealedOnce.current}
      >
        {children}
      </div>
      {!ready && !hasRevealedOnce.current ? (
        <div
          className="fixed inset-0 z-[9999] bg-white"
          aria-live="polite"
          aria-label="Loading page"
        />
      ) : null}
    </>
  );
}
