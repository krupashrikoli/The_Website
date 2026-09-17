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
    label: "Nivaãra — Coco Beach, North Goa",
    propertyId: "nivaara",
  },
] as const;

/** External AxisRooms booking engine — official link from AxisRooms support (Jul 2026) */
export const AXISROOMS_BOOKING_URL =
  "https://app.axisrooms.com/beV2/searchHotel.html?paxInfo=2%7C0%7C%7C&allHotels=true&newBe=true&productId=214632&bookingEngineId=5012&rooms=1&searchId=-1&searchNumber=1";

export const AXISROOMS_PRODUCT_ID = "214632";
export const AXISROOMS_BOOKING_ENGINE_ID = "5012";
export const AXISROOMS_SEARCH_BASE_URL =
  "https://app.axisrooms.com/beV2/searchHotel.html";

export const ROOM_OPTIONS = [1, 2, 3, 4, 5] as const;

export const HOTEL_CHECK_IN_TIME = "2:00 PM";
export const HOTEL_CHECK_OUT_TIME = "11:00 AM";
export const HOTEL_POOL_HOURS = "8:00 AM – 8:00 PM";

export const MAX_ADULTS_PER_ROOM = 3;
export const MAX_CHILDREN_PER_ROOM = 2;
export const MAX_GUESTS_PER_ROOM = 4;

export const ROYAL_STUDIO_RATE = {
  basePerNight: 7499,
  gstPercent: 5,
  totalPerNight: 7873.95,
  roundedPerNight: 7500,
} as const;

export const ROYAL_STUDIO_BOOKING_POLICY = {
  rateLabel: "Standard Rate",
  checkInTime: HOTEL_CHECK_IN_TIME,
  checkOutTime: HOTEL_CHECK_OUT_TIME,
  sections: [
    {
      title: "Booking Procedure",
      body: "All reservations must be sent by email or approved booking system. Unconfirmed bookings shall not be treated as guaranteed. Voucher number and guest details are mandatory. Last-minute bookings are subject to room availability.",
    },
    {
      title: "Cancellation & Retention Policy",
      body: "Cancellation within 3 days: 100% retention. Less than 72 hours before check-in, no-show, and early checkout are subject to 100% retention.",
    },
    {
      title: "Check-in Policy",
      body: `Rooms are available from ${HOTEL_CHECK_IN_TIME}. Early check-in is subject to availability and may incur additional charges.`,
    },
    {
      title: "Check-out Policy",
      body: `Rooms must be vacated by ${HOTEL_CHECK_OUT_TIME} at the latest. Late check-out requests should be informed to the Front Desk in advance and are subject to availability.`,
    },
    {
      title: "Mandatory ID",
      body: "All guests must provide a government-approved photo ID. Passport and visa are required for foreign nationals.",
    },
    {
      title: "Children Policy",
      body: "Child below 6 years: Complimentary sharing parents bed without extra mattress. Child between 6-11 years: Charged as per contracted child rate with 1 Extra mattress. Child above 12 years: Treated as adult.",
    },
  ],
} as const;

