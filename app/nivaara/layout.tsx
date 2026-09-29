import type { Metadata } from "next";
import { NIVAARA_FAVICON } from "@/lib/constants";

export const metadata: Metadata = {
  icons: {
    icon: { url: NIVAARA_FAVICON, type: "image/webp" },
  },
};

export default function NivaaraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
