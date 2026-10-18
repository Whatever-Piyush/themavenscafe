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
  /** Optional visible caption. */
  caption?: string;
}

/**
 * The published gallery.
 *
 * Deliberately curated rather than exhaustive — a short set of strong images
 * reads as considered; a long set padded with weak ones reads as desperate.
 * Ordered so the set opens wide (the storefront), moves inside, and closes on
 * the food.
 *
 * NOT included, and these are decisions rather than oversights:
 *   - The interior renders in resources/renders/ carry a third-party design
 *     firm's logo, copyright notice and website URL. They are reference only
 *     and must not be published, cropped around, or retouched to remove it.
 *   - A "BUT FIRST, COFFEE" typographic poster: generic sentiment, not this
 *     cafe, and its cup icon is not the brand mark.
 *   - The botanical pattern sheet: a design asset, not a view of the space —
 *     and the site already draws that motif as SVG throughout.
 *   - A photograph of the sign mid-installation: genuinely the real building,
 *     but it shows scaffolding, a worker and stacked furniture. Lovely for a
 *     future behind-the-scenes section, wrong for a showcase.
 */
export const gallery: GalleryImage[] = [
  {
    id: 'storefront-dusk',
    src: '/images/space/storefront-dusk',
    alt: "The illuminated storefront sign above an open frontage at dusk, with arched niches, chandeliers and the dessert counter glowing inside",
    category: 'exterior',
    width: 1024,
    height: 1536,
    widths: [640, 1024],
    caption: 'The frontage, open to the street',
  },
  {
    id: 'pylon-sign-dusk',
    src: '/images/gallery/pylon-sign-dusk',
    alt: 'The freestanding pylon sign lit at dusk beside the glazed frontage, warm light spilling out from the counter inside',
    category: 'exterior',
    width: 1200,
    height: 800,
    widths: [640, 1200],
    caption: 'Good Food, Better Moods',
  },
  {
    id: 'blade-sign-dusk',
    src: '/images/gallery/blade-sign-dusk',
    alt: 'The circular blade sign mounted on the wall, its gold cup-and-wheat mark glowing against deep maroon',
    category: 'exterior',
    width: 1200,
    height: 800,
    widths: [640, 1200],
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
  },
  {
    id: 'cupcake-selection',
    src: '/images/gallery/cupcake-selection',
    alt: 'Four cupcakes on a wooden board — chocolate, strawberry, vanilla with blueberries, and caramel with chopped nuts — beside a cup of black coffee',
    category: 'food',
    width: 1024,
    height: 1536,
    widths: [640, 1024],
    caption: 'Finished in small batches',
  },
  {
    id: 'chocolate-layer-cake',
    src: '/images/gallery/chocolate-layer-cake',
    alt: 'A chocolate layer cake on a wooden stand with a slice cut away, showing the layers, topped with piped rosettes and a dark chocolate drip',
    category: 'food',
    width: 1024,
    height: 1536,
    widths: [640, 1024],
  },
];

export const isGalleryPending = (): boolean => gallery.length === 0;

export function galleryByCategory(category: GalleryCategory): GalleryImage[] {
  return gallery.filter((image) => image.category === category);
}

/**
 * The spaces described in words while photography is pending.
 *
 * Drawn from the cafe's actual layout — a ground-floor counter, a first-floor
 * room, and a rooftop terrace. Descriptive, not invented amenities.
 */
export interface SpaceDescription {
  name: string;
  floor: string;
  copy: string;
  /** Accessible description of the eventual photograph. */
  imageIntent: string;
  feature?: boolean;
}

export const spaces: SpaceDescription[] = [
  {
    name: 'The counter',
    floor: 'Ground floor',
    copy: 'Glass display, marble-topped tables and the smell of the morning bake. This is where you order.',
    imageIntent: 'The ground-floor counter and dessert display',
  },
  {
    name: 'The quiet room',
    floor: 'First floor',
    copy: 'Softer light, fewer footsteps. For long conversations and longer books.',
    imageIntent: 'The first-floor seating room',
  },
  {
    name: 'The terrace',
    floor: 'Rooftop',
    copy: 'Open to the sky, under a pergola. The best seat in the house once the evening turns.',
    imageIntent: 'The rooftop terrace at dusk',
    feature: true,
  },
];
