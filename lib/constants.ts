export const PROPERTIES = [
  { id: "nivaara", name: "Nivaãra by GHD Hotels — Nerul, North Goa", available: true },
  { id: "celestra", name: "Celéstra", available: false },
  { id: "samraya", name: "Samrāya", available: false },
] as const;

export const AVAILABLE_PROPERTIES = PROPERTIES.filter((p) => p.available);

export const DEFAULT_PROPERTY_ID = "nivaara";

/** GHD corporate homepage search — single Nivaãra destination */
export const CORPORATE_SEARCH_DESTINATIONS = [
  {
    value: "nivaara",
    label: "Nivaãra — Nerul, North Goa",
    propertyId: "nivaara",
  },
] as const;

/** External AxisRooms booking engine — Nivaãra Book Now */
export const AXISROOMS_BOOKING_URL =
  "https://be.axisrooms.com/search?bookingEngineId=5044";

export const AXISROOMS_PRODUCT_ID = "214632";
export const AXISROOMS_BOOKING_ENGINE_ID = "5044";
export const AXISROOMS_SEARCH_BASE_URL = "https://be.axisrooms.com/search";

export const ROOM_OPTIONS = [1, 2, 3, 4, 5] as const;

export const HOTEL_CHECK_IN_TIME = "2:00 PM";
export const HOTEL_CHECK_OUT_TIME = "11:00 AM";
export const HOTEL_POOL_HOURS = "8:00 AM – 8:00 PM";

export const MAX_ADULTS_PER_ROOM = 3;
export const MAX_CHILDREN_PER_ROOM = 2;
export const MAX_GUESTS_PER_ROOM = 4;

/** Legacy property nav — unused on corporate routes; kept for Header fallback */
export const NAV_ITEMS = [
  { label: "HOME", href: "https://nivaara.ghdhotels.in" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const HOTEL_WHATSAPP = {
  phone: "918380008687",
  display: "+91 83800 08687",
  waMeUrl: "https://wa.me/918380008687",
} as const;

export const SITE = {
  name: "GHD Hotels",
  tagline: "Luxury Hospitality in Goa, Thoughtfully Crafted",
  property: "Nivaãra — Nerul, North Goa",
  propertyDisplay: "Nivaãra - Nerul, North Goa",
  phone: "+91 838 002 0407",
  phoneHref: "tel:+918380020407",
  whatsappHref: HOTEL_WHATSAPP.waMeUrl,
  phoneSecondary: "+91 839 002 0408",
  phoneSecondaryHref: "tel:+918390020408",
  email: "info@ghdhotels.in",
  emailHref: "mailto:info@ghdhotels.in",
  location: "Nerul, North Goa, India — 5 minutes from Coco Beach",
  locationHref: "https://maps.google.com/?q=Nivaãra+by+GHD+Hotels+Nerul+Goa",
  reserveHref: "tel:+918380020407",
} as const;

/**
 * SEO keywords — edit this list anytime.
 * These feed the site <meta name="keywords"> tag via app/layout.tsx.
 */
export const SEO_KEYWORDS = [
  "GHD Hotels",
  "GHD Hotels Goa",
  "Nivaãra by GHD Hotels",
  "Samrāya by GHD Hotels",
  "Celéstra by GHD Hotels",
  "luxury hotels India",
  "hotels in North Goa",
  "hotel in Nerul Goa",
  "Dodamarg hotels",
  "boutique hotel Goa",
  "hospitality group India",
];

export const NIVAARA_CONTACT = {
  title: "Nivaãra reception",
  receptionPhone: "+91 839 002 0408",
  receptionPhoneHref: "tel:+918390020408",
  reservationPhones: [
    { display: "+91 838 002 0407", href: "tel:+918380020407" },
  ],
  reservationEmail: "nn.reservation@ghdhotels.in",
  reservationEmailHref: "mailto:nn.reservation@ghdhotels.in",
  infoEmail: "info.nerul@ghdhotels.in",
  infoEmailHref: "mailto:info.nerul@ghdhotels.in",
  /** @deprecated Prefer infoEmail — kept for terms/privacy copy */
  receptionEmail: "info.nerul@ghdhotels.in",
  receptionEmailHref: "mailto:info.nerul@ghdhotels.in",
  website: "www.ghdhotels.in",
  websiteHref: "https://www.ghdhotels.in",
  addressLines: ["Survey No. 98, Nerul, North Goa - 403114"],
  mapsUrl: "https://maps.app.goo.gl/UpU5yJPAcP5eVTo6A",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15378.42839358312!2d73.78077586030322!3d15.505552061521492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc1005b8dd057%3A0x166552860628bbcd!2sNivaara!5e0!3m2!1sen!2sin!4v1790333637489!5m2!1sen!2sin",
} as const;

export const RESERVATION_CONTACT = {
  title: "Reservation",
  phone: "+91 838 000 8687",
  phoneHref: "tel:+918380008687",
  email: "reservation@ghdhotels.in",
  emailHref: "mailto:reservation@ghdhotels.in",
} as const;

export const SALES_CONTACT = {
  title: "Sales",
  phone: "+91 95298 22907",
  phoneHref: "tel:+919529822907",
} as const;

export const GUEST_CARE_CONTACT = {
  title: "Guest Care",
  email: "care@ghdhotels.in",
  emailHref: "mailto:care@ghdhotels.in",
} as const;

export const CORPORATE_OFFICE = {
  title: "Head Office",
  addressLines: [
    "GHD Hotels LLP",
    "325, Gera Imperium Star",
    "Patto, Panjim",
    "Goa – 403001, India",
  ],
  email: SITE.email,
  emailHref: SITE.emailHref,
  phone: SITE.phone,
  phoneHref: SITE.phoneHref,
  image: "/images/brands/nivaara-reception.webp",
  alt: "Reception at Nivaãra by GHD Hotels",
} as const;

export const NIVAARA_LOGO = "/logos/nivaara-by-ghd-hotels-logo.webp";
export const CELESTRA_LOGO = "/logos/celestra-by-ghd-hotels-logo.webp";
export const SAMRAYA_LOGO = "/logos/samraya-by-ghd-hotels-logo.webp";

export const GHD_HOTELS_MAIN_LOGO = "/logos/ghd-hotels-main-logo.webp";
/** Primary GHD Hotels logo for header, footer, and on-page use. */
export const GHD_LOGO = GHD_HOTELS_MAIN_LOGO;
/** Tab / favicon — GHD Hotels mark only. */
export const GHD_FAVICON = GHD_HOTELS_MAIN_LOGO;
