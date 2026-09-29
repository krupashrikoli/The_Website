import Image from "next/image";
import Link from "next/link";
import { BeachesBlogContent } from "@/components/BeachesBlogContent";
import { NightlifeBlogContent } from "@/components/NightlifeBlogContent";
import { SeafoodBlogContent } from "@/components/SeafoodBlogContent";
import { getExperienceBlogContent } from "@/lib/experience-content";
import type { ExperiencePost } from "@/lib/experiences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionBodyClass, sectionHeadingClass } from "@/lib/section-typography";

type ExperienceBlogPostProps = {
  post: ExperiencePost;
};

function HeroMedia({
  image,
  alt,
  headline,
  subheading,
}: {
  image: string | null;
  alt: string;
  headline?: string;
  subheading?: string;
}) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted sm:aspect-[2.1/1]">
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0 bg-[#e8e2d8]"
          role="img"
          aria-label={alt}
        >
          <span className="absolute inset-0 flex items-center justify-center px-6 text-center font-body text-[0.7rem] font-medium uppercase tracking-[0.18em] text-charcoal/40">
            Hero photo coming soon
          </span>
        </div>
      )}

      {headline ? (
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-black/25 to-transparent">
          <div className="w-full px-6 pb-8 pt-16 sm:px-10 sm:pb-12 lg:px-16">
            <h1 className="max-w-3xl font-heading text-3xl font-normal leading-tight text-white sm:text-5xl md:text-[3.25rem]">
              {headline}
            </h1>
            {subheading ? (
              <p className="mt-3 max-w-2xl font-body text-sm font-light leading-relaxed text-white/85 sm:mt-4 sm:text-base">
                {subheading}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ExperienceBlogPost({ post }: ExperienceBlogPostProps) {
  const paragraphs = getExperienceBlogContent(post.slug);
  const isBeachesGuide = post.slug === "beaches-of-goa";
  const isSeafoodGuide = post.slug === "goa-finest-fish-seafood";
  const isNightlifeGuide = post.slug === "nightlife-north-goa";

  return (
    <article>
      <section className="bg-muted pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link
            href="/city-attractions"
            className="inline-flex font-body text-xs font-medium uppercase tracking-[0.14em] text-charcoal transition-colors hover:text-[#543119]"
          >
            ← All city attractions
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs font-light text-grey">
            <SectionLabel as="span">{post.category}</SectionLabel>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>

          {!isSeafoodGuide ? (
            <>
              <h1 className={sectionHeadingClass(false, "mt-5 text-left")}>
                {post.title}
              </h1>

              {!isBeachesGuide ? (
                <p className={sectionBodyClass(false, "mt-5 text-left")}>
                  {post.excerpt}
                </p>
              ) : null}
            </>
          ) : (
            <p className={sectionBodyClass(false, "mt-5 text-left")}>
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {isSeafoodGuide ? (
        <HeroMedia
          image={post.image}
          alt={post.alt}
          headline="Goa's Finest Fish & Seafood"
          subheading="Seven exceptional places to discover the flavours, traditions and coastal character of Goa."
        />
      ) : isNightlifeGuide ? (
        <HeroMedia
          image={post.image}
          alt={post.alt}
          headline="Nightlife in North Goa"
          subheading="Ten shacks and clubs — each with its own kind of evening."
        />
      ) : (
        <HeroMedia image={post.image} alt={post.alt} />
      )}

      {isBeachesGuide ? (
        <BeachesBlogContent />
      ) : isSeafoodGuide ? (
        <SeafoodBlogContent />
      ) : isNightlifeGuide ? (
        <NightlifeBlogContent />
      ) : (
        <section className="bg-white px-6 py-14 md:py-20 lg:px-10">
          <div className="mx-auto max-w-3xl">
            {paragraphs.length > 0 ? (
              <div className="space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={`${post.slug}-paragraph-${index}`}
                    className={sectionBodyClass(false, "mt-0 text-left")}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="font-body text-sm font-light italic text-grey">
                Full article content coming soon.
              </p>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
