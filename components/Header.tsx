"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ContactNavLink } from "@/components/contact/ContactNavLink";
import { getDefaultBookingHref } from "@/lib/booking";
import { CORPORATE_NAV } from "@/lib/corporate-content";
import {
  GHD_LOGO,
  NAV_ITEMS,
  NIVAARA_LOGO,
  SITE,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const CORPORATE_ROUTES = new Set([
  "/",
  "/about",
  "/brands",
  "/culture",
  "/careers",
  "/contact",
  "/leadership",
]);

function isCorporateRoute(pathname: string) {
  return CORPORATE_ROUTES.has(pathname);
}

/** Transparent-over-hero header on all GHD + Nivaãra pages with a full-bleed hero. */
function hasHeroOverlay(pathname: string) {
  return isCorporateRoute(pathname) || pathname === "/nivaara";
}

type HeaderLogos = {
  transparent: string;
  sticky: string;
  homeHref: string;
  alt: string;
  transparentClassName?: string;
  stickyClassName?: string;
};

function getHeaderLogos(isCorporate: boolean): HeaderLogos {
  if (isCorporate) {
    return {
      transparent: GHD_LOGO,
      sticky: GHD_LOGO,
      homeHref: "/",
      alt: "GHD Hotels",
      transparentClassName: "object-contain object-center",
      stickyClassName: "object-contain object-center",
    };
  }

  return {
    transparent: NIVAARA_LOGO,
    sticky: NIVAARA_LOGO,
    homeHref: "/nivaara",
    alt: "Nivaãra by GHD Hotels",
    transparentClassName: "object-contain object-center scale-[1.05]",
    stickyClassName: "object-contain object-left scale-[1.02]",
  };
}

function contactClass(scrolled: boolean) {
  return cn(
    "site-header__contact font-body text-[0.6875rem] font-normal tracking-[0.04em] transition-colors duration-500 sm:text-[0.75rem]",
    scrolled
      ? "text-[#543119] hover:text-[#543119]/65"
      : "text-white/90 hover:text-white",
  );
}

function navLinkClass(scrolled: boolean, uppercase = true) {
  return cn(
    "site-header__nav-link font-body text-[0.58rem] font-medium tracking-[0.12em] transition-colors duration-500 sm:text-[0.65rem] md:text-xs",
    uppercase && "uppercase",
    scrolled ? "text-charcoal hover:text-charcoal/70" : "text-white/90 hover:text-white",
  );
}

function corporateNavLinkClass(scrolled: boolean) {
  return cn(
    "site-header__nav-link font-body text-[0.7rem] font-medium tracking-[0.04em] transition-colors duration-500 sm:text-[0.75rem] md:text-[0.8125rem]",
    scrolled ? "text-charcoal hover:text-charcoal/70" : "text-white/90 hover:text-white",
  );
}

function NavLinks({
  scrolled,
  isCorporate,
}: {
  scrolled: boolean;
  isCorporate: boolean;
}) {
  if (isCorporate) {
    return (
      <>
        {CORPORATE_NAV.map((item) => (
          <li key={item.label} className="shrink-0">
            <Link
              href={item.href}
              className={corporateNavLinkClass(scrolled)}
              style={{ color: scrolled ? "#111111" : undefined }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </>
    );
  }

  return (
    <>
      {NAV_ITEMS.map((item) =>
        item.label === "CONTACT" ? (
          <li key={item.href} className="shrink-0">
            <ContactNavLink
              className={navLinkClass(scrolled)}
              style={{ color: scrolled ? "#111111" : undefined }}
            >
              {item.label}
            </ContactNavLink>
          </li>
        ) : (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              className={navLinkClass(scrolled, item.label !== "FAQs")}
              style={{ color: scrolled ? "#111111" : undefined }}
            >
              {item.label}
            </Link>
          </li>
        ),
      )}
    </>
  );
}

const mobileNavLinkClass =
  "site-header__nav-link block w-full px-5 py-3.5 text-center font-body text-xs font-medium uppercase tracking-[0.12em] text-charcoal transition-colors hover:bg-muted/60";

const corporateMobileNavLinkClass =
  "site-header__nav-link block w-full px-5 py-3.5 text-center font-body text-sm font-medium tracking-[0.02em] text-charcoal transition-colors hover:bg-muted/60";

function useMobileMenu() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return { menuOpen, setMenuOpen, closeMenu };
}

function MobileNavMenu({
  open,
  onClose,
  menuId,
  isCorporate,
}: {
  open: boolean;
  onClose: () => void;
  menuId: string;
  isCorporate: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuTransition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };
  const backdropTransition = { duration: 0.32, ease: "easeOut" as const };

  const navLinks = isCorporate
    ? CORPORATE_NAV.map((item) => (
        <li key={item.label}>
          <Link href={item.href} onClick={onClose} className={corporateMobileNavLinkClass}>
            {item.label}
          </Link>
        </li>
      ))
    : NAV_ITEMS.map((item) =>
        item.label === "CONTACT" ? (
          <li key={item.href}>
            <ContactNavLink className={mobileNavLinkClass} onNavigate={onClose}>
              {item.label}
            </ContactNavLink>
          </li>
        ) : (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              className={cn(mobileNavLinkClass, item.label !== "FAQs" && "uppercase")}
            >
              {item.label}
            </Link>
          </li>
        ),
      );

  const menuPanel = (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            key={`${menuId}-backdrop`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            className={cn(
              "bg-black/30 md:hidden",
              isCorporate ? "fixed inset-0 z-[110]" : "fixed inset-0 z-[99]",
            )}
            aria-label="Close menu"
            onClick={onClose}
          />

          <motion.nav
            id={menuId}
            key={`${menuId}-panel`}
            initial={isCorporate ? { x: "100%" } : { opacity: 0, y: -16 }}
            animate={isCorporate ? { x: 0 } : { opacity: 1, y: 0 }}
            exit={isCorporate ? { x: "100%" } : { opacity: 0, y: -16 }}
            transition={menuTransition}
            className={cn(
              "bg-white md:hidden",
              isCorporate
                ? "fixed bottom-0 right-0 top-14 z-[111] flex w-[min(100%,20rem)] flex-col border-l border-border shadow-[-16px_0_40px_rgba(17,17,17,0.1)]"
                : "absolute inset-x-0 top-full z-[101] border-t border-border shadow-[0_12px_32px_rgba(17,17,17,0.08)]",
            )}
            aria-label="Primary navigation"
          >
            <div className={cn(isCorporate && "overflow-y-auto")}>
              <ul>{navLinks}</ul>

              {!isCorporate ? (
                <div className="border-t border-border px-5 py-4">
                  <a
                    href={getDefaultBookingHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex h-11 w-full items-center justify-center rounded-none bg-gold font-body text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#b89755]"
                  >
                    Book Now
                  </a>
                </div>
              ) : null}
            </div>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );

  if (isCorporate && mounted) {
    return createPortal(menuPanel, document.body);
  }

  return menuPanel;
}

function MobileMenuButton({
  open,
  onClick,
  menuId,
  light = false,
  className,
}: {
  open: boolean;
  onClick: () => void;
  menuId: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center transition-colors md:hidden",
        light ? "text-white hover:text-white/75" : "text-charcoal hover:text-charcoal/70",
        className,
      )}
      onClick={onClick}
      aria-expanded={open}
      aria-controls={menuId}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {open ? (
        <X className="h-5 w-5" aria-hidden />
      ) : (
        <Menu className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}

function LogoLink({
  logos,
  variant,
  className,
}: {
  logos: HeaderLogos;
  variant: "transparent" | "sticky";
  className?: string;
}) {
  const src = variant === "transparent" ? logos.transparent : logos.sticky;
  const imageClass =
    variant === "transparent"
      ? logos.transparentClassName ?? "object-contain object-center"
      : logos.stickyClassName ?? "object-contain object-left";

  return (
    <Link
      href={logos.homeHref}
      className={cn("site-header__logo relative block shrink-0", className)}
      aria-label={`${logos.alt} home`}
    >
      <Image
        src={src}
        alt={logos.alt}
        fill
        className={imageClass}
        sizes="(max-width: 768px) 120px, 240px"
        priority
      />
    </Link>
  );
}

function TransparentHeaderContent({
  logos,
  isCorporate,
}: {
  logos: HeaderLogos;
  isCorporate: boolean;
}) {
  const { menuOpen, setMenuOpen, closeMenu } = useMobileMenu();

  return (
    <div className="relative">
      <div className="px-4 pt-3 pb-3 md:hidden">
        <div
          className={cn(
            "relative mx-auto flex max-w-7xl items-center",
            isCorporate ? "justify-center" : "justify-between gap-3",
          )}
        >
          <LogoLink
            logos={logos}
            variant="transparent"
            className={cn(
              isCorporate
                ? "h-9 w-[9.5rem] sm:h-10 sm:w-[11rem]"
                : "h-9 w-[6.75rem] sm:h-10 sm:w-[7.75rem]",
              isCorporate && "mx-auto",
            )}
          />

          <MobileMenuButton
            open={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            menuId="hero-mobile-menu"
            light
            className={cn(
              isCorporate ? "absolute right-0 top-1/2 -translate-y-1/2" : undefined,
            )}
          />
        </div>

        <MobileNavMenu
          open={menuOpen}
          onClose={closeMenu}
          menuId="hero-mobile-menu"
          isCorporate={isCorporate}
        />
      </div>

      {isCorporate ? (
        <div className="mx-auto hidden h-20 max-w-7xl items-center justify-center px-4 sm:px-6 md:flex lg:px-10">
          <LogoLink
            logos={logos}
            variant="transparent"
            className="h-10 w-[10rem] sm:h-11 sm:w-[12rem] md:h-12 md:w-[13.5rem] lg:h-[3.75rem] lg:w-[15rem]"
          />
        </div>
      ) : (
        <div className="mx-auto hidden h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 md:grid lg:px-10">
          <div
            className="justify-self-start border border-white/80 px-3 py-1.5 font-body text-[0.6875rem] font-normal tracking-[0.08em] text-white/90 sm:px-4 sm:py-2 sm:text-[0.75rem]"
            aria-label={SITE.property}
          >
            {SITE.property}
          </div>

          <LogoLink
            logos={logos}
            variant="transparent"
            className="h-10 w-[8rem] justify-self-center sm:h-11 sm:w-[9rem] md:h-12 md:w-[10rem] lg:h-[3.75rem] lg:w-[11rem]"
          />

          <div className={cn("flex flex-col items-end justify-self-end leading-snug", contactClass(false))}>
            <a href={SITE.phoneHref} className="site-header__contact whitespace-nowrap transition-colors duration-500">
              {SITE.phone}
            </a>
            <a
              href={SITE.phoneSecondaryHref}
              className="site-header__contact mt-0.5 whitespace-nowrap transition-colors duration-500"
            >
              {SITE.phoneSecondary}
            </a>
          </div>
        </div>
      )}

      <div className="hidden justify-center px-4 sm:px-8 md:flex">
        <div className="h-[0.5px] w-full max-w-7xl bg-white/80" aria-hidden />
      </div>

      <nav className="relative hidden bg-transparent md:block" aria-label="Primary navigation">
        <ul className="mx-auto flex h-11 max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 sm:h-12 sm:gap-x-6 sm:px-6 md:gap-x-8 lg:gap-x-10 lg:px-10">
          <NavLinks
            scrolled={false}
            isCorporate={isCorporate}
          />
        </ul>
      </nav>
    </div>
  );
}

function StickyHeaderContent({
  logos,
  isCorporate,
}: {
  logos: HeaderLogos;
  isCorporate: boolean;
}) {
  const { menuOpen, setMenuOpen, closeMenu } = useMobileMenu();

  return (
    <div className="relative w-full bg-white">
      {isCorporate ? (
        <div className="relative flex h-14 w-full items-center justify-center px-3 md:hidden sm:px-6">
          <LogoLink
            logos={logos}
            variant="sticky"
            className="h-9 w-[10rem] sm:h-10 sm:w-[12rem]"
          />
          <MobileMenuButton
            open={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            menuId="sticky-mobile-menu"
            className="absolute right-3 sm:right-6"
          />
        </div>
      ) : (
        <div className="flex h-14 w-full items-stretch md:hidden">
          <div className="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-3 px-3 sm:px-6">
            <LogoLink
              logos={logos}
              variant="sticky"
              className="h-9 w-[10rem] sm:h-10 sm:w-[12rem]"
            />
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={getDefaultBookingHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-none bg-gold px-3.5 py-2 font-body text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#b89755]"
              >
                Book Now
              </a>
              <MobileMenuButton
                open={menuOpen}
                onClick={() => setMenuOpen((current) => !current)}
                menuId="sticky-mobile-menu"
              />
            </div>
          </div>
        </div>
      )}

      {isCorporate ? (
        <div className="hidden md:block">
          <div className="relative flex h-14 items-center justify-center px-6 lg:px-10">
            <LogoLink
              logos={logos}
              variant="sticky"
              className="h-9 w-[10rem] sm:h-10 sm:w-[12rem] md:h-11 md:w-[14rem]"
            />
          </div>
          <nav className="border-t border-border/60" aria-label="Primary navigation">
            <ul className="mx-auto flex h-11 max-w-7xl items-center justify-center gap-5 px-6 md:gap-6 lg:gap-8 lg:px-10">
              <NavLinks
                scrolled={true}
                isCorporate={isCorporate}
              />
            </ul>
          </nav>
        </div>
      ) : (
        <div className="hidden h-14 w-full items-stretch md:flex md:h-16">
          <div className="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-3 px-3 pointer-events-none sm:px-6 lg:px-10">
            <LogoLink
              logos={logos}
              variant="sticky"
              className="pointer-events-auto h-9 w-[10rem] sm:h-10 sm:w-[12rem] md:h-11 md:w-[13.5rem] lg:w-[15rem]"
            />

            <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 md:hidden">
              <a
                href={getDefaultBookingHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-none bg-gold px-3.5 py-2 font-body text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#b89755]"
              >
                Book Now
              </a>
              <MobileMenuButton
                open={menuOpen}
                onClick={() => setMenuOpen((current) => !current)}
                menuId="sticky-mobile-menu"
              />
            </div>
          </div>

          <nav
            className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center md:flex"
            aria-label="Primary navigation"
          >
            <ul className="pointer-events-auto flex items-center justify-center gap-5 md:gap-6 lg:gap-8">
              <NavLinks
                scrolled={true}
                isCorporate={isCorporate}
              />
            </ul>
          </nav>

          <div className="relative z-10 hidden shrink-0 items-center pr-3 sm:pr-6 md:flex lg:pr-10">
            <a
              href={getDefaultBookingHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__book-now inline-flex items-center justify-center rounded-none bg-gold px-5 py-2.5 font-body text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#b89755] hover:shadow-[0_8px_20px_rgba(198,168,106,0.35)] lg:px-6"
            >
              Book Now
            </a>
          </div>
        </div>
      )}

      <MobileNavMenu
        open={menuOpen}
        onClose={closeMenu}
        menuId="sticky-mobile-menu"
        isCorporate={isCorporate}
      />
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const isCorporate = isCorporateRoute(pathname);
  const hasHero = hasHeroOverlay(pathname);
  const logos = getHeaderLogos(isCorporate);

  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(132);
  const heroHeaderRef = useRef<HTMLElement>(null);
  const stickyHeaderRef = useRef<HTMLElement>(null);

  const measureHeader = useCallback(() => {
    if (heroHeaderRef.current) {
      setHeaderHeight(heroHeaderRef.current.offsetHeight);
    }
  }, []);

  useLayoutEffect(() => {
    measureHeader();
    window.addEventListener("resize", measureHeader, { passive: true });
    return () => window.removeEventListener("resize", measureHeader);
  }, [measureHeader, pathname, hasHero]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const heroOffset = Math.min(scrollY, headerHeight);
  const showStickyHeader = !hasHero || scrollY >= headerHeight;

  const headerProps = {
    logos,
    isCorporate,
  };

  if (!hasHero) {
    return (
      <header
        ref={stickyHeaderRef}
        className="site-header site-header--scrolled fixed inset-x-0 top-0 z-[100] bg-white shadow-[0_4px_24px_rgba(17,17,17,0.06)]"
        style={{ backgroundColor: "#ffffff" }}
      >
        <StickyHeaderContent {...headerProps} />
      </header>
    );
  }

  return (
    <>
      <header
        ref={heroHeaderRef}
        className="site-header pointer-events-none fixed inset-x-0 top-0 z-[100] bg-transparent will-change-transform"
        style={{
          transform: `translate3d(0, -${heroOffset}px, 0)`,
        }}
        aria-hidden={showStickyHeader}
        inert={showStickyHeader ? true : undefined}
      >
        <div className={cn("pointer-events-auto", showStickyHeader && "pointer-events-none")}>
          <TransparentHeaderContent {...headerProps} />
        </div>
      </header>

      <header
        ref={stickyHeaderRef}
        data-scrolled={showStickyHeader}
        className={cn(
          "site-header site-header--scrolled fixed inset-x-0 top-0 z-[100] bg-white shadow-[0_4px_24px_rgba(17,17,17,0.06)] transition-[opacity,transform] duration-300 ease-out",
          showStickyHeader
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0",
        )}
        style={{ backgroundColor: "#ffffff" }}
        aria-hidden={!showStickyHeader}
        inert={!showStickyHeader ? true : undefined}
      >
        <StickyHeaderContent {...headerProps} />
      </header>
    </>
  );
}
