import { isPending, resolve, site } from '@/content/site';

/**
 * schema.org JSON-LD.
 *
 * Governing rule: ONLY REAL INFORMATION. Every field below is omitted unless a
 * genuine value exists in content/site.ts.
 *
 * This is not pedantry. Structured data is a set of machine-readable claims
 * about a real business — publishing a fabricated phone number or opening hours
 * sends real customers to a closed door, and inventing an aggregateRating is a
 * Google policy violation that can get a site's rich results suppressed
 * entirely. An incomplete entry costs nothing; a false one costs trust.
 *
 * As details are filled into site.ts, they appear here automatically.
 */

const DAY_URI: Record<string, string> = {
  Monday: 'https://schema.org/Monday',
  Tuesday: 'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday',
  Thursday: 'https://schema.org/Thursday',
  Friday: 'https://schema.org/Friday',
  Saturday: 'https://schema.org/Saturday',
  Sunday: 'https://schema.org/Sunday',
};

export function cafeSchema(): Record<string, unknown> {
  const phone = resolve(site.contact.phone);
  const email = resolve(site.contact.email);
  const address = resolve(site.contact.address);
  const instagram = resolve(site.contact.instagram);
  const website = resolve(site.contact.website);
  const maps = resolve(site.contact.maps);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${site.url}/#cafe`,
    name: site.name,
    alternateName: site.alternateNames,
    description: site.description,
    url: site.url,
    servesCuisine: ['Coffee', 'Bakery', 'Desserts'],

    /**
     * Locality only. This is the one location fact we actually have — a street
     * address is NOT invented to make the entry look complete.
     */
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chirawa',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
      ...(address ? { streetAddress: address } : {}),
    },
  };

  if (phone) schema.telephone = phone;
  if (email) schema.email = email;

  /**
   * `additionalType` lets one listing claim two categories. Searches for a
   * bakery and searches for a cafe are different intents in a small town, and
   * this place genuinely is both — so it should be eligible for both.
   */
  schema.additionalType = ['https://schema.org/Bakery', 'https://schema.org/DessertShop'];

  /**
   * Where customers actually come from. Chirawa sits in Jhunjhunu district, and
   * people search at both levels.
   */
  schema.areaServed = [
    { '@type': 'City', name: 'Chirawa' },
    { '@type': 'AdministrativeArea', name: 'Jhunjhunu district, Rajasthan' },
  ];

  /**
   * An image is close to required for a rich result — Google will often decline
   * to show one without it. The storefront is the strongest frame we have.
   */
  schema.image = [`${site.url}/images/space/storefront-dusk-1024.jpg`];

  /**
   * Coordinates, only if verified. Never guessed: a wrong pin sends people to
   * the wrong street, and search engines read it as contradicting the address.
   */
  if (!isPending(site.geo)) {
    const { lat, lng } = site.geo as { lat: number; lng: number };
    schema.geo = { '@type': 'GeoCoordinates', latitude: lat, longitude: lng };
  }

  /**
   * sameAs links the website to the same business elsewhere on the web, which
   * is how search engines reconcile the two into one entity. The official
   * domain belongs here alongside the social profile.
   */
  const sameAs = [instagram, website ? `https://${website}` : null].filter(
    (value): value is string => value !== null,
  );
  if (sameAs.length > 0) schema.sameAs = sameAs;

  if (maps) schema.hasMap = maps;

  /**
   * Opening hours, grouped by identical open/close pairs.
   *
   * schema.org allows `dayOfWeek` to be an array, so seven days on the same
   * schedule become one specification rather than seven near-identical ones.
   * Equally correct, markedly smaller, and easier to read when debugging in
   * Google's Rich Results Test.
   */
  if (site.hours.length > 0) {
    const groups = new Map<string, { opens: string; closes: string; days: string[] }>();

    for (const entry of site.hours) {
      const key = `${entry.opens}-${entry.closes}`;
      const existing = groups.get(key);
      if (existing) {
        existing.days.push(entry.day);
      } else {
        groups.set(key, { opens: entry.opens, closes: entry.closes, days: [entry.day] });
      }
    }

    schema.openingHoursSpecification = [...groups.values()].map((group) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: group.days.map((day) => DAY_URI[day] ?? day),
      opens: group.opens,
      closes: group.closes,
    }));
  }

  /**
   * Deliberately absent until real data exists:
   *   priceRange        — unknown until the menu is priced
   *   aggregateRating   — no genuine reviews; fabricating one is a violation
   *                       of Google's policy and can suppress rich results
   *                       for the whole site
   *   review            — same
   *   hasMenu           — added once content/menu.ts is populated
   *
   * (`geo` is emitted above, but only once real coordinates are set.)
   */
  return schema;
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    alternateName: site.alternateNames,
    url: site.url,
    inLanguage: 'en-IN',
    publisher: { '@id': `${site.url}/#cafe` },
  };
}

/** True when enough real detail exists to be worth emitting rich-result data. */
export function hasPublishableBusinessData(): boolean {
  return !isPending(site.contact.phone) || !isPending(site.contact.address) || site.hours.length > 0;
}
