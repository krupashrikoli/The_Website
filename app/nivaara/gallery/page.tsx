import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { GalleryContent } from "@/components/GalleryContent";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery | Nivaãra by GHD Hotels, Nerul Goa",
  description:
    "Browse the photo gallery of Nivaãra by GHD Hotels in Nerul — rooms, rooftop pool, terrace, and interiors near Coco Beach, North Goa.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <GalleryContent />
      </main>
      <Footer />
    </>
  );
}
