import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Samrāya | Lifestyle & Wellness Resort",
    template: "%s | Samrāya",
  },
};

export default function SamrayaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
