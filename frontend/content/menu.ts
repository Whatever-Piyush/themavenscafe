/**
 * The menu.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE REAL MENU HAS NOT BEEN SUPPLIED YET, SO THIS FILE IS EMPTY ON PURPOSE.
 *
 *  Nothing here is invented. No dish, no price, no description. The menu page
 *  and the home-page preview both detect the empty state and render an elegant
 *  "coming soon" instead of fictional food.
 *
 *  The entire menu UI — categories, filtering, search, badges, variants,
 *  sold-out states, print styles — is already built and waiting. Populating
 *  `menu` below is the only step required to bring it to life.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  TO ADD THE REAL MENU
 *
 *      export const menu: MenuCategory[] = [
 *        {
 *          id: 'hot-coffee',
 *          name: 'Hot Coffee',
 *          tagline: 'Pulled to order',
 *          items: [
 *            {
 *              id: 'cappuccino',
 *              name: 'Cappuccino',
 *              description: 'Espresso, steamed milk, foam',
 *              price: 130,
 *              badges: ['veg', 'bestseller'],
 *            },
 *          ],
 *        },
 *      ];
 *
 *  `id` values are used in URLs (/menu#hot-coffee), so keep them stable and
 *  lowercase-with-hyphens. Everything except `id` and `name` is optional —
 *  omit `price` entirely rather than guessing one.
 */

export type Badge = 'veg' | 'non-veg' | 'eggless' | 'vegan' | 'bestseller' | 'new' | 'spicy' | 'contains-nuts';

export const BADGE_LABELS: Record<Badge, string> = {
  veg: 'Vegetarian',
  'non-veg': 'Non-vegetarian',
  eggless: 'Eggless',
  vegan: 'Vegan',
  bestseller: 'Bestseller',
  new: 'New',
  spicy: 'Spicy',
  'contains-nuts': 'Contains nuts',
};

/** Badges that describe diet. Shown more prominently — they are safety info. */
export const DIETARY_BADGES: Badge[] = ['veg', 'non-veg', 'eggless', 'vegan', 'contains-nuts'];

export interface MenuVariant {
  /** e.g. 'Regular', 'Large', '500g' */
  label: string;
  price: number;
}

export interface MenuItem {
  /** Stable slug, used for deep links. */
  id: string;
  name: string;
  description?: string;
  /** Rupees. Omit rather than invent. */
  price?: number;
  /** Sizes or portions, each priced. Takes precedence over `price` in the UI. */
  variants?: MenuVariant[];
  badges?: Badge[];
  /** Path under /public, e.g. '/images/menu/cappuccino.jpg' */
  image?: string;
  /** false renders the item greyed out as "Currently unavailable". */
  available?: boolean;
}

export interface MenuCategory {
  /** Stable slug, used as the anchor in /menu#id */
  id: string;
  name: string;
  tagline?: string;
  items: MenuItem[];
}

/**
 * Empty until the real menu is supplied. See the guide above.
 */
export const menu: MenuCategory[] = [];

/** True while awaiting the real menu. Drives the "coming soon" states. */
export const isMenuPending = (): boolean => menu.length === 0;

/** Flat list of every item, for search and counting. */
export const allItems = (): MenuItem[] => menu.flatMap((category) => category.items);

/**
 * Items to feature on the home page.
 *
 * Add ids here once the menu exists, e.g. ['cappuccino', 'choco-lava-cake'].
 * Unknown ids are ignored rather than throwing, so a typo or a removed item
 * degrades to showing fewer cards instead of breaking the home page.
 */
export const signatureItemIds: string[] = [];

export function signatureItems(): MenuItem[] {
  const items = allItems();
  return signatureItemIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is MenuItem => item !== undefined);
}