export const ROYAL_STUDIO = {
  id: "royal-studio",
  name: "Royal Studio",
  beds: "1 King Bed",
  sleeps: 2,
  size: "517 sq. ft.",
  image: "/images/nivaara/nivaara-room-1.webp",
  description:
    "Designed for modern comfort, the Royal Studio at Nivaãra offers a spacious and thoughtfully curated stay experience. Featuring a king-sized bed, a functional workspace, and clean contemporary interiors, the room is ideal for both short stays and extended visits. Natural lighting, an efficient layout, and essential amenities ensure a seamless and comfortable stay.",
  amenities: [
    "Wi‑Fi",
    "Air Conditioning",
    "Smart TV",
    "Work Desk",
    "Tea/Coffee Maker",
    "Wardrobe",
    "Bathroom Amenities",
    "Fresh Linen",
    "Daily Housekeeping",
    "Iron",
    "Iron Stand",
    "Hairdryer",
  ],
  transport: {
    airports: [
      {
        name: "Goa International Airport (Dabolim)",
        distance: "32 km",
        duration: "45–60 min",
        note: "Main airport, closer to South Goa side",
      },
      {
        name: "Manohar International Airport (Mopa)",
        distance: "30 km",
        duration: "40–50 min",
        note: "New North Goa airport (better option from Nivaãra / Coco Beach area)",
      },
    ],
    railway: [
      {
        name: "Thivim Railway Station",
        distance: "18 km",
        duration: "30–40 min",
        note: "Best station for North Goa",
      },
      {
        name: "Madgaon Railway Station",
        distance: "40 km",
        duration: "60–75 min",
        note: "Major railway hub (more trains available)",
      },
    ],
    bus: [
      {
        name: "Mapusa Bus Stand",
        distance: "9 km",
        duration: "20–25 min",
        note: "Main bus stand for North Goa routes",
      },
      {
        name: "Kadamba Bus Stand Panaji",
        distance: "7 km",
        duration: "15–20 min",
        note: "Good for city & intercity buses",
      },
    ],
  },
  travelTips: [
    { label: "Nearest Airport", value: "Mopa (faster from Nivaãra / Coco Beach area)" },
    { label: "Nearest Railway Station", value: "Thivim" },
    { label: "Nearest Bus Stand", value: "Panaji (Kadamba)" },
  ],
  gallery: [
    {
      src: "/images/nivaara/nivaara-room-1.webp",
      alt: "Royal Studio at Nivaãra by GHD Hotels",
    },
    {
      src: "/images/nivaara/nivaara-room-2.webp",
      alt: "Royal Studio interior at Nivaãra by GHD Hotels",
    },
    {
      src: "/images/nivaara/nivaara-room-3.webp",
      alt: "Royal Studio workspace at Nivaãra by GHD Hotels",
    },
    {
      src: "/images/nivaara/nivaara-room-4.webp",
      alt: "Royal Studio seating area at Nivaãra by GHD Hotels",
    },
    {
      src: "/images/nivaara/nivaara-washroom-1.webp",
      alt: "Royal Studio bathroom at Nivaãra by GHD Hotels",
    },
    {
      src: "/images/nivaara/nivaara-room-5.webp",
      alt: "Royal Studio bedroom detail at Nivaãra by GHD Hotels",
    },
    {
      src: "/images/nivaara/nivaara-washroom-2.webp",
      alt: "Royal Studio ensuite at Nivaãra by GHD Hotels",
    },
  ],
  duringStay: {
    timings: [
      { label: "Check-in", value: HOTEL_CHECK_IN_TIME },
      { label: "Check-out", value: HOTEL_CHECK_OUT_TIME },
      { label: "Housekeeping", value: "9:00 AM – 6:00 PM" },
      { label: "Pool", value: HOTEL_POOL_HOURS },
    ],
    guidelines: [
      "Deposit your room keys at Reception when going out.",
      "Switch off lights, AC, and geyser when leaving the room.",
      "Maintain silence in corridors and common areas.",
      "Room service orders may take extra time during peak hours.",
      "For any assistance, please contact Reception.",
      "Please inform the Front Desk in advance for late check-out requests.",
      "Management is not responsible for any loss of valuable belongings.",
      "Any damage to room items will be charged accordingly.",
    ],
  },
} as const;

export const NIVAARA_FULL_GALLERY = [
  {
    src: "/images/nivaara/nivaara-room-1.webp",
    alt: "Luxury Studio at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-2.webp",
    alt: "Luxury Studio interior at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-3.webp",
    alt: "Luxury Studio workspace at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-4.webp",
    alt: "Luxury Studio seating area at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-5.webp",
    alt: "Luxury Studio bedroom detail at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-washroom-1.webp",
    alt: "Ensuite bathroom at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-washroom-2.webp",
    alt: "Luxury bathroom at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-private-workspace.webp",
    alt: "Private workspace at Nivaãra by GHD Hotels",
  },
] as const;

