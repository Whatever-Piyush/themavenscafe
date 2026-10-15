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

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${site.url}/#cafe`,
    name: site.name,
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
  if (instagram) schema.sameAs = [instagram];

  if (site.hours.length > 0) {
    schema.openingHoursSpecification = site.hours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_URI[hours.day] ?? hours.day,
      opens: hours.opens,
      closes: hours.closes,
    }));
  }

  /**
   * Deliberately absent until real data exists:
   *   priceRange        — unknown until the menu is priced
   *   geo               — no verified coordinates
   *   aggregateRating   — no genuine reviews; fabricating one is a violation
   *   review            — same
   *   hasMenu           — added once the menu is populated
   */
  return schema;
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: 'en-IN',
    publisher: { '@id': `${site.url}/#cafe` },
  };
}

/** True when enough real detail exists to be worth emitting rich-result data. */
export function hasPublishableBusinessData(): boolean {
  return !isPending(site.contact.phone) || !isPending(site.contact.address) || site.hours.length > 0;
}
