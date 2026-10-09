import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { RoomsContent } from "@/components/RoomsContent";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hotel Rooms in Nerul Goa | Studio & Luxury Rooms Near Beach",
  description:
    "Hotel rooms in Nerul, North Goa — Luxury Studio, Valley & Palms rooms with private balconies at Nivaãra by GHD Hotels, minutes from Coco Beach, Candolim & Calangute.",
};

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main>
        <RoomsContent />
      </main>
      <Footer />
    </>
  );
}