/** Full property gallery for the Nivaãra Gallery page */
export const NIVAARA_SITE_GALLERY = [
  {
    src: "/images/nivaara/nivaara-luxury-room.webp",
    alt: "Luxury studio at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-1.webp",
    alt: "Guest room at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-2.webp",
    alt: "Room interior at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-3.webp",
    alt: "In-room workspace at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-4.webp",
    alt: "Seating area at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-room-5.webp",
    alt: "Bedroom detail at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-washroom-1.webp",
    alt: "Ensuite bathroom at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-washroom-2.webp",
    alt: "Bathroom at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-private-workspace.webp",
    alt: "Private workspace at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-terrace-1.webp",
    alt: "Terrace at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-terrace-2.webp",
    alt: "Open terrace views at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-pool-1.webp",
    alt: "Rooftop pool at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-pool-2.webp",
    alt: "Poolside at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-rooftop-pool.png",
    alt: "Rooftop pool overlook at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-lobby-lounge.webp",
    alt: "Lobby lounge at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-reception.webp",
    alt: "Reception at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-reception-desk.webp",
    alt: "Reception desk at Nivaãra by GHD Hotels",
  },
  {
    src: "/images/nivaara/nivaara-full-building-view.webp",
    alt: "Nivaãra by GHD Hotels building view",
  },

  {
    src: "/images/nivaara/nivaara-hero-poster.webp",
    alt: "Nivaãra by GHD Hotels in Nerul",
  },

  {
    src: "/images/nivaara/ghd-hotels-wall-signage.png",
    alt: "GHD Hotels signage at the property",
  },
] as const;

export const ROOM_CATEGORIES = [
  {
    id: "nivaara-room",
    name: "Luxury Studio",
    summary:
      "Offering generous space, a private balcony, and carefully considered comforts, this studio in Nerul is ideal for both productive stays and relaxing escapes.",
    headline: "A Spacious Studio Retreat in Nerul, North Goa",
    description:
      "Designed for modern comfort, the Luxury Studio at Nivaãra offers a spacious and well-appointed retreat for business and leisure travellers in North Goa. Featuring a king-sized bed, private balcony, dedicated workspace, and contemporary interiors, the studio provides everything needed for a seamless stay near Coco Beach.",
    highlights: [
      "Private Balcony",
      "King Bed",
      "Work Desk",
      "Contemporary Comfort",
    ],
    nightlyRate: 5499,
    priceLabel: "Base Rate",
    beds: "1 King Bed",
    sleeps: 2,
    sizeSqFt: 517,
    size: "517 sq. ft.",
    image: "/images/nivaara/nivaara-luxury-room.webp",
    gallery: NIVAARA_FULL_GALLERY,
  },
  {
    id: "mountain-view",
    name: "Luxury Valley Room",
    summary:
      "Overlooking Nerul's lush hills, this tranquil room invites slower mornings, scenic views, and a stay connected to nature.",
    headline: "Wake Up to Goa's Green Valley in Nerul",
    description:
      "Overlooking the surrounding hills and natural greenery of Nerul, the Luxury Valley Room combines modern comfort with a calming outlook. Enjoy your morning coffee on the private balcony while taking in peaceful views that create a relaxed and refreshing stay experience in North Goa.",
    highlights: [
      "Valley Views",
      "Private Balcony",
      "King Bed",
      "Peaceful Surroundings",
    ],
    nightlyRate: 6499,
    priceLabel: "Premium outlook",
    beds: "1 King Bed",
    sleeps: 2,
    sizeSqFt: 517,
    size: "517 sq. ft.",
    image: "/images/nivaara/nivaara-room-1.webp",
    gallery: NIVAARA_FULL_GALLERY,
  },
  {
    id: "sea-view",
    name: "Luxury Palms Room",
    summary:
      "Framed by palms and coastal light, this room in Nerul captures the essence of Goa's charm in a comfortable and elegant setting.",
    headline: "A Relaxed Stay Among the Palms in Nerul, Goa",
    description:
      "Set among swaying palms with glimpses of Nerul's coastal charm, the Luxury Palms Room brings an elevated sense of place to your stay. Unwind on your private balcony, enjoy the sea breeze, and experience a room designed for comfort with a serene tropical outlook near Coco Beach.",
    highlights: [
      "Palms Outlook",
      "Private Balcony",
      "King Bed",
      "Coastal Ambience",
    ],
    nightlyRate: 7499,
    priceLabel: "Best outlook",
    beds: "1 King Bed",
    sleeps: 2,
    sizeSqFt: 517,
    size: "517 sq. ft.",
    image: "/images/nivaara/nivaara-room-2.webp",
    gallery: NIVAARA_FULL_GALLERY,
  },
] as const;

