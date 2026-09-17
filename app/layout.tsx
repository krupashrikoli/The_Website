import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Archivo,
  DM_Sans,
  Inter,
  Playfair_Display,
} from "next/font/google";
import Script from "next/script";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { GHD_FAVICON, SEO_KEYWORDS } from "@/lib/constants";
import { StickyBookingButton } from "@/components/StickyBookingButton";
import { FaviconSwitcher } from "@/components/FaviconSwitcher";
import { PageMediaGate } from "@/components/PageMediaGate";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-5QLJVC3HJH";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const forum = localFont({
  src: "../fonts/Forum-Regular.ttf",
  variable: "--font-forum",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const archivoExpanded = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-archivo-expanded",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default:
      "Hotels in North Goa | Best Boutique Hotel in Nerul | GHD Hotels",
    template: "%s | GHD Hotels",
  },
  description:
    "Book hotels in North Goa with GHD Hotels. Stay at Nivaãra in Nerul — near Coco Beach, Candolim & Calangute. Boutique rooms, rooftop pool, and easy access to Goa's best beaches.",
  keywords: SEO_KEYWORDS,
  openGraph: {
    title:
      "Hotels in North Goa | Best Boutique Hotel in Nerul | GHD Hotels",
    description:
      "Boutique hotels in North Goa — Nivaãra in Nerul near Coco Beach, Candolim & Calangute. Book your Goa stay with GHD Hotels.",
    type: "website",
  },
  icons: {
    icon: GHD_FAVICON,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${forum.variable} ${playfair.variable} ${inter.variable} ${archivoExpanded.variable}`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>
        <ContactModalProvider>
          <FaviconSwitcher />
          <ScrollToTop />
          <PageMediaGate>{children}</PageMediaGate>
          <StickyBookingButton />
        </ContactModalProvider>
      </body>
    </html>
  );
}
