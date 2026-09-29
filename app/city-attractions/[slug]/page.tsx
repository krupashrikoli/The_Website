import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ExperienceBlogPost } from "@/components/ExperienceBlogPost";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Footer } from "@/components/Footer";
import {
  getAllExperienceSlugs,
  getExperiencePost,
} from "@/lib/experiences";

type ExperienceBlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllExperienceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ExperienceBlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getExperiencePost(slug);

  if (!post) {
    return { title: "City Attraction | Nivaãra by GHD Hotels" };
  }

  if (post.slug === "beaches-of-goa") {
    return {
      title: "Best Beaches Near Nerul, Goa | Nivaãra by GHD Hotels",
      description:
        "A guide to the best beaches near Nerul and Coco Beach — from peaceful Coco Beach and historic Sinquerim to lively Baga and Calangute — plus tips on which beach suits your trip.",
    };
  }

  if (post.slug === "goa-finest-fish-seafood") {
    return {
      title: "Best Seafood Restaurants in Goa | GHD Hotels",
      description:
        "Discover Goa's finest fish and seafood restaurants, from refined Goan dining in Assagao to classic fish thalis in Benaulim and iconic seafood tables across Panaji and South Goa.",
    };
  }

  if (post.slug === "nightlife-north-goa") {
    return {
      title: "Nightlife in North Goa | Shacks & Clubs Near Nerul",
      description:
        "Ten shacks and clubs for nightlife in North Goa — from Club Titos and Café Mambo in Baga to LPK Waterfront in Nerul, Sinq in Candolim, and Soro in Siolim.",
    };
  }

  return {
    title: `${post.title} | Nivaãra by GHD Hotels`,
    description: post.excerpt,
  };
}

export default async function ExperienceBlogPage({
  params,
}: ExperienceBlogPageProps) {
  const { slug } = await params;
  const post = getExperiencePost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ExperienceBlogPost post={post} />
        <NewsletterSignup idSuffix={`-experience-${post.slug}`} />
      </main>
      <Footer />
    </>
  );
}
