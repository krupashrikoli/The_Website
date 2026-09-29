import { ContactCtaSection } from "@/components/ContactCtaSection";
import { FAQ_SECTIONS, NIVAARA_CONTACT } from "@/lib/constants";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { sectionBodyClass, sectionHeadingClass } from "@/lib/section-typography";

export function FaqContent() {
  return (
    <>
      <section className="bg-muted pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionIntro
            label="Help Centre"
            title="Frequently Asked Questions"
            description="Everything you need to know about staying at Nivaãra by GHD Hotels in Nerul, North Goa — from bookings and amenities to local attractions and property policies."
            titleAs="h1"
          />
        </div>
      </section>

      <section className="bg-white px-6 py-14 md:py-20 lg:px-10">
        <div className="mx-auto max-w-3xl space-y-14 md:space-y-16">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className={sectionHeadingClass()}>
                {section.title}
              </h2>

              <div className="mt-6 divide-y divide-border border-y border-border">
                {section.items.map((item) => (
                  <details key={item.question} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-body text-sm font-medium text-charcoal transition-colors hover:text-[#543119] sm:text-base [&::-webkit-details-marker]:hidden">
                      <span>{item.question}</span>
                      <span
                        className="shrink-0 font-body text-lg leading-none text-[#543119] transition-transform group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>

                    <div className="pb-5 pr-8">
                      {"answer" in item && item.answer ? (
                        <p className={sectionBodyClass(false, "mt-0 text-sm sm:text-base")}>
                          {item.answer}
                        </p>
                      ) : null}

                      {"bullets" in item && item.bullets ? (
                        <ul
                          className={
                            "answer" in item && item.answer
                              ? "mt-3 list-disc space-y-2 pl-5"
                              : "list-disc space-y-2 pl-5"
                          }
                        >
                          {item.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className={sectionBodyClass(false, "mt-0 text-sm sm:text-base")}
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {"showMap" in item && item.showMap ? (
                        <div className="mt-4">
                          <div className="overflow-hidden border border-border">
                            <iframe
                              title="Nivaãra by GHD Hotels on Google Maps"
                              src={NIVAARA_CONTACT.mapsEmbedUrl}
                              className="block h-56 w-full border-0 sm:h-72"
                              loading="lazy"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          </div>
                          <p className="mt-2">
                            <a
                              href={NIVAARA_CONTACT.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-body text-[10px] uppercase tracking-[0.14em] text-charcoal/60 transition-colors hover:text-[#543119]"
                            >
                              Open in Google Maps →
                            </a>
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactCtaSection />
    </>
  );
}
