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
  /**
   * Official name. Used in metadata, titles and structured data.
   *
   * Set with a typographic apostrophe (’, U+2019) rather than a straight quote
   * ('), which is the correct mark for a possessive and what a premium brand
   * should be set in.
   *
   * NOTE the deliberate split: the NAME carries the apostrophe, but every
   * machine-readable IDENTIFIER stays flat — themavenscafe.in, @themavenscafe,
   * themavenscafe@gmail.com. Apostrophes do not belong in domains, handles or
   * email addresses, and those are not spellings of the name so much as
   * addresses that happen to resemble it.
   */
  name: 'The Maven’s',

  /** Hero treatment — the wordmark as it is set on signage. */
  wordmark: 'THE MAVEN’S',

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
    /**
     * STREET LINE ONLY — locality, region and country are added separately.
     *
     * Kept apart on purpose: schema.org `addressLocality` is already "Chirawa",
     * so repeating it here would publish "…, Chirawa, Chirawa, Rajasthan" in the
     * structured data. Use `formattedAddress()` for anything human-facing.
     *
     * PIN code still to be supplied.
     */
    address: 'Near SBI Bank, Pilani Road' as string | Pending,

    /** Display number. */
    phone: '+91 73758 51778' as string | Pending,

    /** Dial link — E.164, no spaces, so every dialler parses it. */
    phoneHref: 'tel:+917375851778' as string | Pending,

    /** wa.me takes the number with country code and no symbols. */
    whatsapp: 'https://wa.me/917375851778' as string | Pending,

    /** Full profile URL. */
    instagram: 'https://instagram.com/themavenscafe' as string | Pending,

    /** Handle including the @. */
    instagramHandle: '@themavenscafe' as string | Pending,

    /** Email address. */
    email: 'themavenscafe@gmail.com' as string | Pending,

    /**
     * Directions link.
     *
     * A Maps *search* for the address supplied, not invented coordinates — it
     * resolves to the right street and lets Google do the matching. Replace
     * this with the Google Business Profile share link once that profile
     * exists; it will pin the business itself rather than the address.
     */
    maps: 'https://www.google.com/maps/search/?api=1&query=The+Mavens+Cafe%2C+Near+SBI+Bank%2C+Pilani+Road%2C+Chirawa%2C+Rajasthan' as string | Pending,

    /** Official domain. Displayed as a contact detail. */
    website: 'themavenscafe.in' as string | Pending,
  },

  /**
   * Opening hours, in 24-hour time.
   *
   * Open daily, 9am to 10pm. Listed per day rather than as a single "daily"
   * string because schema.org needs each weekday named, and because a future
   * change to one day (a late Saturday, a closed Monday) should be a one-line
   * edit rather than a restructure. `hoursSummary()` collapses them back down
   * for display when every day matches.
   *
   * An empty array renders as "Coming soon" and is omitted from structured data.
   */
  hours: [
    { day: 'Monday', opens: '09:00', closes: '22:00' },
    { day: 'Tuesday', opens: '09:00', closes: '22:00' },
    { day: 'Wednesday', opens: '09:00', closes: '22:00' },
    { day: 'Thursday', opens: '09:00', closes: '22:00' },
    { day: 'Friday', opens: '09:00', closes: '22:00' },
    { day: 'Saturday', opens: '09:00', closes: '22:00' },
    { day: 'Sunday', opens: '09:00', closes: '22:00' },
  ] as OpeningHours[],

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

/**
 * A one-line summary when every day keeps the same hours.
 *
 * Returns null the moment any day differs, so callers fall back to the full
 * per-day list automatically. Seven identical rows reading "9:00 am – 10:00 pm"
 * is noise; "Open daily · 9:00 am – 10:00 pm" is the same information and
 * actually gets read.
 */
export function hoursSummary(): { label: string; range: string } | null {
  const [first, ...rest] = site.hours;
  if (!first) return null;
  if (site.hours.length !== 7) return null;

  const uniform = rest.every((entry) => entry.opens === first.opens && entry.closes === first.closes);
  if (!uniform) return null;

  return {
    label: 'Open daily',
    range: `${formatTime(first.opens)} – ${formatTime(first.closes)}`,
  };
}

/**
 * The full postal address on one line, for display.
 *
 * Composes the street line with locality and region so the stored value stays
 * schema-correct while humans still see a complete address. Returns null while
 * the street line is pending, so callers can fall back to the locality alone.
 */
export function formattedAddress(): string | null {
  const street = resolve(site.contact.address);
  if (!street) return null;
  return `${street}, Chirawa, Rajasthan`;
}
