import Link from "next/link";
import { NIGHTLIFE_BLOG } from "@/lib/nightlife-blog";
import { sectionBodyClass, sectionHeadingClass } from "@/lib/section-typography";

const bodyClass = sectionBodyClass(false, "mt-0 text-justify");

export function NightlifeBlogContent() {
  const { meta, intro, spots, chooseByMood, outro } = NIGHTLIFE_BLOG;

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="flex flex-wrap gap-x-4 gap-y-2 font-body text-[0.65rem] font-medium uppercase tracking-[0.14em] text-grey sm:text-xs">
          <span>{meta.region}</span>
          <span aria-hidden>·</span>
          <span>{meta.guideType}</span>
          <span aria-hidden>·</span>
          <span>{meta.spotsCovered}</span>
          <span aria-hidden>·</span>
          <span>{meta.baseLocation}</span>
        </div>

        <div className="mt-8 max-w-3xl space-y-5">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className={bodyClass}>
              {paragraph}
            </p>
          ))}
        </div>

        <h2 className={sectionHeadingClass(false, "mt-12 text-left")}>
          Ten nights, ten kinds of evening
        </h2>

        <ol className="mt-10 list-none space-y-14 md:space-y-16">
          {spots.map((spot, index) => (
            <li key={spot.id} id={spot.id}>
              <p className="font-display-wide text-xs font-black uppercase tracking-[0.28em] text-[#543119] sm:text-sm">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className={sectionHeadingClass(false, "mt-3 text-left")}>
                {spot.name}
                <span className={sectionBodyClass(false, "mt-0 inline text-grey")}>
                  {" "}
                  · {spot.location}
                </span>
              </h3>

              <p className="mt-2 font-body text-sm font-medium tracking-[0.02em] text-[#543119] sm:text-base">
                {spot.vibe}
              </p>

              <div className="mt-5 max-w-3xl space-y-4">
                {spot.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${spot.id}-p-${paragraphIndex}`}
                    className={bodyClass}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-charcoal/80">
                <p>
                  <strong className="font-medium text-charcoal">Location:</strong>{" "}
                  {spot.location}
                </p>
                <p>
                  <strong className="font-medium text-charcoal">Best for:</strong>{" "}
                  {spot.bestFor}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
          <h2 className={sectionHeadingClass(false, "text-left")}>
            So, which one should you pick?
          </h2>
          <p className={`mt-4 max-w-2xl ${bodyClass}`}>
            That depends entirely on what kind of night you are looking for.
            Match your mood to a place — or two.
          </p>

          <ol className="mt-8 list-none space-y-4">
            {chooseByMood.map((pick, index) => (
              <li key={pick.mood} className={bodyClass}>
                <span className="font-display-wide text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#543119]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="ml-3 font-medium">{pick.mood}</span>{" "}
                {pick.picks}.
              </li>
            ))}
          </ol>

          <p className={`mt-8 max-w-3xl ${bodyClass}`}>
            And remember — you do not have to make your Goa trip about ticking
            off every club on a list. Pick the experience that sounds like you.
          </p>
        </div>

        <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
          <h2 className={sectionHeadingClass(false, "text-left")}>
            {outro.title}
          </h2>
          <div className="mt-6 max-w-3xl space-y-5">
            {outro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={bodyClass}>
                {paragraph.includes("Nivaãra by GHD Hotels") ? (
                  <>
                    {paragraph.split("Nivaãra by GHD Hotels")[0]}
                    <strong className="font-medium">
                      Nivaãra by GHD Hotels
                    </strong>
                    {paragraph.split("Nivaãra by GHD Hotels")[1]}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>

          <p className={`mt-8 max-w-3xl ${bodyClass}`}>
            Planning a night out in North Goa? Keep this list saved, choose your
            vibe, and explore.{" "}
            <strong className="font-medium">
              Nivaãra by GHD Hotels — Nerul, North Goa
            </strong>{" "}
            is a comfortable base for discovering the beaches, restaurants and
            nightlife of North Goa.
          </p>

          <Link
            href={outro.ctaHref}
            className="mt-10 inline-flex items-center font-body text-xs font-medium uppercase tracking-[0.14em] text-charcoal transition-colors hover:text-[#543119]"
          >
            {outro.ctaLabel}
            <span className="ml-2" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
