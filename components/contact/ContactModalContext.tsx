"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ContactMessageForm } from "@/components/contact/ContactMessageForm";
import {
  CORPORATE_OFFICE,
  NIVAARA_CONTACT,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { sectionHeadingClass } from "@/lib/section-typography";

type ContactModalContextValue = {
  openContact: () => void;
  closeContact: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

const contactSectionTitleClass =
  "font-heading text-xl font-thin leading-tight text-charcoal sm:text-2xl";

const contactLabelClass =
  "font-body text-[10px] font-medium uppercase tracking-[0.16em] text-charcoal/60";

const contactValueClass =
  "font-body text-xs font-light leading-snug text-charcoal/75 sm:text-[0.8125rem]";

function ContactSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2.5">
      <h3 className={contactSectionTitleClass}>{title}</h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function ContactDetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className={contactLabelClass}>{label}</p>
      <div className={cn("mt-0.5", contactValueClass)}>{children}</div>
    </div>
  );
}

function ContactLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn("transition-colors hover:text-charcoal", className)}
    >
      {children}
    </a>
  );
}

function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close contact"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative z-10 flex h-[94vh] w-[min(96vw,1400px)] flex-col overflow-hidden rounded-none bg-white shadow-[0_24px_60px_rgba(17,17,17,0.24)] lg:flex-row"
      >
        <div className="relative min-h-[16rem] w-full shrink-0 lg:min-h-0 lg:w-[44%]">
          <Image
            src={CORPORATE_OFFICE.image}
            alt={CORPORATE_OFFICE.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-10">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="contact-modal-title"
              className={sectionHeadingClass(false, "mt-0 text-left")}
            >
              Contact Nivaãra by GHD Hotels
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 font-body text-xs uppercase tracking-[0.14em] text-charcoal transition-colors hover:text-[#543119]"
            >
              Close
            </button>
          </div>

          <div className="mt-4 text-left">
            <ContactSection title={NIVAARA_CONTACT.title}>
              <ContactDetailRow label="Reception">
                <ContactLink href={NIVAARA_CONTACT.receptionPhoneHref}>
                  {NIVAARA_CONTACT.receptionPhone}
                </ContactLink>
              </ContactDetailRow>

              <ContactDetailRow label="Reservation">
                <div className="flex flex-col gap-1">
                  {NIVAARA_CONTACT.reservationPhones.map((phone) => (
                    <ContactLink key={phone.href} href={phone.href}>
                      {phone.display}
                    </ContactLink>
                  ))}
                </div>
              </ContactDetailRow>

              <ContactDetailRow label="Reservation Email">
                <ContactLink href={NIVAARA_CONTACT.reservationEmailHref}>
                  {NIVAARA_CONTACT.reservationEmail}
                </ContactLink>
              </ContactDetailRow>

              <ContactDetailRow label="Info Email">
                <ContactLink href={NIVAARA_CONTACT.infoEmailHref}>
                  {NIVAARA_CONTACT.infoEmail}
                </ContactLink>
              </ContactDetailRow>

              <ContactDetailRow label="Address">
                <address className="not-italic">
                  {NIVAARA_CONTACT.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
                <div className="mt-3 overflow-hidden border border-border bg-muted/20">
                  <iframe
                    title="Nivaãra by GHD Hotels on Google Maps"
                    src={NIVAARA_CONTACT.mapsEmbedUrl}
                    className="block h-52 w-full border-0 sm:h-64"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className="mt-2">
                  <ContactLink
                    href={NIVAARA_CONTACT.mapsUrl}
                    className="text-[10px] uppercase tracking-[0.14em] text-charcoal/60 hover:text-[#543119]"
                  >
                    Open in Google Maps →
                  </ContactLink>
                </p>
              </ContactDetailRow>
            </ContactSection>
          </div>

          <ContactMessageForm
            idPrefix="modal-contact"
            source="nivaara"
            title="Send Us a Message"
            description="For stays, reservations, or questions about Nivaãra in Nerul, North Goa."
            className="mt-8 border-t border-border pt-6"
          />
        </div>
      </div>
    </div>
  );
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContact = useCallback(() => setOpen(true), []);
  const closeContact = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#contact") {
        setOpen(true);
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <ContactModalContext.Provider value={{ openContact, closeContact }}>
      {children}
      <ContactModal open={open} onClose={closeContact} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}
