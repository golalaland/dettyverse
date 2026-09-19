/* ============================================
   DETTYVERSE — MOCK CONTENT LAYER
   TODO(backend): Replace this entire file with API calls to your
   CMS/database. Suggested endpoints:
     GET /api/photos?visibility=public&category=...
     GET /api/films
     GET /api/stories
     GET /api/products
     GET /api/member/session
   Visibility filtering (public vs members) MUST be re-checked
   server-side on every protected asset request — never trust this
   client-side array to gate real media. See auth.js for the
   simulated session used only to drive prototype UI states.
   ============================================ */

const DV = window.DV || {};

/* ---------- PHOTOGRAPHY ARCHIVE ---------- */
DV.photos = [
  {
    id: "p01", title: "Night Seven", category: "Portraiture",
    date: "2026", visibility: "public",
    img: "https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=1400",
    ratio: "portrait",
    desc: "A single frame from a longer session shot on the seventh night of a Lisbon residency. Tungsten light, no fill.",
  },
  {
    id: "p02", title: "Red Room, Marseille", category: "Editorial",
    date: "2026", visibility: "members",
    img: "https://images.unsplash.com/photo-1483118714900-540cf339fd46?q=80&w=1400",
    ratio: "landscape",
    desc: "Shot for a private commission that never ran. Kept for the archive instead.",
  },
  {
    id: "p03", title: "Interior, After Two", category: "Visual Diary",
    date: "2026", visibility: "public",
    img: "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?q=80&w=1400",
    ratio: "square",
    desc: "An apartment in the 9th, borrowed for a week. This is what it looked like at the end of most nights.",
  },
  {
    id: "p04", title: "Smoke & Neon", category: "Nightlife",
    date: "2025", visibility: "members",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1400",
    ratio: "portrait",
    desc: "Backstage at a club that closed the following spring.",
  },
  {
    id: "p05", title: "The Waiting Room", category: "Editorial",
    date: "2026", visibility: "public",
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1400",
    ratio: "landscape",
    desc: "A study in stillness before a shoot begins.",
  },
  {
    id: "p06", title: "Private Study No. 3", category: "Portraiture",
    date: "2026", visibility: "members",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400",
    ratio: "portrait",
    desc: "Part of an ongoing series never intended for public release.",
  },
  {
    id: "p07", title: "Two A.M., Somewhere", category: "Nightlife",
    date: "2025", visibility: "public",
    img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1400",
    ratio: "square",
    desc: "There is a version of every city that only exists after midnight.",
  },
  {
    id: "p08", title: "Velvet & Static", category: "Editorial",
    date: "2026", visibility: "members",
    img: "https://images.unsplash.com/photo-1533373232797-56321a0ea63b?q=80&w=1400",
    ratio: "landscape",
    desc: "Commissioned, then withheld. Now part of the private archive.",
  },
  {
    id: "p09", title: "The Long Hallway", category: "Visual Diary",
    date: "2026", visibility: "public",
    img: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=1400",
    ratio: "portrait",
    desc: "Hotel corridors have a particular kind of silence.",
  },
  {
    id: "p10", title: "Untitled, Berlin", category: "Portraiture",
    date: "2025", visibility: "members",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400",
    ratio: "square",
    desc: "One of six frames from a roll that was nearly lost.",
  },
  {
    id: "p11", title: "Low Light Study", category: "Editorial",
    date: "2026", visibility: "public",
    img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1400",
    ratio: "landscape",
    desc: "Available light only. No corrections in post.",
  },
  {
    id: "p12", title: "After the Party", category: "Nightlife",
    date: "2026", visibility: "members",
    img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1400",
    ratio: "portrait",
    desc: "The hour when everyone stops performing.",
  },
];

/* ---------- CLIPS (formerly "film") ----------
   `orientation` drives the native-aspect-ratio wall in clips.html —
   portrait clips stay portrait, landscape clips stay landscape. */
DV.films = [
  {
    id: "f01", title: "Room Nine", duration: "06:42", category: "Short Film",
    date: "2026", visibility: "members", orientation: "portrait",
    thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000",
    desc: "A quiet, uninterrupted six minutes shot in a single room over a single night.",
  },
  {
    id: "f02", title: "Red Light", duration: "03:18", category: "Visual Study",
    date: "2026", visibility: "public", orientation: "landscape",
    thumb: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1400",
    desc: "A short study in color and movement, shot handheld on film.",
  },
  {
    id: "f03", title: "After Midnight", duration: "11:02", category: "Documentary",
    date: "2025", visibility: "members", orientation: "landscape",
    thumb: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1400",
    desc: "Following a single night across three cities. Unreleased until now.",
  },
  {
    id: "f04", title: "Interior Monologue", duration: "04:55", category: "Short Film",
    date: "2026", visibility: "public", orientation: "portrait",
    thumb: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1000",
    desc: "A voice, a room, and very little else.",
  },
  {
    id: "f05", title: "The Last Set", duration: "08:14", category: "Documentary",
    date: "2025", visibility: "members", orientation: "square",
    thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200",
    desc: "The final performance at a venue before it closed for good.",
  },
  {
    id: "f06", title: "Night Drive", duration: "05:30", category: "Visual Study",
    date: "2026", visibility: "public", orientation: "landscape",
    thumb: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400",
    desc: "No dialogue. Just the city, moving past.",
  },
  {
    id: "f07", title: "Two Flights Up", duration: "02:47", category: "Visual Study",
    date: "2026", visibility: "public", orientation: "portrait",
    thumb: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=1000",
    desc: "Shot from a stairwell that no longer exists.",
  },
  {
    id: "f08", title: "Static Hours", duration: "09:31", category: "Documentary",
    date: "2025", visibility: "members", orientation: "landscape",
    thumb: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1400",
    desc: "The hours between the last guest leaving and the sun coming up.",
  },
];