export const NAV_ITEMS = [
  { label: "HOME", href: "/nivaara" },
  { label: "ROOMS", href: "/rooms" },
  { label: "CITY ATTRACTIONS", href: "/city-attractions" },
  { label: "GALLERY", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "CONTACT", href: "/#contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/nivaarahotels/",
  },
  {
    label: "Facebook",
    icon: "facebook",
    href: "https://www.facebook.com/profile.php?id=61591596812262",
  },
  {
    label: "X",
    icon: "x",
    href: "https://x.com/ghdhotels",
  },
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/company/ghd-hotels/",
  },
  {
    label: "YouTube",
    icon: "youtube",
    href: "https://www.youtube.com/@ghdhotels",
  },
] as const;

export const HOTEL_WHATSAPP = {
  phone: "918380008687",
  display: "+91 83800 08687",
  waMeUrl: "https://wa.me/918380008687",
} as const;

/** Nivaãra quick-contact CTAs (sticky Book Now cluster) */
export const NIVAARA_QUICK_CONTACT = {
  phone: "919529822907",
  display: "+91 95298 22907",
  phoneHref: "tel:+919529822907",
  whatsappHref: "https://wa.me/919529822907",
} as const;

export const SITE = {
  name: "GHD Hotels",
  tagline: "Luxury Hospitality in Goa, Thoughtfully Crafted",
  property: "Nivaãra — Coco Beach, North Goa",
  propertyDisplay: "Nivaãra - Coco Beach, North Goa",
  phone: "+91 838 000 8687",
  phoneHref: "tel:+918380008687",
  whatsappHref: HOTEL_WHATSAPP.waMeUrl,
  phoneSecondary: "+91 839 002 0408",
  phoneSecondaryHref: "tel:+918390020408",
  email: "info@ghdhotels.in",
  emailHref: "mailto:info@ghdhotels.in",
  location: "Nerul, North Goa, India — 5 minutes from Coco Beach",
  locationHref: "https://maps.google.com/?q=Nivaãra+by+GHD+Hotels+Nerul+Goa",
  reserveHref: "tel:+918380008687",
} as const;

/**
 * SEO keywords — edit this list anytime.
 * These feed the site <meta name="keywords"> tag via app/layout.tsx.
 * Tip: also weave important phrases into page titles, descriptions, and body copy.
 */
