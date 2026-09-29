export type NightlifeSpot = {
  id: string;
  name: string;
  location: string;
  /** Short line that frames the kind of night this place offers */
  vibe: string;
  paragraphs: readonly string[];
  bestFor: string;
};

export const NIGHTLIFE_BLOG = {
  meta: {
    region: "North Goa",
    guideType: "Travel Guide",
    spotsCovered: "10 nightlife spots",
    baseLocation: "Base is in Nerul, near Coco Beach",
    readTime: "10 min read",
  },
  intro: [
    "There is a moment in Goa when the day starts giving way to the night. The beaches grow quieter, the streets begin to glow, music starts travelling through the air, and suddenly everyone seems to ask the same question: where are we going tonight?",
    "If you are staying in North Goa, you are spoilt for choice. From legendary beachside spots and buzzing nightclubs to riverside parties and laid-back village pubs, the nightlife here can be whatever you want it to be.",
    "Instead of scrolling through endless options, here are ten shacks, clubs and nightlife spots across North Goa worth knowing about. Some are made for dancing. Some are made for drinks. Some are made for music. And some are simply made for enjoying the Goa night.",
  ],
  spots: [
    {
      id: "club-titos",
      name: "Club Titos",
      location: "Baga",
      vibe: "The classic Goa nightclub night",
      paragraphs: [
        "If you have heard people talk about nightlife in Goa, you have almost certainly heard the name Club Titos. Located in Baga, it is one of the most recognisable names on the North Goa nightlife circuit.",
        "The atmosphere is energetic, the music keeps the night moving, and the venue draws people looking for a classic Goa club experience — DJ sets, dancing, drinks and a lively crowd. When Baga is where you want to begin, Titos is a name that comes up again and again.",
      ],
      bestFor: "Dancing, DJ nights and a lively crowd",
    },
    {
      id: "cafe-mambo",
      name: "Café Mambo",
      location: "Baga",
      vibe: "A night with a beachside feel",
      paragraphs: [
        "Want your evening to keep a little of the coast in it? Head towards Café Mambo. Also in Baga, it blends the energy of a nightlife venue with the atmosphere of Goa's shoreline.",
        "It is the kind of place where the evening can start with drinks and conversation before gradually turning into something more energetic. Being in Baga also means you are already surrounded by places to continue the night.",
      ],
      bestFor: "Beachfront nightlife, drinks and music",
    },
    {
      id: "hammerzz",
      name: "Hammerzz Nightclub",
      location: "Baga",
      vibe: "For nights that refuse to end early",
      paragraphs: [
        "Another major name on Baga's nightlife strip is Hammerzz — built for travellers who want music, drinks and dancing at the centre of the evening.",
        "If you are with a group of friends and everyone is looking for a proper night out, this is one venue to have on your list. The high-energy club atmosphere is exactly what North Goa is famous for.",
      ],
      bestFor: "Dancing, nightlife and late evenings",
    },
    {
      id: "sinq",
      name: "Sinq Night Club",
      location: "Candolim",
      vibe: "A polished poolside evening",
      paragraphs: [
        "Moving a little south from Baga brings you to Candolim, where Sinq Night Club offers a more stylish take on the night.",
        "Its poolside setting adds something different to the traditional club experience — a good option when your ideal evening starts with dinner or drinks and gradually turns into music and dancing.",
      ],
      bestFor: "Poolside nightlife, music and a more polished evening",
    },
    {
      id: "lpk-waterfront",
      name: "LPK Waterfront",
      location: "Nerul",
      vibe: "When the setting becomes part of the night",
      paragraphs: [
        "Not every great night in Goa has to happen beside the beach. At LPK Waterfront in Nerul, the riverside setting itself becomes part of the experience.",
        "The venue brings together music, dancing and a lively atmosphere along the water. For travellers staying around Nerul, Candolim or nearby areas, it is also a welcome alternative to heading straight into the Baga party circuit.",
      ],
      bestFor: "Riverside nightlife, dancing and music",
    },
    {
      id: "club-ruskii",
      name: "Club Ruskii",
      location: "Arpora",
      vibe: "Clubbing with live energy",
      paragraphs: [
        "Looking for somewhere around Arpora? Put Club Ruskii on your list. With live performances, dancing and an energetic evening atmosphere, it is another option for travellers who want the clubbing side of North Goa.",
        "Arpora's location also makes it convenient for exploring other nightlife areas, so you do not have to commit to one corner of North Goa for the entire night.",
      ],
      bestFor: "Clubbing, live performances and dancing",
    },
    {
      id: "vagalumme",
      name: "VAGALUMME",
      location: "Arpora",
      vibe: "Live music and a party atmosphere",
      paragraphs: [
        "Also in Arpora, VAGALUMME offers another take on the North Goa nightlife experience — live music, performances and an evening with a little more energy.",
        "It is the kind of venue where checking what is on for the particular night you visit can make the experience even more interesting.",
      ],
      bestFor: "Live music, performances and nightlife",
    },
    {
      id: "las-olas",
      name: "Las Olas",
      location: "Baga",
      vibe: "Beachside evenings before the clubs",
      paragraphs: [
        "Not every night needs to begin inside a nightclub. At Las Olas, the beachside setting gives the evening a more relaxed Goa feel while keeping you close to the nightlife action.",
        "It is a strong option when your group wants food, drinks, music and the beach — rather than spending the entire evening on a dance floor. And once you are ready, Baga's clubs are right outside.",
      ],
      bestFor: "Beachside evenings, food, drinks and music",
    },
    {
      id: "mayan-beach-club",
      name: "Mayan Beach Club",
      location: "Anjuna",
      vibe: "Anjuna's slower, coastal night",
      paragraphs: [
        "Then there is Anjuna — known for its distinctive beach culture and a nightlife personality that feels different from the busy Baga strip.",
        "Mayan Beach Club is one of the places to consider if you want a beach-oriented night with music, drinks and a more relaxed coastal setting. This is the side of Goa where you can take things a little slower and simply enjoy being by the sea.",
      ],
      bestFor: "Beach club atmosphere, music and a relaxed night",
    },
    {
      id: "soro-village-pub",
      name: "Soro – The Village Pub",
      location: "Siolim",
      vibe: "When you want conversation, not a dance floor",
      paragraphs: [
        "And finally, step away from the big clubs. Sometimes you do not want a dance floor — you want good food, a drink, music and a table where friends can sit for hours talking about everything and nothing.",
        "Located in Siolim, Soro – The Village Pub has a more relaxed pub atmosphere and offers a welcome alternative to North Goa's louder venues. Ideal for those nights when you want to enjoy Goa without turning the volume all the way up.",
      ],
      bestFor: "Food, drinks, music and a relaxed evening",
    },
  ] as const satisfies readonly NightlifeSpot[],
  chooseByMood: [
    {
      mood: "Want to dance?",
      picks: "Club Titos, Hammerzz or Club Ruskii",
    },
    {
      mood: "Want a beachside atmosphere?",
      picks: "Café Mambo, Las Olas or Mayan Beach Club",
    },
    {
      mood: "Want something a little different?",
      picks: "LPK Waterfront for its riverside setting",
    },
    {
      mood: "Want a stylish night out?",
      picks: "Sinq in Candolim",
    },
    {
      mood: "Want live music and performances?",
      picks: "VAGALUMME or Club Ruskii",
    },
    {
      mood: "Want something relaxed?",
      picks: "Soro – The Village Pub",
    },
  ],
  outro: {
    title: "One night. Ten possibilities.",
    paragraphs: [
      "That is the fun of North Goa. You can start with dinner, wander towards the beach, stop for a drink, find some music and suddenly realise it is much later than you thought.",
      "Maybe tonight is a nightclub night. Maybe it is a beach shack night. Maybe it is a riverside night. Maybe it is simply sitting with friends and watching Goa pass by.",
      "Whatever you choose, North Goa after sunset has a way of making ordinary evenings feel like holidays. And when you are staying in Nerul, you have a convenient base from which to explore different sides of that nightlife.",
      "After the music, the lights and the late-night adventures, you can head back to Nivaãra by GHD Hotels, settle into your studio and get ready to do it all over again tomorrow.",
      "Because in Goa, the night is never just the night. It is part of the experience.",
    ],
    ctaLabel: "Explore stays at Nivaãra",
    ctaHref: "/nivaara",
  },
} as const;
