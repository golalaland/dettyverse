/**
 * DETTYVERSE — Editorial Sample Content
 * Realistic, atmospheric content for the prototype.
 * In production these would come from a CMS / protected media store.
 */

const DETTY = {
  creator: {
    name: "Detty",
    handle: "@dettyverse",
    title: "Photographer · Filmmaker · Archivist",
    bio: "Working between Lagos, London and the spaces in between. Interested in the private image, the unfinished film, the late-night note. DETTYVERSE is the public face of a much larger private archive.",
    longBio: `There is a version of this work that never leaves the hard drives. The public selection is only the surface.\n\nI photograph at night because the day feels too negotiated. Film because it refuses to hurry. Writing because some images still need a voice.\n\nDETTYVERSE exists so that the people who already understand can go further. Membership is not a subscription. It is a key.`,
    location: "Lagos · London",
    email: "private@dettyverse.com"
  },

  membership: {
    price: 99.99,
    currency: "USD",
    period: "1 MONTH",
    name: "Private Access",
    description: "Full entry to the private archive, unreleased film cuts, extended journal entries, and member-only drops.",
    perks: [
      "Complete photography archive (including unreleased sets)",
      "Full-length film cuts & behind-the-scenes reels",
      "Extended journal entries & private notes",
      "Early access to digital drops & limited editions",
      "Member-only correspondence & seasonal letters",
      "Direct access channel (when open)"
    ]
  },

  photography: [
    {
      id: "ph-001",
      title: "After the Club, Before the Light",
      year: "2025",
      location: "Lagos Island",
      series: "Nocturne",
      locked: false,
      cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80"
      ],
      excerpt: "The last light on the concrete. Bodies still carrying the bass.",
      body: "Shot over three consecutive nights in the same corridor. The red was not added in post. It was already in the room."
    },
    {
      id: "ph-002",
      title: "Private Room, Public Silence",
      year: "2024",
      location: "London",
      series: "Interiors",
      locked: true,
      cover: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
      images: [],
      excerpt: "A room that exists only after midnight.",
      body: "Members only. The full set lives behind the door."
    },
    {
      id: "ph-003",
      title: "Hands at the Threshold",
      year: "2025",
      location: "Unspecified",
      series: "Contact",
      locked: false,
      cover: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1600&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=80"
      ],
      excerpt: "What remains when the music stops.",
      body: "Part of an ongoing study of gesture under low light."
    },
    {
      id: "ph-004",
      title: "Crimson Corridor",
      year: "2023",
      location: "Lagos",
      series: "Nocturne",
      locked: true,
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
      images: [],
      excerpt: "The longest hallway in the building.",
      body: "Unreleased. Available to members."
    },
    {
      id: "ph-005",
      title: "Portrait with Smoke",
      year: "2025",
      location: "Studio",
      series: "Sitters",
      locked: false,
      cover: "https://images.unsplash.com/photo-1534528741775-53994d69daeb?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994d69daeb?w=1600&q=80"
      ],
      excerpt: "One of the few daylight frames that survived the edit.",
      body: "The sitter asked not to be named. The smoke was real."
    },
    {
      id: "ph-006",
      title: "Night Market Geometry",
      year: "2024",
      location: "Lagos",
      series: "Street",
      locked: true,
      cover: "https://images.unsplash.com/photo-1558618047-f4dcec0b2c0d?w=1200&q=80",
      images: [],
      excerpt: "Geometry under sodium and neon.",
      body: "Full sequence locked."
    }
  ],

  films: [
    {
      id: "fl-001",
      title: "Red Hour",
      year: "2025",
      duration: "12:40",
      type: "Short",
      locked: false,
      cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
      excerpt: "A single continuous take through a building that no longer exists in the same form.",
      body: "Shot on expired stock. The red shift is chemical, not digital. Sound recorded on location and left largely unprocessed.",
      stills: [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80",
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&q=80"
      ]
    },
    {
      id: "fl-002",
      title: "Correspondence (Unreleased Cut)",
      year: "2024",
      duration: "28:15",
      type: "Medium",
      locked: true,
      cover: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
      excerpt: "Letters that were never sent, read in rooms that no longer belong to anyone.",
      body: "The full cut is available only to members. A public teaser exists below the fold.",
      stills: []
    },
    {
      id: "fl-003",
      title: "Bassline / Afterimage",
      year: "2025",
      duration: "07:22",
      type: "Short",
      locked: false,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
      excerpt: "What the body remembers after the speakers go quiet.",
      body: "Collaborative piece with a sound designer who prefers to remain unnamed in public credits.",
      stills: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80"
      ]
    },
    {
      id: "fl-004",
      title: "The Private Reel",
      year: "2023–25",
      duration: "41:00",
      type: "Compilation",
      locked: true,
      cover: "https://images.unsplash.com/photo-1518676590629-3dcbd9c1a82e?w=1200&q=80",
      excerpt: "Fragments never intended for public screening.",
      body: "Members only. Updated seasonally.",
      stills: []
    }
  ],

  journal: [
    {
      id: "jn-001",
      title: "Notes from a Closed Room",
      date: "2025-11-14",
      locked: false,
      excerpt: "The difference between privacy and secrecy is the quality of the light.",
      body: `I have been thinking about the rooms that only exist after a certain hour.\n\nThere is a quality of attention that arrives only when the rest of the building has gone quiet. The camera becomes less of a device and more of a witness. The red light is not an aesthetic choice; it is what the room already contains.\n\nMost of what is made in those hours does not leave. That is not a marketing strategy. It is simply how the work wants to live.\n\nMembership is one way of saying: some of it can travel further, but only to people who already understand the terms.`,
      tags: ["process", "night", "privacy"]
    },
    {
      id: "jn-002",
      title: "On the Unreleased Cut",
      date: "2025-09-02",
      locked: true,
      excerpt: "Why the longer version stays behind the door.",
      body: "Extended reflection available to members. The public note stops here.",
      tags: ["film", "archive"]
    },
    {
      id: "jn-003",
      title: "Lagos After Midnight",
      date: "2025-07-28",
      locked: false,
      excerpt: "The city changes register. The work follows.",
      body: `There is a particular silence that belongs only to certain districts after the generators have settled into their night pattern.\n\nI have been returning to the same three locations for almost two years. The photographs are not documentation. They are closer to correspondence — messages left for a future version of the same place.\n\nThe public selection is the polite version. The rest stays in the private ledger.`,
      tags: ["lagos", "place", "time"]
    },
    {
      id: "jn-004",
      title: "Letter to a Future Member",
      date: "2025-12-01",
      locked: true,
      excerpt: "What the membership actually buys.",
      body: "Private correspondence. Unlocked for active members.",
      tags: ["membership", "letter"]
    },
    {
      id: "jn-005",
      title: "Working with Expired Stock",
      date: "2025-05-19",
      locked: false,
      excerpt: "The chemical red that cannot be faked.",
      body: `I keep a small freezer of film that should not still be usable. The colour shift is unpredictable and often ugly in a way that digital tools try too hard to imitate.\n\nThe last batch produced a crimson that felt closer to memory than to accuracy. That is the register I want to stay inside.`,
      tags: ["process", "film", "material"]
    }
  ],

  store: [
    {
      id: "st-001",
      title: "Nocturne — Digital Print Set",
      price: 48,
      type: "Digital",
      locked: false,
      cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      description: "Five high-resolution frames from the Nocturne series. Instant download. Personal use.",
      memberPrice: 28
    },
    {
      id: "st-002",
      title: "Red Hour — Limited Edition Still",
      price: 120,
      type: "Print",
      locked: false,
      cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
      description: "Archival pigment print, 12×18\", edition of 25. Signed and numbered.",
      memberPrice: 90
    },
    {
      id: "st-003",
      title: "Private Ledger — PDF Volume I",
      price: 35,
      type: "Digital",
      locked: true,
      cover: "https://images.unsplash.com/photo-1456513080800-b92477f62097?w=800&q=80",
      description: "Selected journal entries, contact sheets, and process notes. Members receive this as part of access.",
      memberPrice: 0
    },
    {
      id: "st-004",
      title: "Bassline / Afterimage — Soundtrack",
      price: 18,
      type: "Audio",
      locked: false,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      description: "Original score and field recordings from the short film. WAV + MP3.",
      memberPrice: 12
    }
  ],

  archiveItems: [
    { id: "ar-01", type: "photo", title: "After the Club", year: "2025", locked: false, ref: "ph-001" },
    { id: "ar-02", type: "film", title: "Red Hour", year: "2025", locked: false, ref: "fl-001" },
    { id: "ar-03", type: "journal", title: "Notes from a Closed Room", year: "2025", locked: false, ref: "jn-001" },
    { id: "ar-04", type: "photo", title: "Private Room", year: "2024", locked: true, ref: "ph-002" },
    { id: "ar-05", type: "film", title: "Correspondence", year: "2024", locked: true, ref: "fl-002" },
    { id: "ar-06", type: "photo", title: "Hands at the Threshold", year: "2025", locked: false, ref: "ph-003" },
    { id: "ar-07", type: "journal", title: "On the Unreleased Cut", year: "2025", locked: true, ref: "jn-002" },
    { id: "ar-08", type: "film", title: "Bassline / Afterimage", year: "2025", locked: false, ref: "fl-003" },
    { id: "ar-09", type: "photo", title: "Crimson Corridor", year: "2023", locked: true, ref: "ph-004" },
    { id: "ar-10", type: "journal", title: "Lagos After Midnight", year: "2025", locked: false, ref: "jn-003" },
    { id: "ar-11", type: "photo", title: "Portrait with Smoke", year: "2025", locked: false, ref: "ph-005" },
    { id: "ar-12", type: "film", title: "The Private Reel", year: "2023–25", locked: true, ref: "fl-004" }
  ]
};
