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
  /** Path under /public. */
  src: string;
  /** Required. Describe the frame — this is not optional decoration. */
  alt: string;
  category: GalleryCategory;
  /** Intrinsic dimensions, so the layout reserves space and never shifts. */
  width: number;
  height: number;
  /** Optional visible caption. */
  caption?: string;
}

/**
 * Empty until authorised photography is available. See the note above.
 */
export const gallery: GalleryImage[] = [];

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
