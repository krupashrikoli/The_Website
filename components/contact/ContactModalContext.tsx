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
  RESERVATION_CONTACT,
  SALES_CONTACT,
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

function ContactSectionDivider({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <div
      role="presentation"
      aria-hidden
      className={cn(
        orientation === "vertical"
          ? "w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-[#543119]/20 to-transparent"
          : "h-px w-full bg-gradient-to-r from-transparent via-[#543119]/20 to-transparent",
        className,
      )}
    />
  );
}

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
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className="transition-colors hover:text-charcoal">
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

          <div className="mt-4 grid text-left sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-8 lg:gap-10">
            <div>
              <ContactSection title={NIVAARA_CONTACT.title}>
                <ContactDetailRow label="Reception">
                  <ContactLink href={NIVAARA_CONTACT.receptionPhoneHref}>
                    {NIVAARA_CONTACT.receptionPhone}
                  </ContactLink>
                </ContactDetailRow>

                <ContactDetailRow label="Email">
                  <ContactLink href={NIVAARA_CONTACT.receptionEmailHref}>
                    {NIVAARA_CONTACT.receptionEmail}
                  </ContactLink>
                </ContactDetailRow>

                <ContactDetailRow label="Website">
                  <ContactLink href={NIVAARA_CONTACT.websiteHref}>
                    {NIVAARA_CONTACT.website}
                  </ContactLink>
                </ContactDetailRow>

                <ContactDetailRow label="Address">
                  <address className="not-italic">
                    {NIVAARA_CONTACT.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                </ContactDetailRow>
              </ContactSection>

              <ContactSectionDivider className="my-4 sm:my-5" />

              <ContactSection title={RESERVATION_CONTACT.title}>
                <ContactDetailRow label="Reservation">
                  <ContactLink href={RESERVATION_CONTACT.phoneHref}>
                    {RESERVATION_CONTACT.phone}
                  </ContactLink>
                </ContactDetailRow>

                <ContactDetailRow label="Email">
                  <ContactLink href={RESERVATION_CONTACT.emailHref}>
                    {RESERVATION_CONTACT.email}
                  </ContactLink>
                </ContactDetailRow>
              </ContactSection>

              <ContactSectionDivider className="my-4 sm:my-5" />

              <ContactSection title={SALES_CONTACT.title}>
                <ContactDetailRow label="Sales">
                  <ContactLink href={SALES_CONTACT.phoneHref}>
                    {SALES_CONTACT.phone}
                  </ContactLink>
                </ContactDetailRow>
              </ContactSection>
            </div>

            <ContactSectionDivider
              orientation="vertical"
              className="my-1 hidden sm:block"
            />

            <ContactSectionDivider className="my-5 sm:hidden" />

            <ContactSection title={CORPORATE_OFFICE.title}>
              <ContactDetailRow label="Phone">
                <ContactLink href={CORPORATE_OFFICE.phoneHref}>
                  {CORPORATE_OFFICE.phone}
                </ContactLink>
              </ContactDetailRow>

              <ContactDetailRow label="Email">
                <ContactLink href={CORPORATE_OFFICE.emailHref}>
                  {CORPORATE_OFFICE.email}
                </ContactLink>
              </ContactDetailRow>

              <ContactDetailRow label="Address">
                <address className="not-italic">
                  {CORPORATE_OFFICE.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
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