export const SEO_KEYWORDS = [
  "Nivaãra by GHD Hotels",
  "Nivaara by GHD Hotels",
  "Nivaãra Hotels",
  "Nivaara Hotels",
  "GHD Hotels",
  "GHD Hotels Goa",
  "Nivaãra Goa",
  "Nivaara Goa",
  "hotel in Goa",
  "hotels in Goa",
  "best hotel in Goa",
  "best hotels in Goa",
  "hotel booking Goa",
  "book hotel Goa",
  "Goa hotel booking",
  "Goa accommodation",
  "places to stay in Goa",
  "stay in Goa",
  "Goa vacation hotel",
  "Goa holiday stay",
  "Goa travel hotel",
  "Goa tourism hotel",
  "Goa boutique hotel",
  "boutique hotel Goa",
  "smart comfort hotel",
  "premium hotel Goa",
  "modern hotel Goa",
  "family hotel Goa",
  "couple friendly hotel Goa",
  "hotel for couples Goa",
  "hotel for families Goa",
  "hotel for friends Goa",
  "business hotel Goa",
  "corporate hotel Goa",
  "workation Goa",
  "workation hotel Goa",
  "remote work hotel Goa",
  "vacation rental alternative Goa",
  "luxury stay Goa",
  "affordable luxury Goa",
  "value hotel Goa",
  "hotel with swimming pool Goa",
  "hotel with rooftop pool Goa",
  "rooftop swimming pool Goa",
  "pool hotel Goa",
  "hotel with parking Goa",
  "hotel with WiFi Goa",
  "free WiFi hotel Goa",
  "hotel with balcony Goa",
  "studio rooms Goa",
  "studio hotel Goa",
  "large rooms Goa",
  "spacious hotel rooms Goa",
  "hotel near beach Goa",
  "hotel near Coco Beach",
  "hotel near Coco Beach Goa",
  "Coco Beach hotel",
  "stay near Coco Beach",
  "hotel near Candolim",
  "hotel near Candolim Beach",
  "hotel near Calangute",
  "hotel near Calangute Beach",
  "hotel near Baga",
  "hotel near Baga Beach",
  "hotel near Sinquerim Beach",
  "hotel near Panaji",
  "hotel near Miramar Beach",
  "hotel near Reis Magos",
  "hotel near Aguada Fort",
  "hotel near Fort Aguada",
  "hotel near Nerul",
  "hotel in Nerul",
  "hotel in Nerul Goa",
  "best hotel in Nerul",
  "Nerul accommodation",
  "rooms in Nerul Goa",
  "stay in Nerul Goa",
  "North Goa hotel",
  "North Goa hotels",
  "best North Goa hotel",
  "hotel in North Goa",
  "stay in North Goa",
  "North Goa accommodation",
  "North Goa holiday stay",
  "North Goa boutique hotel",
  "North Goa rooftop pool hotel",
  "North Goa swimming pool hotel",
  "hotel in Candolim",
  "hotel in Candolim Goa",
  "best hotel in Candolim",
  "Candolim hotel",
  "Candolim accommodation",
  "hotel in Calangute",
  "hotel in Calangute Goa",
  "Calangute hotel",
  "Calangute accommodation",
  "hotel in Panaji",
  "hotel in Panjim",
  "Panaji hotel",
  "Panjim hotel",
  "hotel in Vasco",
  "hotel in Vasco Goa",
  "hotel in Margao",
  "hotel in Margao Goa",
  "Goa weekend getaway",
  "Goa weekend stay",
  "Goa staycation",
  "Goa vacation stay",
  "best place to stay in Goa",
  "Goa hotel deals",
  "Goa hotel offers",
  "Goa hotel discounts",
  "book hotel online Goa",
  "direct hotel booking Goa",
  "hotel near airport Goa",
  "Goa honeymoon hotel",
  "romantic hotel Goa",
  "hotel with sea breeze",
  "hotel with scenic views Goa",
  "hotel with nature views Goa",
  "peaceful hotel Goa",
  "quiet hotel Goa",
  "relaxing stay Goa",
  "comfortable stay Goa",
  "modern rooms Goa",
  "hotel with king bed Goa",
  "hotel with spacious rooms Goa",
  "hotel near tourist attractions Goa",
  "Goa sightseeing stay",
  "hotel close to beaches Goa",
  "hotel near nightlife Goa",
  "hotel near casinos Goa",
  "hotel near restaurants Goa",
  "hotel near cafes Goa",
  "hotel near water sports Goa",
  "hotel for digital nomads Goa",
  "hotel for remote workers Goa",
  "hotel for vacation Goa",
  "hotel for holiday Goa",
  "hotel with rooftop views Goa",
  "hotel with terrace pool Goa",
  "Goa hotel with balcony",
  "Goa hotel near Candolim",
  "Goa hotel near Calangute",
  "Goa hotel near Panaji",
  "Goa hotel near Coco Beach",
  "Goa hotel near Fort Aguada",
  "Goa hotel near Sinquerim Beach",
  "best boutique hotel North Goa",
  "best rooftop pool hotel Goa",
  "best hotel near Coco Beach",
  "best hotel for couples in Goa",
  "best family hotel in North Goa",
  "book rooms in Goa",
  "reserve hotel Goa",
  "online hotel booking Goa",
  "Goa travel accommodation",
  "Goa vacation rooms",
  "Goa holiday hotel",
  "hotel deals North Goa",
  "luxury boutique hotel Goa",
  "smart hotel Goa",
  "comfortable hotel Goa",
  "weekend hotel Goa",
  "holiday accommodation Goa",
  "Goa resort alternative",
  "hotel near beaches North Goa",
  "North Goa room booking",
  "Goa room booking",
  "Goa hotels with rooftop pool",
  "best value hotel Goa",
  "Goa hotel near attractions",
  "Goa travel stay",
  "North Goa travel accommodation",
  "book North Goa hotel",
  "best stay in North Goa",
  "Goa best destination",
  "best destination in Goa",
  "best destination North Goa",
  "best tourist destination Goa",
  "North Goa destination",
  "places to visit in North Goa",
  "places to visit near Nerul Goa",
  "best beaches North Goa",
  "best beaches near Nerul",
  "things to do in North Goa",
  "things to do near Nerul Goa",
  "where to stay in North Goa",
  "where to stay in Nerul Goa",
  "best place to stay North Goa",
  "hotels near Candolim Beach",
  "hotels near Calangute Beach",
  "hotels near Baga Beach",
];

