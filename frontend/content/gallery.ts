/**
 * Gallery.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  EMPTY ON PURPOSE — AND THIS ONE IS A LEGAL DECISION, NOT A TODO.
 *
 *  The architectural renders supplied as reference material carry a third-party
 *  design firm's watermark and copyright notice. They are NOT published here,
 *  and they must not be published by cropping, erasing or regenerating the
 *  watermark away. Those images live in resources/ as design reference only and
 *  are excluded from deployment.
 *
 *  Until clean, authorised photography exists, the gallery renders an
 *  art-directed brand treatment built from the cafe's own visual language —
 *  arches, fluting, botanical line work, warm light. The page looks finished;
 *  it simply does not pretend to show photographs it does not have.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  TO ADD REAL PHOTOGRAPHY
 *
 *    1. Put the files in frontend/public/images/gallery/
 *    2. Add an entry below:
 *
 *         {
 *           id: 'terrace-evening',
 *           src: '/images/gallery/terrace-evening.jpg',
 *           alt: 'The rooftop terrace at dusk, strung with warm lights',
 *           category: 'terrace',
 *           width: 1600,
 *           height: 1200,
 *         }
 *
 *  `alt` is required by the type, deliberately. It is what a screen-reader user
 *  receives instead of the photograph, and it is read by search engines.
 *  Describe what is in the frame, not "cafe image".
 */

export type GalleryCategory = 'exterior' | 'interior' | 'terrace' | 'food';

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'exterior', label: 'Exterior' },
  { id: 'interior', label: 'Interior' },
  { id: 'terrace', label: 'Terrace' },
  { id: 'food', label: 'Food' },
];

export interface GalleryImage {
  id: string;
  /**
   * Path WITHOUT width suffix or extension, e.g. '/images/gallery/pylon-sign-dusk'.
   * Each entry is pre-encoded as `<src>-<width>.{avif,webp,jpg}` — see the Photo
   * component for why the format negotiation lives in the markup.
   */
  src: string;
  /** Required. Describe the frame — this is not optional decoration. */
  alt: string;
  category: GalleryCategory;
  /** Intrinsic dimensions of the LARGEST encoded variant. */
  width: number;
  height: number;
  /** Encoded widths available on disk, ascending. */
  widths: number[];
  /** Optional visible caption: a short title under the photo. */
  caption?: string;
  /** One line under the caption saying what the photo shows. */
  note?: string;
  /** Shown in the home-page photo wheel but not on the gallery page. */
  wheelOnly?: boolean;
}

/**
 * The published gallery.
 *
 * Deliberately curated rather than exhaustive — a short set of strong images
 * reads as considered; a long set padded with weak ones reads as desperate.
 * Ordered so that no two similar photos sit next to each other: it opens on
 * the open door at night and the ground floor, then alternates between the
 * outside, the room and the food. The two rooms dressed differently (plain and
 * for a party) are kept apart.
 *
 * On a wide screen the photos flow down three columns, and the browser can
 * only balance them by whole photos. Re-check the page when adding photos so
 * it does not end with one short column.
 *
 * NOT included, and these are decisions rather than oversights:
 *   - The interior renders in resources/renders/ carry a third-party design
 *     firm's logo, copyright notice and website URL. They are reference only
 *     and must not be published, cropped around, or retouched to remove it.
 *   - A "BUT FIRST, COFFEE" typographic poster on its own: generic sentiment,
 *     not this cafe, and its cup icon is not the brand mark. (It does appear
 *     in 'poster-wall', framed on the wall among the cafe's own prints, which
 *     the owner chose to show.)
 *   - The botanical pattern sheet: a design asset, not a view of the space —
 *     and the site already draws that motif as SVG throughout.
 *   - A photograph of the sign mid-installation: genuinely the real building,
 *     but it shows scaffolding, a worker and stacked furniture. Lovely for a
 *     future behind-the-scenes section, wrong for a showcase.
 */
