import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TermsAndConditionsContent } from "@/components/TermsAndConditionsContent";
import { CorporateFooter } from "@/components/corporate/CorporateFooter";

export const metadata: Metadata = {
  title: "Terms & Conditions | GHD Hotels",
  description:
    "Read the GHD Hotels booking conditions — check-in, cancellation, payment, and guest policies.",
};

export default function TermsPage() {
  return (
    <div className="corporate-site bg-white text-[#2D2D2D]">
      <Header />
      <main>
        <TermsAndConditionsContent />
      </main>
      <CorporateFooter />
    </div>
  );
}
