import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CorporateFooter } from "@/components/corporate/CorporateFooter";
import {
  FadeInSection,
  SectionHeading,
} from "@/components/corporate/CorporateUi";
import { ContactMessageForm } from "@/components/contact/ContactMessageForm";
import {
  CORPORATE_OFFICE,
  RESERVATION_CONTACT,
  SALES_CONTACT,
  SITE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact GHD Hotels",
  description:
    "Contact GHD Hotels for reservations and corporate enquiries — phone, email, and head office address.",
};

export default function ContactPage() {
  return (
    <div className="corporate-site bg-white text-[#2D2D2D]">
      <Header />
      <main className="pt-14 md:pt-16">
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
            <FadeInSection>
              <SectionHeading>Contact Us</SectionHeading>
              <p className="mt-4 max-w-xl font-body text-base font-normal text-black">
                Reach GHD Hotels for reservations and general enquiries.
              </p>
            </FadeInSection>

            <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-14">
              <FadeInSection>
                <div className="space-y-8">
                  <div className="border-t border-[#E6DDCF] pt-6">
                    <h2 className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#C6A86B]">
                      Reservation
                    </h2>
                    <ul className="mt-4 space-y-2">
                      <li>
                        <a
                          href={RESERVATION_CONTACT.phoneHref}
                          className="font-body text-base text-[#2D2D2D] transition-colors hover:text-[#C6A86B]"
                        >
                          {RESERVATION_CONTACT.phone}
                        </a>
                      </li>
                      <li>
                        <a
                          href={RESERVATION_CONTACT.emailHref}
                          className="font-body text-base text-[#2D2D2D] transition-colors hover:text-[#C6A86B]"
                        >
                          {RESERVATION_CONTACT.email}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-[#E6DDCF] pt-6">
                    <h2 className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#C6A86B]">
                      {SALES_CONTACT.title}
                    </h2>
                    <ul className="mt-4 space-y-2">
                      <li>
                        <a
                          href={SALES_CONTACT.phoneHref}
                          className="font-body text-base text-[#2D2D2D] transition-colors hover:text-[#C6A86B]"
                        >
                          {SALES_CONTACT.phone}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-[#E6DDCF] pt-6">
                    <h2 className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#C6A86B]">
                      Info
                    </h2>
                    <ul className="mt-4 space-y-2">
                      <li>
                        <a
                          href={SITE.emailHref}
                          className="font-body text-base text-[#2D2D2D] transition-colors hover:text-[#C6A86B]"
                        >
                          {SITE.email}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-[#E6DDCF] pt-6">
                    <h2 className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#C6A86B]">
                      Head Office
                    </h2>
                    <address className="mt-4 space-y-1 font-body text-base not-italic leading-relaxed text-[#2D2D2D]">
                      {CORPORATE_OFFICE.addressLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </address>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection>
                <div className="border border-[#E6DDCF] bg-[#FAF7F2] p-6 sm:p-8">
                  <ContactMessageForm idPrefix="page-contact" source="ghd" />
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </main>
      <CorporateFooter />
    </div>
  );
}
