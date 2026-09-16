import { GHD_LOGO } from "@/lib/constants";

export const CORPORATE_PALETTE = {
  gold: "#C6A86B",
  warmWhite: "#FCFBF8",
  ivory: "#FAF7F2",
  softCream: "#F4EFE6",
  border: "#E6DDCF",
  textPrimary: "#2D2D2D",
  textSecondary: "#6F6A62",
} as const;

export { GHD_LOGO };

export const CORPORATE_NAV = [
  { label: "Who We Are", href: "/about" },
  { label: "Our Brands", href: "/brands" },
  { label: "Our Culture", href: "/culture" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const CORPORATE_HERO = {
  video: "/images/nivaara/ghd-hotels-hero.mp4",
  poster: "/images/nivaara/goa-beach-aerial.jpg",
  imageAlt: "GHD Hotels hospitality",
} as const;

export const CORPORATE_BEACH_BANNER = {
  image: "/images/nivaara/goa-beach-aerial.jpg",
  imageAlt: "Sunset over the Goa coast with palm trees",
} as const;

export const CORPORATE_INTRO = {
  headline: "Creating Experiences Beyond the Stay",
  paragraph:
    "GHD Hotels is a hospitality group rooted in Goa and established in 2026, creating places across India that feel as memorable as the destinations themselves. We bring together contemporary luxury, great food, meaningful experiences, and thoughtful hospitality to create hotels where people can relax, connect, celebrate, and simply feel at home. Because for us, a great stay is not just about where you sleep—it’s about how the place makes you feel.",
  cta: { label: "Who we are", href: "/about" },
} as const;

export const BRANDS_SECTION = {
  title: "Our Brands",
} as const;

export const BRAND_SHOWCASE = {
  nivaara: {
    image: "/images/nivaara/nivaara-rooftop-pool.png",
    imageAlt: "Rooftop pool at Nivaãra by GHD Hotels",
    cta: { label: "Explore More", href: "/nivaara" },
  },
  samraya: {
    image: "/images/nivaara/samraya-entrance.png",
    imageAlt: "Samrāya by GHD Hotels — coming soon",
  },
  celestra: {
    image: "/images/nivaara/celestra-luxury-hotel-dodamarg.png",
    imageAlt: "Celéstra by GHD Hotels — luxury hotel in Dodamarg, coming soon",
  },
} as const;

export const CULTURE = {
  eyebrow: "Our Culture",
  headline: "Belonging",
  paragraph:
    "At GHD Hotels, we believe hospitality begins with a feeling of belonging. It is the culture at the heart of who we are—creating an environment where every guest, colleague, and partner feels welcomed, valued, and genuinely at home. From the way we work together to the way we care for our guests, we strive to create meaningful connections, foster inclusivity, and make every stay feel personal, warm, and memorable.",
  image: "/images/nivaara/ghd-team-hands-joined.png",
  imageAlt: "Hands joined together in unity and belonging",
} as const;

export const WHAT_WE_BELIEVE = {
  headline: "What We Believe.",
  paragraphs: [
    "To redefine hospitality by creating destinations people travel for, experiences they remember, and places they return to.",
    "At GHD Hotels, we go beyond the traditional hotel stay. We create distinctive destinations that bring together thoughtful design, genuine hospitality, exceptional dining, leisure, and entertainment—each shaped by its surroundings and given its own character.",
    "More than hotels, we create places worth discovering, experiencing, and returning to.",
  ],
} as const;

export const ABOUT_GHD = {
  eyebrow: "About GHD Hotels",
  headline: "Hospitality,\nthoughtfully imagined.",
  paragraphs: [
    "At GHD Hotels, we believe the best stays are about more than where you sleep. They are about the feeling of arriving somewhere new, being welcomed warmly, and discovering a place at your own pace.",
    "Our growing collection of hospitality brands is shaped around thoughtful design, genuine service, a strong sense of place and experiences that guests remember long after they leave.",
  ],
  cta: { label: "Our Story", href: "/about" },
} as const;

export const VISION_MISSION = {
  vision: {
    label: "Vision",
    headline: "Create places people want to come back to.",
    body: "Destinations worth travelling for. Experiences worth remembering.",
  },
  mission: {
    label: "Mission",
    headline: "Make every stay feel like an experience.",
    body: "Through thoughtful design, genuine hospitality, great food, and a strong sense of place.",
  },
} as const;

export const PHILOSOPHY = {
  headline: "Our Philosophy",
  paragraphs: [
    "More than a place to stay. A destination to experience.",
    "We believe a hotel should have a soul of its own—shaped by its surroundings and brought to life through thoughtful design, meaningful experiences, exceptional dining, and genuine hospitality. Every detail should have a purpose, every space should invite connection, and every stay should leave you with something to remember.",
    "At GHD Hotels, we create places that feel distinctive yet welcoming, elevated yet effortless—destinations where people come not simply to stay, but to experience, connect, and return.",
  ],
  image: "/images/nivaara/infinity-pool.png",
  imageAlt: "Infinity pool overlooking green hills",
} as const;

export const LEADERSHIP = {
  eyebrow: "Leadership",
  headline: "Our Leadership",
  supportingHeadline: "The people shaping what comes next.",
  paragraph:
    "GHD Hotels is built by people who believe hospitality can be more meaningful, more human, and more connected to the places we call home. Our leadership brings together experience, perspective, and a shared ambition to create destinations people want to experience and return to.",
  cta: { label: "Meet Our Leaders", href: "/about#our-leadership" },
  profiles: [
    {
      name: "Bharat Thakran",
      designation: "Managing Director",
      initials: "BT",
      bio: "",
      image: null as string | null,
    },
    {
      name: "Kamal Koli",
      designation: "CEO",
      initials: "KK",
      bio: "",
      image: null as string | null,
    },
    {
      name: "Kamran Siddiqui",
      designation: "Cluster General Manager",
      initials: "KS",
      bio: "",
      image: null as string | null,
    },
  ],
} as const;

export const GET_IN_TOUCH = {
  eyebrow: "Contact",
  headline: "Get in Touch",
  cta: { label: "Contact Us", href: "/contact" },
} as const;

export const DESTINATIONS = {
  eyebrow: "Destinations",
  headline: "Places worth staying for.",
  items: [
    {
      region: "Goa",
      brandName: "Nivaãra",
      location: "Nerul, North Goa",
      detail: "Near Coco Beach",
      image: "/images/nivaara/nivaara-beach-poster.webp",
      href: "/nivaara",
      status: "live" as const,
    },
  ],
} as const;

export const GHD_EXPERIENCE = {
  eyebrow: "The GHD Experience",
  headline: "More than a stay.",
  steps: [
    {
      title: "Arrive",
      description: "Feel welcomed from the moment you arrive.",
      image: "/images/nivaara/nivaara-reception.webp",
    },
    {
      title: "Unwind",
      description: "Spaces designed to help you slow down.",
      image: "/images/nivaara/nivaara-room-2.webp",
    },
    {
      title: "Discover",
      description: "Experience the destination beyond your room.",
      image: "/images/experiences/beaches/coco-beach.png",
    },
    {
      title: "Return",
      description: "Leave with a reason to come back.",
      image: "/images/nivaara/nivaara-terrace-1.webp",
    },
  ],
} as const;

export const CINEMATIC_STATEMENT = {
  line1: "We create places",
  line2: "you want to return to.",
  image: "/images/nivaara/nivaara-terrace-2.webp",
} as const;

export const FINAL_BOOKING_CTA = {
  headline: "Your next stay starts here.",
  subheading: "Discover Nivaãra in North Goa.",
  cta: { label: "Book Nivaãra", href: "/nivaara" },
} as const;

export const CORPORATE_FOOTER = {
  tagline: "Thoughtful stays. Genuine hospitality.",
  explore: [
    { label: "About GHD", href: "/about" },
    { label: "Destinations", href: "/#destinations" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  social: [
    {
      label: "Instagram",
      icon: "instagram" as const,
      href: "https://www.instagram.com/ghdhotels/",
    },
    {
      label: "Facebook",
      icon: "facebook" as const,
      href: "https://www.facebook.com/profile.php?id=61590444132512",
    },
    {
      label: "X",
      icon: "x" as const,
      href: "https://x.com/ghdhotels",
    },
    {
      label: "LinkedIn",
      icon: "linkedin" as const,
      href: "https://www.linkedin.com/company/ghd-hotels/",
    },
    {
      label: "YouTube",
      icon: "youtube" as const,
      href: "https://www.youtube.com/@ghdhotels",
    },
  ],
} as const;

export const ABOUT_PAGE = {
  headline: "About GHD Hotels",
  paragraph:
    "A new-generation hospitality group creating distinctive hotels and destinations across India, blending contemporary luxury with meaningful experiences.",
  subheading: "Where Every Stay Becomes an Experience",
  body: [
    "GHD Hotels is a hospitality group rooted in Goa, established in 2026, and building a growing portfolio of distinctive hotels and destinations across India.",
    "From Nivaãra in Nerul, Goa to Samrāya and Celéstra in Dodamarg, Maharashtra, each GHD property is created with its own character, bringing together thoughtful design, genuine hospitality, and experiences shaped by the destination.",
    "We are building a diverse collection of places to stay, gather, discover, and belong.",
  ],
  heroImage: "/images/nivaara/samraya-resort-view.png",
  heroImageAlt: "Samrāya by GHD Hotels — destination resort aerial view",
  leadership: LEADERSHIP,
} as const;

export const BRANDS_PAGE = {
  headline: "Our Brands",
  paragraph:
    "A growing collection of distinctive hotels and destinations — each with its own character, shaped by thoughtful design, genuine hospitality, and a strong sense of place.",
  heroImage: "/images/nivaara/ghd-hotels-wall-signage.png",
  heroImageAlt: "GHD Hotels signage on the wall",
} as const;