export const NIVAARA_CONTACT = {
  title: "Nivaãra reception",
  receptionPhone: "+91 83900 20408",
  receptionPhoneHref: "tel:+918390020408",
  receptionEmail: "info.nerul@ghdhotels.in",
  receptionEmailHref: "mailto:info.nerul@ghdhotels.in",
  website: "www.ghdhotels.in",
  websiteHref: "https://www.ghdhotels.in",
  addressLines: ["Survey No. 98, Nerul, North Goa - 403114"],
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
  image: "/images/nivaara/nivaara-reception.webp",
  alt: "Reception at Nivaãra by GHD Hotels",
} as const;

export const NIVAARA_HERO_VIDEO = "/images/nivaara/hero-section.mp4";
export const HERO_VIDEO = NIVAARA_HERO_VIDEO;
export const HERO_VIDEO_POSTER = "/images/nivaara/nivaara-hero-poster.webp";

export const NIVAARA_LOGO = "/logos/nivaara-logo.png";
export const SAMRAYA_LOGO = "/logos/samraya-logo.png";

export const GHD_LOGO_WHITE = "/logos/ghd-hotels-logo-white.png";

export const GHD_LOGO_GOLD = "/logos/ghd-hotels-logo-gold.png";
export const GHD_LOGO_GOLD_EMBOSSED = "/logos/ghd-hotels-logo-gold-embossed.png";
/** Primary GHD Hotels logo for header, footer, and on-page use. */
export const GHD_LOGO = GHD_LOGO_GOLD_EMBOSSED;
/** Tab / favicon only — wordmark without monogram. */
export const GHD_FAVICON = "/logos/ghd-hotels-favicon-gold.png";

export const BEACH_EXPERIENCES_VIDEO =
  "/images/nivaara/nivaara-beach.mp4";

export const BEACH_EXPERIENCES_POSTER =
  "/images/nivaara/nivaara-beach-poster.webp";

export const POOL_EXPERIENCES_VIDEO =
  "/images/nivaara/nivaara-pool.mp4";

export const POOL_EXPERIENCES_POSTER =
  "/images/nivaara/nivaara-pool-poster.webp";

export const EXPERIENCES_HERO_VIDEO =
  "/images/experiences/experiences-hero.mp4";

export const SILHOUETTE_VIDEO = "/images/nivaara/silhouette.mp4";

export const FAMILY_AT_BEACH_VIDEO = "/images/nivaara/family-at-beach.mp4";

export const EXPLORE_SPACES = [
  {
    title: "Private Workspaces",
    description:
      "Workation-ready: work from a peaceful, green-accented setting designed to support focus, comfort, and deep productivity.",
    href: "#accommodation",
    image: "/images/nivaara/nivaara-private-workspace.webp",
    alt: "Private workspace with window view at Nivaãra by GHD Hotels",
  },
  {
    title: "Panoramic Comfort",
    description:
      "Enjoy big studio rooms with beautiful views, airy interiors, and a sense of calm that lingers throughout your stay in Goa.",
    href: "#accommodation",
    image: "/images/nivaara/nivaara-room-3.webp",
    alt: "Guest room with hillside view at Nivaãra by GHD Hotels",
  },
  {
    title: "Rooftop Pool",
    description:
      "Relax under open skies at our rooftop pool, where calm waters and North Goa views create the perfect escape.",
    href: "#accommodation",
    image: "/images/nivaara/nivaara-pool-1.webp",
    alt: "Rooftop pool at Nivaãra by GHD Hotels",
  },
  {
    title: "Open Dining",
    description:
      "Enjoy relaxed dining experiences in an inviting setting where fresh, local Goan flavours meet warm hospitality.",
    href: "#accommodation",
    image: "/images/nivaara/nivaara-terrace-1.webp",
    alt: "Open dining terrace at Nivaãra by GHD Hotels",
  },
  {
    title: "Reception & Arrival",
    description:
      "From the moment you arrive at Nivaãra, our friendly team is dedicated to making you feel at home.",
    href: "#accommodation",
    image: "/images/nivaara/nivaara-reception-desk.webp",
    alt: "Reception desk at Nivaãra by GHD Hotels",
  },
  {
    title: "Lobby Lounge",
    description:
      "Settle into a comfortable space ideal for discussions, catch-ups, and quiet collaboration.",
    href: "#accommodation",
    image: "/images/nivaara/nivaara-lobby-lounge.webp",
    alt: "Lobby lounge at Nivaãra by GHD Hotels",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Very spacious and comfortable rooms, located at the heart of Goa so all major attractions are easily accessible. The views from the rooms are majestic! The rooftop pool is a cherry on the cake! The staff is very supportive! I'd highly recommend choosing Nivaara!",
    name: "Utkarsh Rally",
    location: "Google Review",
  },
  {
    quote:
      "The property was excellent, staff was helpful and cooperative.",
    name: "Apurva Nimbalkar",
    location: "Google Review",
  },
  {
    quote:
      "Had a great stay at Nivaara. The rooms were clean and comfortable, the staff was friendly and helpful, and the overall atmosphere was very relaxing. Everything was well managed, and I felt welcomed throughout my stay. Would definitely recommend it and would love to visit again.",
    name: "Akshit Dagar",
    location: "Google Review",
  },
  {
    quote:
      "A calm and thoughtfully designed space that supports relaxation and emotional well-being. The warm hospitality and serene atmosphere make Hotel Nivrrana by GHD Group an excellent choice for a restorative stay.",
    name: "Samvedana Space",
    location: "Google Review",
  },
  {
    quote:
      "What a property — fantastic vibe and great hospitality. Had an amazing time at Hotel Nivaara. The hotel has a fantastic, energetic vibe and a beautiful pool area. Definitely we will love to visit again.",
    name: "Sachin Chauhan",
    location: "Google Review",
  },
] as const;

