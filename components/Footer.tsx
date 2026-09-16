import Image from "next/image";
import Link from "next/link";
import { ContactNavLink } from "@/components/contact/ContactNavLink";
import {
  GHD_LOGO,
  NAV_ITEMS,
  NIVAARA_LOGO,
  SAMRAYA_LOGO,
  SOCIAL_LINKS,
} from "@/lib/constants";

type IconProps = {
  className?: string;
};

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 8.5H16V5.5H13.5C11.01 5.5 9 7.51 9 10v2.5H7v3h2V21h3v-5.5h2.6L15 13h-3v-2.5c0-.83.67-1.5 1.5-1.5z" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.94 5a2 2 0 1 1 .02 4 2 2 0 0 1-.02-4ZM5 8.75h3.88V20H5V8.75Zm6.13 0H15v1.53h.05c.55-.98 1.9-2.02 3.91-2.02 4.18 0 4.95 2.75 4.95 6.33V20H20v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94V20h-3.89V8.75Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.28 6 12 6 12 6s-6.28 0-7.86.061A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2.14 12a28.6 28.6 0 0 0 .06 3.999 2.75 2.75 0 0 0 1.94 1.94C5.72 18 12 18 12 18s6.28 0 7.86-.061a2.75 2.75 0 0 0 1.94-1.94A28.6 28.6 0 0 0 21.86 12a28.6 28.6 0 0 0-.06-3.999ZM10 15.001V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
} as const;

export function Footer() {
  return (
    <footer id="contact" className="site-footer relative overflow-hidden py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <Image
          src="/images/nivaara/footer-mandala.png"
          alt=""
          width={1082}
          height={1082}
          className="h-[min(110vw,36rem)] w-[min(110vw,36rem)] object-contain opacity-10 sm:h-[42rem] sm:w-[42rem] md:h-[48rem] md:w-[48rem]"
          sizes="(max-width: 640px) 110vw, 768px"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center">
        <nav className="w-full" aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7 md:gap-x-9">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {item.label === "CONTACT" ? (
                  <ContactNavLink className="font-body text-[9px] font-semibold uppercase tracking-[0.13em] text-charcoal transition-[color,opacity] duration-300 hover:text-[#543119] sm:text-[10px] sm:tracking-[0.14em]">
                    {item.label}
                  </ContactNavLink>
                ) : (
                  <Link
                    href={item.href}
                    className="font-body text-[9px] font-semibold uppercase tracking-[0.13em] text-charcoal transition-[color,opacity] duration-300 hover:text-[#543119] sm:text-[10px] sm:tracking-[0.14em]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <nav className="mt-5 w-full" aria-label="Legal">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
            <li>
              <Link
                href="/privacy"
                className="font-body text-[8px] font-semibold uppercase tracking-[0.12em] text-charcoal/85 transition-colors hover:text-charcoal sm:text-[9px]"
              >
                Privacy Policy
              </Link>
            </li>
            <li aria-hidden className="text-charcoal/40">
              |
            </li>
            <li>
              <Link
                href="/terms"
                className="font-body text-[8px] font-semibold uppercase tracking-[0.12em] text-charcoal/85 transition-colors hover:text-charcoal sm:text-[9px]"
              >
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </nav>

        {/* Soft spotlight behind logos so gold marks read as the footer focus */}
        <div className="relative mt-6 flex max-w-full items-center justify-center sm:mt-8">
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 h-[170%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,247,240,0.95)_0%,rgba(250,247,240,0.72)_45%,transparent_72%)]"
            aria-hidden
          />

          <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-10 md:gap-14">
            <Link
              href="/"
              className="w-[min(40vw,9.5rem)] shrink-0 sm:w-[11.5rem] md:w-[13.5rem]"
              aria-label="GHD Hotels home"
            >
              <Image
                src={GHD_LOGO}
                alt="GHD Hotels"
                width={1160}
                height={420}
                className="h-auto w-full object-contain object-center drop-shadow-[0_6px_18px_rgba(84,49,25,0.22)]"
                sizes="(max-width: 640px) 40vw, 216px"
                priority
              />
            </Link>

            <span
              className="hidden h-10 w-px shrink-0 bg-[#C6A86B]/35 sm:block sm:h-12 md:h-14"
              aria-hidden
            />

            <div
              className="flex items-center gap-3 sm:gap-4 md:gap-5"
              aria-label="GHD Hotels brands"
            >
              <Link
                href="/nivaara"
                className="w-[min(18vw,3.75rem)] shrink-0 opacity-65 transition-opacity duration-300 hover:opacity-90 sm:w-[4.75rem] md:w-[5.25rem]"
                aria-label="Nivaãra by GHD Hotels"
              >
                <Image
                  src={NIVAARA_LOGO}
                  alt="Nivaãra by GHD Hotels"
                  width={736}
                  height={498}
                  className="h-auto w-full object-contain object-center"
                  sizes="(max-width: 640px) 18vw, 84px"
                />
              </Link>

              <div
                className="w-[min(18vw,3.75rem)] shrink-0 opacity-65 sm:w-[4.75rem] md:w-[5.25rem]"
                aria-label="Samrāya by GHD Hotels"
              >
                <Image
                  src={SAMRAYA_LOGO}
                  alt="Samrāya by GHD Hotels"
                  width={3120}
                  height={2244}
                  className="h-auto w-full object-contain object-center"
                  sizes="(max-width: 640px) 18vw, 84px"
                />
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-5 flex items-center justify-center gap-5 sm:mt-6 sm:gap-6">
          {SOCIAL_LINKS.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];

            return (
              <li key={social.icon}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex text-charcoal transition-[color,opacity] duration-300 hover:text-[#543119]"
                >
                  <Icon className="size-4 sm:size-[18px]" />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 w-full border-t border-charcoal/15 pt-6 sm:mt-10 sm:pt-7">
          <p className="font-body text-[8px] font-semibold tracking-[0.03em] text-charcoal/75 sm:text-[9px]">
            © 2026 Nivaãra by GHD Hotels. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
