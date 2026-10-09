import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { BookingDetailsContent } from "@/components/booking/BookingDetailsContent";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Complete Your Stay | Nivaãra by GHD Hotels",
  description:
    "Complete your reservation at Nivaãra by GHD Hotels in Nerul, North Goa — review your stay details and confirm your booking.",
};

export default function BookingDetailsPage() {
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
          <BookingDetailsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
