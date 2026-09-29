const BEACH_IMAGES = {
  coco: "/images/experiences/beaches/coco-beach.webp",
  sinquerim: "/images/experiences/beaches/sinquerim-beach.webp",
  candolim: "/images/experiences/beaches/candolim-beach.webp",
  calangute: "/images/experiences/beaches/calangute-beach.webp",
  baga: "/images/experiences/beaches/baga-beach.webp",
  anjuna: "/images/experiences/beaches/anjuna-beach.webp",
  vagator: "/images/experiences/beaches/vagator-beach.webp",
  arambol: "/images/experiences/beaches/arambol-beach.webp",
  morjim: "/images/experiences/beaches/morjim-beach.webp",
  mandremAshwem: "/images/experiences/beaches/mandrem-ashwem-beach.webp",
} as const;

export type BeachGuideEntry = {
  id: string;
  name: string;
  subtitle: string;
  image?: string;
  distance?: string;
  travelTime?: string;
  vibe?: string;
  paragraphs: readonly string[];
  bestFor: readonly string[];
};

export const BEACHES_BLOG = {
  meta: {
    region: "North Goa",
    guideType: "Travel Guide",
    beachesCovered: "10 beaches covered",
    baseLocation: "Base is in Nerul, near Coco Beach",
    readTime: "9 min read",
  },
  intro: [
    "Goa's coastline stretches for over 100 kilometers along the Arabian Sea, offering a diverse collection of beaches, each with its own personality. Whether you're seeking quiet mornings by the water, thrilling adventures, lively beach clubs, or breathtaking sunsets, Goa has a shoreline that perfectly matches your travel style.",
    "Staying at Nivaãra by GHD Hotels in Nerul puts you minutes from some of Goa's most popular beaches, making it an ideal base to explore the coast.",
  ],
  beaches: [
    {
      id: "coco-beach",
      name: "Coco Beach",
      image: BEACH_IMAGES.coco,
      subtitle: "Nerul's Hidden Riverside Escape",
      distance: "Less than 1 km",
      travelTime: "5 minutes",
      vibe: "Peaceful",
      paragraphs: [
        "Nestled along the Nerul River estuary, Coco Beach is one of the closest beaches to Nivaãra and remains relatively peaceful compared to Goa's busier shores. Surrounded by swaying coconut palms and fishing boats, it offers a glimpse into Goa's traditional coastal life.",
        "The beach is particularly known as a departure point for dolphin-watching tours, river cruises, and water-based activities. Early mornings and evenings provide beautiful views as fishing vessels return to shore and the sun casts golden reflections across the estuary.",
      ],
      bestFor: ["Dolphin trips", "Peaceful walks", "Local experiences"],
    },
    {
      id: "sinquerim-beach",
      name: "Sinquerim Beach",
      image: BEACH_IMAGES.sinquerim,
      subtitle: "Where History Meets the Sea",
      distance: "Approximately 2 km",
      travelTime: "5–10 minutes",
      vibe: "Scenic",
      paragraphs: [
        "Located at the base of the iconic Fort Aguada, Sinquerim Beach combines history, scenic beauty, and adventure. Its long stretch of golden sand is often quieter than neighboring beaches, making it perfect for travelers seeking a more relaxed atmosphere.",
        "The beach is known for its water sports, including jet skiing, parasailing, and banana boat rides. The backdrop of the historic fort adds a unique character rarely found elsewhere along Goa's coastline.",
      ],
      bestFor: ["Water sports", "Sunset walks", "Couples", "History lovers"],
    },
    {
      id: "candolim-beach",
      name: "Candolim Beach",
      image: BEACH_IMAGES.candolim,
      subtitle: "The Perfect Balance",
      distance: "Approximately 3–5 km",
      travelTime: "10–15 minutes",
      vibe: "Relaxed",
      paragraphs: [
        "Candolim Beach offers a refined coastal experience, balancing lively beach culture with a more relaxed environment than nearby tourist hotspots.",
        "Its wide sandy shoreline is lined with excellent beach shacks, seafood restaurants, and elegant beachfront cafés. Visitors can spend the day relaxing by the sea before enjoying dinner with stunning sunset views.",
        "Candolim is often considered one of the best beaches for travelers seeking comfort, accessibility, and vibrant yet manageable activity.",
      ],
      bestFor: ["Beachside relaxation", "Sunset views"],
    },
    {
      id: "calangute-beach",
      name: "Calangute Beach",
      image: BEACH_IMAGES.calangute,
      subtitle: "The Queen of Beaches",
      distance: "Approximately 6–8 km",
      travelTime: "15–20 minutes",
      vibe: "Lively",
      paragraphs: [
        "Often referred to as the \"Queen of Beaches,\" Calangute is among Goa's most famous destinations. Its vast shoreline attracts visitors from around the world and serves as the heart of North Goa's tourism scene.",
        "The beach is lined with restaurants, shopping stalls, beach shacks, and entertainment options, creating a lively atmosphere throughout the day and evening.",
        "For first-time visitors to Goa, Calangute offers an energetic introduction to the state's vibrant beach culture.",
      ],
      bestFor: ["First-time visitors"],
    },
    {
      id: "baga-beach",
      name: "Baga Beach",
      image: BEACH_IMAGES.baga,
      subtitle: "Goa's Entertainment Capital",
      distance: "Approximately 9.5–9.7 km",
      travelTime: "20–30 minutes",
      vibe: "Nightlife",
      paragraphs: [
        "Located just north of Calangute, Baga Beach is renowned for its vibrant nightlife and energetic atmosphere.",
        "By day, visitors enjoy parasailing, jet skiing, and other water sports. As evening approaches, the beach transforms into one of Goa's most active entertainment hubs, with music, dining, and nightlife drawing visitors from across the region.",
        "Popular beach clubs, live performances, and waterfront dining make Baga a favorite among travelers looking for excitement after sunset.",
      ],
      bestFor: ["Water sports"],
    },
    {
      id: "anjuna-beach",
      name: "Anjuna Beach",
      image: BEACH_IMAGES.anjuna,
      subtitle: "Goa's Bohemian Soul",
      distance: "Approximately 11–12 km",
      travelTime: "25–30 minutes",
      vibe: "Cultural",
      paragraphs: [
        "Anjuna Beach remains one of Goa's most iconic destinations thanks to its rich cultural heritage and laid-back atmosphere.",
        "Known for its rocky coastline, dramatic sea views, and famous Wednesday Flea Market, Anjuna continues to attract travelers seeking unique experiences, local crafts, and a creative spirit that traces back to Goa's hippie era.",
        "The beach offers a distinctive blend of culture, music, and coastal beauty unlike anywhere else in Goa.",
      ],
      bestFor: ["Flea markets", "Culture", "Photography", "Sunset views"],
    },
    {
      id: "vagator-beach",
      name: "Vagator Beach",
      image: BEACH_IMAGES.vagator,
      subtitle: "Red Cliffs and Stunning Sunsets",
      distance: "Approximately 15 km",
      travelTime: "30–40 minutes",
      vibe: "Scenic",
      paragraphs: [
        "Vagator is often regarded as one of Goa's most visually striking beaches.",
        "Towering red laterite cliffs overlook the Arabian Sea, creating dramatic scenery that becomes especially beautiful during sunset. The beach is also home to several well-known restaurants and beach clubs that have become landmarks in Goa's hospitality scene.",
        "Its elevated viewpoints offer some of the most memorable coastal panoramas in the state.",
      ],
      bestFor: ["Sunsets", "Photography", "Beach clubs", "Scenic views"],
    },
    {
      id: "mandrem-ashwem",
      name: "Mandrem & Ashwem",
      image: BEACH_IMAGES.mandremAshwem,
      subtitle: "Serenity by the Sea",
      distance: "Approximately 20–25 km",
      travelTime: "Around 50–60 minutes",
      vibe: "Wellness",
      paragraphs: [
        "Further north, Mandrem and Ashwem represent some of Goa's most peaceful and unspoiled beaches.",
        "These stretches of coastline are known for their clean sands, calm atmosphere, boutique cafés, wellness retreats, and yoga experiences. Unlike the bustling beaches of central North Goa, Mandrem and Ashwem offer a slower, more contemplative pace.",
        "They are ideal for travelers seeking relaxation, mindfulness, and uninterrupted ocean views.",
      ],
      bestFor: ["Yoga", "Wellness retreats", "Couples", "Quiet relaxation"],
    },
    {
      id: "morjim-beach",
      name: "Morjim Beach",
      image: BEACH_IMAGES.morjim,
      subtitle: "Nature's Coastal Sanctuary",
      distance: "Approximately 21–23 km",
      travelTime: "45–50 minutes",
      vibe: "Peaceful",
      paragraphs: [
        "Morjim Beach offers a quieter alternative to Goa's more commercial destinations.",
        "Its wide shoreline and peaceful surroundings have made it popular among travelers seeking tranquility. The beach is particularly significant as a nesting ground for the endangered Olive Ridley turtles, making it one of Goa's most ecologically important coastal areas.",
        "The combination of natural beauty and conservation efforts creates a unique experience for visitors.",
      ],
      bestFor: ["Nature lovers", "Birdwatching", "Peaceful escapes"],
    },
    {
      id: "arambol-beach",
      name: "Arambol Beach",
      image: BEACH_IMAGES.arambol,
      subtitle: "Goa's Free-Spirited Retreat",
      distance: "Approximately 30 km",
      travelTime: "Around 60 minutes",
      vibe: "Alternative",
      paragraphs: [
        "Located in North Goa, Arambol has earned a reputation as one of the state's most distinctive and artistic beach destinations.",
        "Known for its relaxed atmosphere, paragliding opportunities, freshwater lake, and vibrant community gatherings, Arambol attracts travelers looking for experiences beyond traditional tourism.",
        "Evenings often bring music, performances, and informal gatherings along the shoreline, creating a uniquely welcoming atmosphere.",
      ],
      bestFor: [
        "Wellness",
        "Creativity",
        "Paragliding",
        "Alternative travel experiences",
      ],
    },
  ] as BeachGuideEntry[],
  quickPick: [
    { mood: "For relaxation", beaches: "Coco, Morjim, Mandrem, Ashwem" },
    { mood: "For history and scenery", beaches: "Sinquerim, Vagator" },
    { mood: "For dining and leisure", beaches: "Candolim" },
    { mood: "For shopping and activity", beaches: "Calangute" },
    { mood: "For nightlife", beaches: "Baga" },
    { mood: "For culture and markets", beaches: "Anjuna" },
    { mood: "For wellness and slow travel", beaches: "Arambol, Mandrem, Ashwem" },
  ],
  outro:
    "Whether you prefer quiet mornings by the sea, adventurous water sports, cultural exploration, or vibrant nightlife, Goa's beaches offer experiences that continue to captivate travelers from around the world. Staying at Nivaãra by GHD Hotels in Nerul puts many of these iconic destinations just a short drive away, making every day an opportunity to discover a new side of Goa's coastline.",
} as const;