export const photos: GalleryImage[] = [
  {
    id: 'open-door-night',
    src: '/images/gallery/open-door-night',
    alt: 'Looking in through the glass door at night — the staircase, pendant lights and the dessert counter',
    category: 'interior',
    width: 1024,
    height: 1169,
    widths: [640, 1024],
    caption: 'Open into the evening',
    note: 'Through the glass after dark: the stairs, the lights and the counter.',
  },
  {
    id: 'ground-floor-interior',
    src: '/images/gallery/ground-floor-interior',
    alt: 'The ground floor — cushioned chairs at light wood tables, a gold-lit arch with botanical line work, and the dessert counter at the back by the stairs',
    category: 'interior',
    width: 1024,
    height: 1365,
    widths: [640, 1024],
    caption: 'The ground floor',
    note: 'Cushioned chairs, light wood tables and the gold-lit arch.',
  },
  {
    id: 'bakery-display',
    src: '/images/gallery/bakery-display',
    alt: 'The gold-trimmed display case stacked with cakes, pastries and puffs, each labelled, above a "The Maven\'s Cafe and bakery" panel',
    category: 'food',
    width: 1200,
    height: 920,
    widths: [640, 1200],
    caption: 'Today\'s counter',
    note: 'Cakes, pastries and puffs, each one labelled.',
  },
  {
    id: 'blade-sign-dusk',
    src: '/images/gallery/blade-sign-dusk',
    alt: 'The circular blade sign mounted on the wall, its gold cup-and-wheat mark glowing against deep maroon',
    category: 'exterior',
    width: 1200,
    height: 800,
    widths: [640, 1200],
    caption: 'Look for the sign',
    note: 'Our round sign lights up at dusk on Pilani Road.',
  },
  {
    id: 'balloon-interior',
    src: '/images/gallery/balloon-interior',
    alt: 'The dining room dressed for a celebration, with maroon, cream and yellow balloons above the tables and the gold-lit arch',
    category: 'interior',
    width: 1024,
    height: 1365,
    widths: [640, 1024],
    caption: 'Dressed for a celebration',
    note: 'Book the cafe and we theme it your way.',
  },
  {
    id: 'iced-coffees',
    src: '/images/gallery/iced-coffees',
    alt: 'Two iced coffees with red straws on a wooden table, the cake display softly blurred behind',
    category: 'food',
    width: 1024,
    height: 1141,
    widths: [640, 1024],
    caption: 'Iced coffee',
    note: 'Made to order and served cold.',
  },
  {
    id: 'poster-wall',
    src: '/images/gallery/poster-wall',
    alt: 'Three framed prints on a warm wall under spotlights: a chocolate cake, the words "But first, coffee", and a plate of cupcakes',
    category: 'interior',
    width: 1200,
    height: 900,
    widths: [640, 1200],
    caption: 'On the walls',
    note: 'Framed prints of cake, coffee and cupcakes, lit warm.',
  },
  {
    id: 'arched-niche-seating',
    src: '/images/gallery/arched-niche-seating',
    alt: 'A table for two set inside an arched niche, the botanical line-art mural behind it lit by a warm cove light, with the bakery display to one side',
    category: 'interior',
    width: 1200,
    height: 800,
    widths: [640, 1200],
    caption: 'A table for two, in the arch',
    note: 'Our quietest corner, under the botanical mural.',
  },
  {
    id: 'nighttime-glow',
    src: '/images/gallery/nighttime-glow',
    alt: 'The frontage at night from the step, warm light under the stairs and the balloon arch around the open glass front',
    category: 'exterior',
    width: 1024,
    height: 1365,
    widths: [640, 1024],
    caption: 'Lit up at night',
    note: 'A balloon arch and warm light on the step at the entrance.',
  },
  {
    id: 'chocolate-layer-cake',
    src: '/images/gallery/chocolate-layer-cake',
    alt: 'A chocolate layer cake on a wooden stand with a slice cut away, showing the layers, topped with piped rosettes and a dark chocolate drip',
    category: 'food',
    width: 1024,
    height: 1536,
    widths: [640, 1024],
    caption: 'Chocolate layer cake',
    note: 'Dark layers, a chocolate drip and piped rosettes.',
  },
  /*
   * In the home-page photo wheel only: another straight-on night doorway, too
   * close to the open-door photo that leads the gallery.
   */
  {
    id: 'festive-entrance',
    src: '/images/gallery/festive-entrance',
    alt: 'A balloon arch in maroon and cream around the glass entrance at night, the counter and seating glowing inside',
    wheelOnly: true,
    category: 'exterior',
    width: 1024,
    height: 1233,
    widths: [640, 1024],
  },
];

/** What the gallery page shows: every photo except the wheel-only ones, in order. */
export const gallery: GalleryImage[] = photos.filter((image) => !image.wheelOnly);

export const isGalleryPending = (): boolean => gallery.length === 0;

export function galleryByCategory(category: GalleryCategory): GalleryImage[] {
  return gallery.filter((image) => image.category === category);
}

/**
 * The spaces described in words while photography is pending.
 *
 * Two floors are in use today — the counter at street level and the kitchen
 * above it. The rooftop is a PLAN, not a room, and is flagged as such: see the
 * `upcoming` field and the note on it below.
 */
export interface SpaceDescription {
  name: string;
  floor: string;
  copy: string;
  /** Accessible description of the eventual photograph. */
  imageIntent: string;
  /**
   * Not built yet.
   *
   * This drives a visible "Coming soon" badge rather than leaving the status
   * buried in prose. A planned rooftop described in the present tense reads as
   * a room a customer can ask to sit in tonight — and someone will travel for
   * it and be disappointed. The badge is the honest version.
   */
  upcoming?: boolean;
  /** A photograph for the card. Without one, the card shows the arch motif. */
  photo?: Pick<GalleryImage, 'src' | 'alt' | 'width' | 'height' | 'widths'>;
}

export const spaces: SpaceDescription[] = [
  {
    name: 'The counter',
    floor: 'Ground floor',
    copy: 'Glass display, marble-topped tables and the smell of the morning bake. This is where you order.',
    imageIntent: 'The ground-floor counter and dessert display',
    photo: {
      src: '/images/gallery/ground-floor-interior',
      alt: 'The ground floor — cushioned chairs at light wood tables, a gold-lit arch with botanical line work, and the dessert counter at the back by the stairs',
      width: 1024,
      height: 1365,
      widths: [640, 1024],
    },
  },
  {
    name: 'The kitchen',
    floor: 'First floor',
    copy: 'Where the baking happens. The ovens are on well before the lights are, every morning.',
    imageIntent: 'The first-floor kitchen',
  },
  {
    name: 'The terrace',
    floor: 'Rooftop',
    copy: 'Open-air seating above the Pilani Road — the lights of the street below, sunsets over Chirawa, and match nights under the sky.',
    imageIntent: 'The planned rooftop terrace at dusk',
    upcoming: true,
  },
];
