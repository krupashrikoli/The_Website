import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PrivacyPolicyContent } from "@/components/PrivacyPolicyContent";
import { CorporateFooter } from "@/components/corporate/CorporateFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | GHD Hotels",
  description:
    "Read the GHD Hotels privacy policy covering data collection, usage, security, retention, and your rights as a guest.",
};

export default function PrivacyPage() {
  return (
    <div className="corporate-site bg-white text-[#2D2D2D]">
      <Header />
      <main>
        <PrivacyPolicyContent />
      </main>
      <CorporateFooter />
    </div>
  );
}
