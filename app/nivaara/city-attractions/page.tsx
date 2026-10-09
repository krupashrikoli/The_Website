import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ExperienceStories } from "@/components/ExperienceStories";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Places to Visit Near Nerul Goa | Things to Do North Goa",
  description:
    "Best places to visit near Nerul, North Goa — beaches, seafood, and attractions around Candolim, Calangute, Baga & Coco Beach, close to Nivaãra by GHD Hotels.",
};

export default function ExperiencesPage() {
  return (
    <>
      <Header />
      <main>
        <ExperienceStories />
        <NewsletterSignup idSuffix="-city-attractions" />
      </main>
      <Footer />
    </>
  );
}