export const EXPERIENCES = [
  {
    title: "Elegant Accommodations",
    description:
      "Twenty thoughtfully appointed rooms where refined materials, natural light, and serene palettes create an atmosphere of quiet indulgence.",
  },
  {
    title: "Curated Dining",
    description:
      "Seasonal flavours and intimate settings celebrate Goa's coastal heritage with contemporary finesse and impeccable presentation.",
  },
  {
    title: "Personalized Experiences",
    description:
      "From bespoke itineraries to attentive concierge service, every moment is tailored to your preferences with understated grace.",
  },
] as const;

export const EXPERIENCE_POSTS = [
  {
    slug: "beaches-of-goa",
    title: "Beaches of Goa — A Guide from Nerul",
    excerpt:
      "Explore Goa's diverse coastline, from tranquil hidden beaches near Nerul to lively shores filled with dining, water sports, and unforgettable seaside experiences.",
    category: "BEACHES",
    date: "May 3, 2026",
    readTime: "9 min read",
    image: "/images/experiences/beaches/goa-beach-scenic.jpg",
    alt: "Scenic Goan beach with lush hills and gentle waves",
  },
  {
    slug: "goa-finest-fish-seafood",
    title: "Goa's Finest Fish & Seafood: 7 Exceptional Places to Dine",
    excerpt:
      "A curated North-to-South guide to refined Goan seafood — from Assagao and Panaji to a classic fish thali in Benaulim and iconic South Goa tables.",
    category: "DINING",
    date: "September 10, 2026",
    readTime: "11 min read",
    image: "/images/nivaara/goa-seafood-dining.jpg",
    alt: "Grilled lobster and cocktail at a refined Goan seafood table",
  },
] as const;

