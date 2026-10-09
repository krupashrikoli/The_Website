import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FaqContent } from "@/components/FaqContent";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQs | Nivaãra by GHD Hotels, Nerul Goa",
  description:
    "Answers to common questions about Nivaãra by GHD Hotels in Nerul, North Goa — location, reservations, check-in, amenities, dining, policies, and nearby beaches.",
};

export default function FaqsPage() {
  return (
    <>
      <Header />
      <main>
        <FaqContent />
      </main>
      <Footer />
    </>
  );
}
