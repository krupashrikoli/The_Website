/**
 * Culture & Careers page copy and media.
 * Swap image paths here when new photography is available.
 */

export const CULTURE_PAGE = {
  hero: {
    eyebrow: "Belonging",
    headline: "Where everyone has a place.",
    paragraph:
      "At GHD Hotels, we believe the best hospitality starts with how we make people feel. Belonging is at the heart of our culture—creating an environment where our guests, colleagues, and partners feel welcomed, respected, valued, and genuinely part of something.",
    image: "/images/corporate/ghd-team-hands-joined.webp",
    imageAlt: "Hands joined together — a moment of belonging",
  },
  meaning: {
    headline: "Belonging is more than feeling welcome.",
    paragraphs: [
      "It is feeling seen. Feeling valued. Feeling comfortable being yourself. Feeling that you are part of something.",
      "At GHD, we want this feeling to exist at every level—from the way our teams work together to the way we welcome a guest through the door.",
    ],
    emphases: ["Seen.", "Valued.", "Connected.", "Included."],
    image: "/images/corporate/ghd-team-hands-joined.webp",
    imageAlt: "A quiet moment of human connection",
  },
  inAction: {
    headline: "Our Culture in Action",
    supporting:
      "Belonging comes to life in the way we think, work, care, and celebrate together.",
    principles: [
      {
        number: "01",
        title: "We Care",
        body: "We take genuine care of our guests, our colleagues, and the places we call home.",
      },
      {
        number: "02",
        title: "We Connect",
        body: "Hospitality begins with human connection. We listen, engage, and make people feel seen.",
      },
      {
        number: "03",
        title: "We Own It",
        body: "We take responsibility, act with integrity, and take pride in what we do.",
      },
      {
        number: "04",
        title: "We Keep Growing",
        body: "We stay curious, learn from one another, and constantly look for ways to make things better.",
      },
      {
        number: "05",
        title: "We Celebrate",
        body: "We create moments worth remembering—for our guests and for each other.",
      },
    ],
  },
  people: {
    headline: "Our People Make the Difference",
    paragraphs: [
      "Behind every memorable stay is a team that cares. We believe great hospitality comes from people who feel valued, empowered, and connected to what they do.",
      "At GHD Hotels, we want to create an environment where people can grow, contribute, bring their individuality, and build something they are proud to be part of.",
    ],
    statement: "People first. Hospitality always.",
  },
  guests: {
    headline: "Because Belonging Is Felt",
    paragraphs: [
      "We want every guest to feel more than welcomed. We want them to feel comfortable, understood, and at ease.",
      "Whether they come to stay, dine, celebrate, explore, or simply spend time with us, we want every interaction to feel genuine and every visit to feel personal.",
    ],
  },
  place: {
    headline: "Belonging to a Place",
    paragraph:
      "Every GHD destination is part of a larger community. We believe in respecting the character of each place, celebrating what makes it unique, and contributing positively to the communities around us.",
  },
  closing: {
    headline: "A Culture People Want to Belong To.",
    paragraph:
      "For us, hospitality isn't just about making people feel welcome. It's about making them feel they belong.",
    signature: "That's GHD.",
    cta: { label: "Want to be part of it? Meet us.", href: "/careers" },
  },
} as const;

export const CAREERS_PAGE = {
  hero: {
    headline: "Come build something worth belonging to.",
    paragraph:
      "We are building more than hotels. We are building destinations, experiences, and a culture people are proud to be part of.",
    image: "/images/nivaara/nivaara-lobby-lounge.webp",
    imageAlt: "Hospitality team spaces at GHD Hotels",
    primaryCta: {
      label: "Send Your CV",
      href: "mailto:talent@ghdhotels.in?subject=Application%20—%20GHD%20Hotels",
    },
  },
  why: {
    headline: "Why GHD?",
    paragraphs: [
      "GHD Hotels is growing, and so is the opportunity to shape what comes next.",
      "We are creating distinctive destinations across India, and we believe the people behind them are what make them truly special.",
      "Here, you will have the opportunity to learn, contribute, take ownership, work with passionate people, and help build a hospitality brand from the ground up.",
    ],
    values: [
      {
        title: "Be Yourself",
        body: "Bring your personality, perspective, and ideas.",
      },
      {
        title: "Make an Impact",
        body: "Take ownership and make a difference in the experience we create.",
      },
      {
        title: "Grow With Us",
        body: "Learn, experiment, develop, and build your career alongside a growing brand.",
      },
      {
        title: "Belong",
        body: "Be part of a team where people support one another and everyone has a place.",
      },
    ],
  },
  grow: {
    headline: "Your next chapter could start here.",
    paragraphs: [
      "Whether you're beginning your career, bringing years of experience, or looking for something new, there is a place for you at GHD Hotels.",
      "We are looking for curious minds, warm people, creative thinkers, skilled professionals, and those who simply care about doing great work.",
    ],
    statement: ["Bring your talent.", "We'll build the rest together."],
  },
  apply: {
    headline: "Want to be part of GHD?",
    paragraph:
      "We may not always have a position listed for you, but we're always interested in meeting talented people who believe in what we're building.",
    cta: {
      label: "Send Us Your CV",
      href: "mailto:talent@ghdhotels.in?subject=Application%20—%20GHD%20Hotels",
    },
    email: "talent@ghdhotels.in",
    supporting:
      "Tell us a little about yourself, what you do best, and why you'd like to be part of GHD Hotels.",
  },
  contact: {
    headline: "Want to speak with our team?",
    paragraph:
      "Have a question about opportunities at GHD Hotels? We'd love to hear from you.",
    phoneDisplay: "8390020409",
    whatsappHref: "https://wa.me/918390020409",
    ctaLabel: "Reach Us",
  },
  closing: {
    lines: ["Come as you are.", "Grow with us.", "Belong here."],
    brand: "GHD Hotels",
    image: "/images/brands/samraya-resort-view.webp",
    imageAlt: "A GHD destination at golden hour",
  },
} as const;
