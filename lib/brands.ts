/**
 * Public GHD Hotels brand registry.
 * Add future brands here — set `public: true` only when ready to launch.
 */

export type BrandStatus = "live" | "coming-soon";

export type Brand = {
  id: string;
  name: string;
  tagline: string;
  status: BrandStatus;
  /** Full editorial paragraphs for brand showcase */
  descriptionParagraphs: readonly string[];
  /** Compact one-liner for menus / cards */
  shortDescription: string;
  megaMenuDescription: string;
  positioning: string;
  location?: {
    area: string;
    detail?: string;
  };
  route: string;
  exploreHref?: string;
  bookHref?: string;
  image: string;
  imageAlt: string;
  cardImage?: string;
  highlights?: readonly string[];
  /** When false, brand is excluded from public UI (e.g. unreleased brands) */
  public: boolean;
};

export const PUBLIC_BRANDS: readonly Brand[] = [
  {
    id: "nivaara",
    name: "Nivaãra",
    tagline: "A boutique smart-comfort hotel in Nerul, North Goa",
    status: "live",
    descriptionParagraphs: [
      "Contemporary studio stays designed for leisure, workations and easy North Goa getaways. With private balconies, work-friendly spaces and a rooftop pool, Nivaãra brings together modern comfort and warm, relaxed hospitality.",
    ],
    shortDescription:
      "Contemporary studio stays for leisure, workations and easy North Goa getaways.",
    megaMenuDescription:
      "A boutique smart-comfort hotel in Nerul, North Goa — studio rooms, rooftop pool and warm hospitality near Coco Beach.",
    positioning: "3★ Smart Comfort · Boutique Hotel",
    location: {
      area: "Nerul, North Goa",
      detail: "Near Coco Beach",
    },
    route: "/nivaara",
    exploreHref: "/nivaara",
    bookHref: "/nivaara",
    image: "/images/nivaara/nivaara-full-building-view.webp",
    cardImage: "/images/brands/nivaara-reception.webp",
    imageAlt: "Reception at Nivaãra by GHD Hotels in Nerul, North Goa",
    highlights: ["SEA VIEW", "ROOFTOP POOL", "NORTH GOA"],
    public: true,
  },
  {
    id: "samraya",
    name: "Samrāya",
    tagline: "A luxury destination resort in the Sahyadris",
    status: "coming-soon",
    descriptionParagraphs: [
      "An immersive resort where Indian artistry, nature and contemporary luxury come together. With premium residences, villas, dining, wellness and curated experiences, Samrāya is designed for memorable destination stays.",
    ],
    shortDescription:
      "An immersive luxury destination resort shaped by Indian artistry and the Sahyadris.",
    megaMenuDescription:
      "A luxury destination resort in the Sahyadris — premium residences, dining, wellness and curated experiences in Dodamarg.",
    positioning: "5★ Luxury · Destination Resort",
    location: {
      area: "Dodamarg, Maharashtra",
      detail: "Coming Soon",
    },
    route: "/brands",
    image: "/images/brands/samraya-entrance.webp",
    cardImage: "/images/brands/samraya-entrance.webp",
    imageAlt: "Entrance of Samrāya by GHD Hotels — coming soon",
    public: true,
  },
  {
    id: "celestra",
    name: "Celéstra",
    tagline: "A contemporary premium hotel in Dodamarg",
    status: "coming-soon",
    descriptionParagraphs: [
      "A refined stay designed for both business and leisure travellers, combining contemporary spaces, thoughtful amenities and effortless hospitality.",
    ],
    shortDescription:
      "A contemporary premium hotel in Dodamarg for business and leisure travellers.",
    megaMenuDescription:
      "A contemporary premium hotel in Dodamarg — refined comfort for modern business and leisure travel.",
    positioning: "4★ Premium · Business & Leisure",
    location: {
      area: "Dodamarg, Maharashtra",
      detail: "Coming Soon",
    },
    route: "/brands",
    image: "/images/brands/celestra-luxury-hotel-entrance.webp",
    cardImage: "/images/brands/celestra-luxury-hotel-entrance.webp",
    imageAlt: "Entrance of Celéstra luxury hotel by GHD Hotels in Dodamarg",
    public: true,
  },
] as const;

export function getPublicBrands(): Brand[] {
  return PUBLIC_BRANDS.filter((b) => b.public);
}

export function getBrandById(id: string): Brand | undefined {
  return PUBLIC_BRANDS.find((b) => b.id === id && b.public);
}

export function getLiveBrands(): Brand[] {
  return getPublicBrands().filter((b) => b.status === "live");
}
