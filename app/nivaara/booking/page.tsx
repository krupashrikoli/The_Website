import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { BookingContent } from "@/components/booking/BookingContent";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book Hotel Rooms in Nerul, North Goa | Nivaãra",
  description:
    "Book hotel rooms in Nerul, North Goa at Nivaãra by GHD Hotels. Choose studio and luxury rooms near Coco Beach, Candolim & Calangute.",
};

export default function BookingPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <section className="bg-muted px-6 py-32 text-center lg:px-10">
              <p className="font-body text-sm text-grey">Loading booking details…</p>
            </section>
          }
        >
          <BookingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
