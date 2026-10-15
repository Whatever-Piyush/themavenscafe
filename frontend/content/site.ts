/**
 * Site configuration — the single source of truth for business information.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDITING GUIDE (no programming needed)
 *
 *  Replace any `pending(...)` value with the real detail, like this:
 *
 *      phone: pending()                      ->  phone: '+91 00000 00000'
 *      instagram: pending('Instagram')       ->  instagram: 'https://instagram.com/<handle>'
 *
 *  Anything left as `pending()` renders as "Coming soon" across the whole site
 *  and is automatically left out of search-engine structured data. Nothing
 *  breaks, and no placeholder is ever presented as if it were real.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  NOTHING IN THIS FILE IS INVENTED. No phone number, address, opening time,
 *  rating or social handle has been made up. A wrong detail on a real business
 *  site sends real customers to the wrong place, which is worse than an honest
 *  "coming soon".
 */

/** A detail we do not have yet. Renders as "Coming soon". */
export interface Pending {
  readonly __pending: true;
  readonly label: string;
}

export function pending(label = 'Coming soon'): Pending {
  return { __pending: true, label };
}

export function isPending(value: unknown): value is Pending {
  return typeof value === 'object' && value !== null && '__pending' in value;
}

/** Narrows to a usable string, or null when the detail is still pending. */
export function resolve(value: string | Pending): string | null {
  return isPending(value) ? null : value;
}

export interface OpeningHours {
  day: string;
  opens: string;
  closes: string;
}

/** See the `url` field below for why the order is what it is. */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  // Netlify provides this on every build.
  const netlify = process.env.URL;
  if (netlify) return netlify.replace(/\/$/, '');

  return 'http://localhost:3000';
}

export const site = {
  /** Official name. Used in metadata, titles and structured data. */
  name: 'The Mavens Cafe',

  /** Hero treatment — the wordmark as it is set on signage. */
  wordmark: 'THE MAVENS',

  descriptor: 'Café · Bakery · Desserts',
  tagline: 'Good Food • Better Moods',

  /** From the brand identity. These are the cafe's own words, not invented. */
  pillars: ['Premium', 'Fresh', 'Handcrafted', 'Always'] as const,

  description:
    'A café, bakery and dessert room in Chirawa, Rajasthan. Coffee, fresh baking and desserts, served in a space built for lingering.',

  /** The one location fact we have been given. */
  location: 'Chirawa, Rajasthan, India',

  /**
   * Canonical site URL — used for metadataBase, Open Graph, canonical links,
   * sitemap.xml, robots.txt and JSON-LD.
   *
   * Resolved at BUILD time, which is the only time that exists in a static
   * export. Read in that order:
   *
   *   1. NEXT_PUBLIC_SITE_URL — set this explicitly once a custom domain is
   *      attached. It wins over everything.
   *   2. URL — set automatically by Netlify to the live site URL, so a Netlify
   *      build produces correct canonicals with no configuration at all.
   *   3. localhost — a local build genuinely IS localhost, so saying so is
   *      more honest than hard-coding somebody else's production domain.
   *
   * Note this value is only ever consumed server-side (metadata, sitemap,
   * robots, structured data). `site` is also imported by a client component for
   * its name/nav, and non-NEXT_PUBLIC_ variables are not inlined into client
   * bundles — so do not start rendering `site.url` in client code without
   * moving this resolution behind a NEXT_PUBLIC_ variable first.
   */
  url: resolveSiteUrl(),
  locale: 'en_IN',

  /**
   * Contact details.
   *
   * Every one of these is pending until the real detail is supplied. Replace a
   * `pending()` with a string and it goes live everywhere at once — footer,
   * contact page, structured data.
   */
  contact: {
    /** Full street address, including PIN code. */
    address: pending() as string | Pending,

    /** Display number, e.g. '+91 00000 00000'. */
    phone: pending() as string | Pending,

    /** Dial link, e.g. 'tel:+910000000000'. */
    phoneHref: pending() as string | Pending,

    /** e.g. 'https://wa.me/910000000000' */
    whatsapp: pending() as string | Pending,

    /** Full profile URL. */
    instagram: pending() as string | Pending,

    /** Handle including the @. */
    instagramHandle: pending() as string | Pending,

    /** Email address. */
    email: pending() as string | Pending,

    /** Google Maps link or embed URL. */
    maps: pending() as string | Pending,
  },

  /**
   * Opening hours. An empty array renders as "Coming soon" and is omitted from
   * structured data. Populate like:
   *
   *   hours: [{ day: 'Monday', opens: '09:00', closes: '22:00' }, ...]
   */
  hours: [] as OpeningHours[],

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'The Space', href: '/gallery' },
    { label: 'Our Story', href: '/about' },
    { label: 'Visit', href: '/contact' },
  ],
} as const;

/** Formats '09:00' as '9:00 am'. */
export function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  if (hours === undefined || minutes === undefined) return time24;
  const period = hours >= 12 ? 'pm' : 'am';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}

/** True when at least one contact channel is live. Drives the Visit section. */
export function hasAnyContactDetail(): boolean {
  return Object.values(site.contact).some((value) => !isPending(value));
}