export const FAQ_SECTIONS = [
  {
    title: "Location & Accessibility",
    items: [
      {
        question: "Where is Nivaãra located?",
        answer:
          "Nivaãra by GHD Hotels is located in Nerul, North Goa, offering convenient access to popular beaches, dining destinations, and cultural attractions while providing a peaceful retreat away from the crowds.",
      },
      {
        question: "Which are the nearest beaches to Nivaãra?",
        answer:
          "Coco Beach is the closest, at approximately 1.7 km from the property. Other popular North Goa beaches, including Sinquerim Beach and Candolim Beach, are also easily accessible from Nivaãra in Nerul.",
      },
      {
        question: "How far is Nivaãra from Goa Airport?",
        answer:
          "The property is approximately 45–60 minutes from Manohar International Airport (Mopa) and 35–50 minutes from Goa International Airport (Dabolim), depending on traffic conditions.",
      },
      {
        question: "Is public transportation available near Nerul?",
        answer:
          "Yes. Local taxis, app-based cab services, and rental vehicles are readily available in the Nerul area.",
      },
    ],
  },
  {
    title: "Reservations & Bookings",
    items: [
      {
        question: "How can I make a reservation at Nivaãra?",
        answer:
          "Reservations can be made directly through our website, by phone, email, or through authorized travel partners and online booking platforms.",
      },
      {
        question: "Is it better to book directly with Nivaãra?",
        answer:
          "Direct bookings may provide access to exclusive offers, special packages, and personalized assistance, subject to availability.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards, debit cards, UPI payments, bank transfers, and other approved payment methods.",
      },
      {
        question: "Will I receive a booking confirmation?",
        answer:
          "Yes. A confirmation email containing your reservation details will be sent once the booking is successfully completed.",
      },
    ],
  },
  {
    title: "Check-In & Check-Out",
    items: [
      {
        question: "What are the check-in and check-out timings?",
        bullets: [
          `Check-In: ${HOTEL_CHECK_IN_TIME}`,
          `Check-Out: ${HOTEL_CHECK_OUT_TIME}`,
        ],
      },
      {
        question: "Can I request an early check-in or late check-out?",
        answer:
          "Yes, subject to availability and applicable charges.",
      },
      {
        question: "What documents are required during check-in?",
        answer:
          "All guests must provide a government-approved photo ID. Foreign nationals must present a valid passport and visa.",
      },
    ],
  },
  {
    title: "Accommodation",
    items: [
      {
        question: "What types of rooms are available at Nivaãra?",
        answer:
          "Nivaãra offers thoughtfully designed rooms in Nerul that combine comfort, privacy, and modern conveniences for leisure and business travelers alike.",
      },
      {
        question: "Are all rooms air-conditioned?",
        answer:
          "Yes, all rooms are equipped with air conditioning and essential modern amenities.",
      },
      {
        question: "Is Wi-Fi available?",
        answer:
          "Complimentary high-speed Wi-Fi is available throughout the property.",
      },
      {
        question: "Are extra beds available?",
        answer:
          "Extra beds may be arranged upon request, subject to room category, availability, and additional charges.",
      },
    ],
  },
  {
    title: "Dining",
    items: [
      {
        question: "Does Nivaãra have an in-house restaurant?",
        answer:
          "Our in-house kitchen will be opening soon. In the meantime, guests can order food delivery to the property through Swiggy and Zomato.",
      },
      {
        question: "Do you offer room service?",
        answer:
          "In-house room service will be available once our kitchen opens. Until then, guests can conveniently order meals to the property via Swiggy and Zomato.",
      },
    ],
  },
  {
    title: "Facilities & Services",
    items: [
      {
        question: "Is there a swimming pool at Nivaãra?",
        answer:
          `Yes. Nivaãra features a rooftop swimming pool, offering guests a refreshing swim with scenic North Goa views. Pool hours are ${HOTEL_POOL_HOURS}.`,
      },
      {
        question: "Is parking available?",
        answer:
          "Complimentary parking is available for in-house guests, subject to availability.",
      },
      {
        question: "Do you provide airport transfers?",
        answer:
          "Airport transfer services can be arranged upon request at an additional charge.",
      },
      {
        question: "Is Nivaãra suitable for families?",
        answer:
          "Yes, Nivaãra welcomes families and offers a comfortable environment for guests of all ages.",
      },
    ],
  },
  {
    title: "Policies",
    items: [
      {
        question: "Is smoking allowed inside the rooms?",
        answer:
          "Yes. Smoking is allowed inside guest rooms.",
      },
      {
        question: "Are pets allowed?",
        answer:
          "Pet policies vary. Please contact the property directly before booking if you plan to travel with pets.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellations within 3 days of check-in incur 100% retention. Less than 72 hours before arrival, no-shows, and early checkouts are also subject to full retention.",
      },
      {
        question: "Can I modify my reservation after booking?",
        answer:
          "Yes, modifications may be possible subject to availability and applicable rate conditions.",
      },
    ],
  },
  {
    title: "Nearby Attractions",
    items: [
      {
        question: "What are some attractions near Nivaãra?",
        answer:
          "Popular nearby attractions include Coco Beach, Fort Aguada, Sinquerim Beach, Candolim Beach, and Calangute Beach — all within a short drive of Nerul.",
      },
      {
        question: "Is Nivaãra suitable for exploring North Goa?",
        answer:
          "Yes. Its location in Nerul provides convenient access to North Goa's beaches, nightlife, dining destinations, and cultural landmarks.",
      },
    ],
  },
] as const;