/* ---------- STORIES / JOURNAL ---------- */
DV.stories = [
  {
    id: "s01", title: "On Collecting Nights", category: "Thoughts",
    date: "September 2026", visibility: "public", featured: true,
    cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1600",
    excerpt: "There is a difference between remembering a night and keeping it. This is an attempt to explain the difference, and why the archive exists at all.",
    body: [
      "I started keeping this archive for a stupid reason: I didn't trust my own memory. Nights blur together faster than you'd think, and I got tired of losing the good ones to the blur.",
      "So I started writing things down, and photographing things, and eventually filming things, not because I thought anyone else would care, but because I wanted proof that a particular version of a particular evening had actually happened.",
      "What I didn't expect was how much the practice would change the way I move through a night. You watch more closely when you know you'll need to describe it later. You notice the color of the light. You notice who's paying attention to whom.",
      "This is the first entry in what I suspect will be a very long, very uneven record. Some nights deserve a paragraph. Some deserve nothing at all. I'm still working out which is which.",
    ],
  },
  {
    id: "s02", title: "A Room in Marseille", category: "Places",
    date: "August 2026", visibility: "members",
    cover: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600",
    excerpt: "Some rooms hold onto a version of you that the rest of the world never gets to see.",
    body: [
      "The apartment belonged to a friend of a friend, the kind of arrangement that only works because nobody involved expects anything from anyone else.",
      "I stayed for eleven days. I photographed almost none of them properly — most of what exists from that week is unusable, out of focus, badly lit. The handful of frames that survived are the ones in this entry.",
      "I've thought about that room more than almost anywhere else I've stayed. I don't fully know why. Maybe it's just that I was paying closer attention than usual.",
    ],
  },
  {
    id: "s03", title: "People Worth Remembering", category: "People",
    date: "July 2026", visibility: "public",
    cover: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600",
    excerpt: "A short, incomplete list of people who changed how I see, none of whom asked to be included here.",
    body: [
      "I'm not going to use real names. That's not coyness — it's just that the people who matter most to this archive were never trying to be in it.",
      "There was a bartender in Naples who talked for forty minutes about light without ever once using the word 'light.' There was a stranger on a train who fell asleep against my shoulder and apologized for it with more grace than most people manage when fully awake.",
      "None of this is dramatic. That's sort of the point.",
    ],
  },
  {
    id: "s04", title: "Notes From the Last Set", category: "Nights",
    date: "June 2026", visibility: "members",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600",
    excerpt: "The venue closed the following week. Nobody in the room knew it yet.",
    body: [
      "You could tell something was ending, even if nobody said it out loud. The set ran forty minutes longer than scheduled. Nobody complained.",
      "I filmed about eleven minutes of it before my battery died, which felt, in retrospect, like the correct amount.",
    ],
  },
  {
    id: "s05", title: "A Discovery, Unannounced", category: "Discoveries",
    date: "May 2026", visibility: "public",
    cover: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1600",
    excerpt: "A small, specific recommendation with no context attached.",
    body: [
      "I won't explain how I found this place. Some things are better left slightly mysterious, and this is one of the few instances where I intend to keep it that way.",
    ],
  },
  {
    id: "s06", title: "On Being Photographed", category: "Thoughts",
    date: "April 2026", visibility: "members",
    cover: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600",
    excerpt: "Notes on the other side of the camera, where I spend far less time than people assume.",
    body: [
      "Every so often someone points a camera back at me, and I'm reminded how strange it is to be the subject rather than the author of an image.",
    ],
  },
];

/* ---------- STORE ---------- */
DV.products = [
  {
    id: "pr01", title: "Night Seven — Collection", price: 42,
    cover: "https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=1200",
    desc: "38 frames from the Lisbon residency, full resolution, unedited sequencing.",
    type: "Photo Collection",
  },
  {
    id: "pr02", title: "The Private Archive, Vol. I", price: 68,
    cover: "https://images.unsplash.com/photo-1483118714900-540cf339fd46?q=80&w=1200",
    desc: "A limited digital edition — 120 pages, first release of the year.",
    type: "Digital Book",
  },
  {
    id: "pr03", title: "Red Light — Grade & Preset Pack", price: 24,
    cover: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1200",
    desc: "The color grade used across the Nightlife series, built for Lightroom and DaVinci.",
    type: "Presets",
  },
  {
    id: "pr04", title: "After Midnight — Behind the Film", price: 36,
    cover: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200",
    desc: "Raw footage, unused takes, and a short commentary track.",
    type: "Digital Release",
  },
  {
    id: "pr05", title: "Interior Studies — Limited Edition", price: 55,
    cover: "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?q=80&w=1200",
    desc: "A 200-copy digital edition. Once gone, this will not be reprinted.",
    type: "Limited Edition",
  },
  {
    id: "pr06", title: "Nightlife — Full Archive", price: 89,
    cover: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200",
    desc: "Every published frame from the Nightlife series in one collection, plus twelve unreleased.",
    type: "Photo Collection",
  },
];

window.DV = DV;
