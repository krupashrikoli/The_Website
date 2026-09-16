/**
 * Seafood dining guide for City Attractions.
 * To add photos later, set `image: "/images/experiences/seafood/<restaurant-slug>.jpg"`
 * on any restaurant (and hero via EXPERIENCE_POSTS[].image).
 */
export type SeafoodRestaurant = {
  id: string;
  name: string;
  location: string;
  bestFor: string;
  signature: string;
  ambience: string;
  reservation: string;
  paragraphs: readonly string[];
  image?: string;
};

export const SEAFOOD_BLOG = {
  meta: {
    region: "Goa",
    guideType: "Dining Guide",
    placesCovered: "7 restaurants",
    readTime: "11 min read",
  },
  hero: {
    headline: "Goa's Finest Fish & Seafood",
    subheading:
      "Seven exceptional places to discover the flavours, traditions and coastal character of Goa.",
  },
  intro: [
    "Goa's relationship with the sea runs deeper than beach shacks and a plate of fish curry rice. Along the Arabian Sea, daily catch becomes coconut-rich curries, crisp fish fries, fragrant Xacuti, sharp Balchão, and the quiet refreshment of Solkadhi — a cuisine shaped by Konkan traditions and Portuguese influence, still evolving at the table.",
    "This guide gathers some of the best seafood restaurants in Goa where food, setting and experience come together: refined Goan dining, heritage kitchens, riverside evenings, modern interpretations, and classic fish thalis worth planning a meal around.",
  ],
  seafoodExperience: {
    title: "The Goan Seafood Experience",
    paragraphs: [
      "When ordering seafood in Goa, look for freshness first — kingfish, prawns and crab remain staples of coastal cooking, while Chonak appears on menus where the catch supports it. Expect fish curry and fish fry alongside deeper preparations such as Xacuti and Balchão, often balanced with Solkadhi and the accompaniments of a traditional thali.",
      "The most memorable meals tend to pair careful cooking with a sense of place: a garden table, a riverside evening, or a room that still feels distinctly Goan.",
    ],
  },
  journey: [
    "Assagao",
    "Panaji",
    "Dona Paula",
    "Caranzalem",
    "Benaulim",
  ] as const,
  northSection: {
    title: "From Assagao to Panaji",
    intro:
      "North Goa and Panjim hold much of the state's most considered seafood dining — from garden-chic Assagao to riverside evenings and heritage tables around the capital.",
    restaurants: [
      {
        id: "avos-kitchen",
        name: "Avo's Kitchen",
        location: "Assagao",
        bestFor: "A refined Goan seafood experience",
        signature: "Signature prawn curry and seafood platters",
        ambience: "Garden-chic, open-kitchen dining with a full bar",
        reservation: "Reservation recommended — book ahead",
        image: "/images/experiences/seafood/avos-kitchen-assagao.jpg",
        paragraphs: [
          "Among Assagao's more polished tables, Avo's Kitchen offers an upscale take on Goan seafood without losing the warmth of a coastal meal. The open kitchen and garden setting create a composed, contemporary atmosphere — suited to travellers who want Goan flavours with clarity and care.",
          "Expect refined interpretations rather than rustic plating: prawn curry, seafood platters, and a menu that rewards lingering. It is one of the strongest choices in this guide for guests seeking a more elevated North Goa seafood evening.",
        ],
      },
      {
        id: "peep-kitchen",
        name: "Peep Kitchen",
        location: "Caranzalem / Panaji",
        bestFor: "Contemporary Goan flavours",
        signature: "Seafood curry and creative Goan curries",
        ambience: "Trendy bistro character with a modern Goan lens",
        reservation: "Book ahead where possible",
        image: "/images/experiences/seafood/peep-kitchen-panaji-food-spread.jpg",
        paragraphs: [
          "Peep Kitchen brings contrast to the traditional institutions on this list. With a trendy bistro spirit, it leans into modern Goan interpretation — seafood curry and creative curries that feel current without abandoning coastal identity.",
          "It is a natural pick for diners who want authentic Goan food with a contemporary edge, especially after several more classic tables.",
        ],
      },
      {
        id: "fishermans-wharf",
        name: "The Fisherman's Wharf",
        location: "Panaji",
        bestFor: "Riverside seafood and cocktails",
        signature: "Kingfish curry, prawn curry and seafood platters",
        ambience: "Upbeat riverside setting — especially appealing in the evening",
        reservation: "Weekends can be busy",
        image: "/images/experiences/seafood/fishermans-wharf-panaji.avif",
        paragraphs: [
          "For a lively premium riverside seafood experience, The Fisherman's Wharf remains a Panaji favourite. The waterfront setting, cocktails and Goan seafood make it particularly appealing for an evening meal — kingfish curry, prawn curry and seafood platters among the draws.",
          "It is less hushed than Assagao's garden dining and more social in energy: ideal when the night calls for river light, conversation and a generous seafood table.",
        ],
      },
      {
        id: "mums-kitchen",
        name: "Mum's Kitchen",
        location: "Miramar / Panaji",
        bestFor: "Traditional Goan cuisine with a refined setting",
        signature: "Crab Xacuti and Balchão prawns",
        ambience: "Lush garden setting with heritage Goan character",
        reservation: "Call ahead for dinner",
        image: "/images/experiences/seafood/mums-kitchen-panaji.jpg",
        paragraphs: [
          "Mum's Kitchen is less about novelty and more about culinary heritage. In a lush garden setting, it offers authentic Goan fine-dining character — traditional recipes presented with composure, including Crab Xacuti and Balchão prawns.",
          "Come for the sense of Goa's kitchen traditions: spices, family recipes and a dining room that still feels rooted in place.",
        ],
      },
      {
        id: "the-goan-room",
        name: "The Goan Room",
        location: "Dona Paula",
        bestFor: "A traditional Goan thali experience",
        signature: "Patrao Thali — a grand Goan fish thali",
        ambience: "Distinctive Goan dining in Dona Paula",
        reservation: "Thali primarily available at lunch",
        image: "/images/experiences/seafood/the-goan-room-dona-paula-fish-thali.jpg",
        paragraphs: [
          "In Dona Paula, The Goan Room centres on the Patrao Thali — a grand Goan fish thali idea built around rice, curry and traditional accompaniments. It is a distinctive way to experience Goan seafood as a complete meal rather than a single plate.",
          "Note that the thali is primarily available at lunch, which makes it a strong midday destination for guests exploring beyond the beach.",
        ],
      },
    ] as const satisfies readonly SeafoodRestaurant[],
  },
  southSection: {
    title: "Further South: Classic Tables by the Coast",
    intro:
      "A short journey south opens another chapter of Goan seafood dining — from a classic fish thali in Benaulim to an iconic, lively evening table.",
    restaurants: [
      {
        id: "ritz-classic",
        name: "Ritz Classic",
        location: "Benaulim",
        bestFor: "A classic Goan fish thali",
        signature: "Classic fish thali with fish curry, fried fish and Solkadi",
        ambience: "Air-conditioned, comfortable and accessible dining",
        reservation: "A reliable choice for a classic midday or evening meal",
        image: "/images/experiences/seafood/ritz-classic-benaulim.webp",
        paragraphs: [
          "Ritz Classic in Benaulim is a long-regarded South Goa institution and the clearest fish-thali choice in this guide. It is not positioned here as luxury dining — rather as a classic, highly regarded Goan seafood experience: fish curry, fried fish, Solkadi and the familiar comfort of a well-made thali.",
          "For visitors seeking the best fish thali in Goa in an easy, air-conditioned setting, Ritz Classic remains a considered stop on any thoughtful South Goa dining itinerary.",
        ],
      },
      {
        id: "martins-corner",
        name: "Martin's Corner",
        location: "South Goa",
        bestFor: "Iconic Goan seafood and a lively evening",
        signature: "Butter garlic prawns and Kingfish Xacuti",
        ambience: "Lively Indo-Portuguese / Goan tavern atmosphere",
        reservation: "Booking advised during peak periods",
        image: "/images/experiences/seafood/martins-corner-south-goa.jpg",
        paragraphs: [
          "Martin's Corner is an iconic Goan dining institution rather than an ultra-luxury restaurant — and that is precisely why it belongs on a premium food itinerary. The lively Indo-Portuguese tavern atmosphere, extensive seafood menu and reputation for kingfish and Goan seafood preparations have made it a long-standing destination.",
          "Butter garlic prawns and Kingfish Xacuti are among the dishes that keep tables returning. Expect a busy room; for peak periods, booking ahead is wise.",
        ],
      },
    ] as const satisfies readonly SeafoodRestaurant[],
  },
  chooseExperience: [
    {
      label: "For the Most Refined Experience",
      name: "Avo's Kitchen",
      hrefId: "avos-kitchen",
    },
    {
      label: "For Heritage Goan Cuisine",
      name: "Mum's Kitchen",
      hrefId: "mums-kitchen",
    },
    {
      label: "For Riverside Dining",
      name: "The Fisherman's Wharf",
      hrefId: "fishermans-wharf",
    },
    {
      label: "For a Modern Interpretation",
      name: "Peep Kitchen",
      hrefId: "peep-kitchen",
    },
    {
      label: "For a Classic Fish Thali",
      name: "Ritz Classic",
      hrefId: "ritz-classic",
    },
    {
      label: "For a Traditional Goan Thali",
      name: "The Goan Room",
      hrefId: "the-goan-room",
    },
    {
      label: "For an Iconic Goan Evening",
      name: "Martin's Corner",
      hrefId: "martins-corner",
    },
  ] as const,
  outro: {
    title: "A Taste of Goa Beyond the Beach",
    paragraphs: [
      "Discovering Goa through its food offers another way to understand the destination — through its coastline, traditions, ingredients, family recipes and evolving dining culture. The best fish restaurants in Goa are not only about the plate; they are about place, memory and the particular pleasure of eating well by the sea.",
      "From a refined seafood table in Assagao to a classic fish thali in Benaulim, Goa rewards those willing to explore beyond the obvious. Wherever your journey takes you, leave room for one more Goan meal.",
    ],
    ctaLabel: "Discover Goa with GHD Hotels",
    ctaHref: "/city-attractions",
  },
} as const;
