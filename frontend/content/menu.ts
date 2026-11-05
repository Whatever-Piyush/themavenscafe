/**
 * The menu.
 *
 * The menu page and the home-page preview both read from `menu` below. If it
 * is ever emptied, both fall back to an "on its way" panel rather than showing
 * nothing.
 *
 *  ADDING A CATEGORY
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
  /**
   * e.g. 'Regular', 'Large', '500g'. Leave out when the size names are not
   * known: the prices then show side by side, smaller first, as "₹110 / ₹140".
   */
  label?: string;
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
  /**
   * Not on sale yet. Shows a "Coming soon" label in place of a price. Leave
   * `price` and `variants` out: there is no price to show until it launches.
   */
  upcoming?: boolean;
}

export interface MenuCategory {
  /** Stable slug, used as the anchor in /menu#id */
  id: string;
  name: string;
  tagline?: string;
  items: MenuItem[];
}

/** The two pizza sizes, as printed on the menu. */
const MEDIUM = 'M (8")';
const LARGE = 'L (12")';

/** The two sizes of shakes and cold coffees. */
const M = 'M';
const L = 'L';

/**
 * Transcribed from the cafe's handwritten menu. Prices and descriptions are as
 * written there and nothing else is added.
 *
 * Within each category, items are listed cheapest first (by the smaller price
 * where there are two). Keep to that when adding one.
 */
export const menu: MenuCategory[] = [
  {
    id: 'burgers',
    name: 'Burgers',
    items: [
      {
        id: 'classic-veg-burger',
        name: 'Classic Veg Burger',
        description: 'Aloo tikki, onion, tomato and sauces.',
        price: 60,
      },
      {
        id: 'crispy-veg-burger',
        name: 'Crispy Veg Burger',
        description: 'Large aloo tikki, onion, lettuce and sauces.',
        price: 70,
      },
      {
        id: 'paneer-burger',
        name: 'Paneer Burger',
        description: 'Paneer tikki, onion and sauces.',
        price: 80,
      },
      {
        id: 'crispy-cheese-veg-burger',
        name: 'Crispy Cheese Veg Burger',
        description: 'Large tikki, onion, cheese slice, lettuce and sauces.',
        price: 90,
      },
      {
        id: 'double-cheese-veg-stack',
        name: 'Double Cheese Veg Stack',
        description: 'Two large patties, two cheese slices, onion and sauces.',
        price: 120,
      },
    ],
  },
  {
    id: 'fries',
    name: 'Fries',
    items: [
      { id: 'masala-fries', name: 'Masala Fries', price: 70 },
      { id: 'classic-salted-fries', name: 'Classic Salted Fries', price: 80 },
      { id: 'peri-peri-fries', name: 'Peri-Peri Fries', price: 100 },
      { id: 'cheese-loaded-fries', name: 'Cheese Loaded Fries', price: 130 },
    ],
  },
  {
    id: 'pizza',
    name: 'Pizza',
    tagline: 'Medium is 8 inches, large is 12 inches.',
    items: [
      {
        id: 'single-topping-pizza',
        name: 'Single Topping Pizza',
        variants: [
          { label: MEDIUM, price: 180 },
          { label: LARGE, price: 280 },
        ],
      },
      {
        id: 'margherita-classic',
        name: 'Margherita Classic',
        variants: [
          { label: MEDIUM, price: 200 },
          { label: LARGE, price: 320 },
        ],
      },
      {
        id: 'farmhouse-supreme',
        name: 'Farmhouse Supreme',
        variants: [
          { label: MEDIUM, price: 220 },
          { label: LARGE, price: 340 },
        ],
      },
      {
        id: 'paneer-royale',
        name: 'Paneer Royale',
        variants: [
          { label: MEDIUM, price: 240 },
          { label: LARGE, price: 360 },
        ],
      },
      {
        id: 'mexican-heat',
        name: 'Mexican Heat',
        variants: [
          { label: MEDIUM, price: 260 },
          { label: LARGE, price: 380 },
        ],
      },
      { id: 'quattro-cheese', name: 'Quattro Cheese', upcoming: true },
    ],
  },
  {
    id: 'wraps',
    name: 'Wraps',
    items: [
      { id: 'veg-wrap', name: 'Veg Wrap', price: 60 },
      { id: 'aloo-tikki-wrap', name: 'Aloo Tikki Wrap', price: 70 },
      { id: 'mexican-wrap', name: 'Mexican Wrap', price: 80 },
      { id: 'paneer-wrap', name: 'Paneer Wrap', price: 100 },
    ],
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    items: [
      { id: 'classic-veg-sandwich', name: 'Classic Veg Sandwich', price: 110 },
      { id: 'tandoori-sandwich', name: 'Tandoori Sandwich', price: 120 },
      { id: 'paneer-sandwich', name: 'Paneer Sandwich', price: 130 },
      { id: 'corn-cheese-sandwich', name: 'Corn & Cheese Sandwich', price: 140 },
      { id: 'cheese-melt-sandwich', name: 'Cheese Melt Sandwich', price: 180 },
      { id: 'paneer-tikka-sandwich', name: 'Paneer Tikka Sandwich', price: 180 },
    ],
  },
  {
    id: 'shakes',
    name: 'Shakes',
    items: [
      { id: 'butterscotch-bliss', name: 'Butterscotch Bliss', variants: [{ label: M, price: 110 }, { label: L, price: 140 }] },
      { id: 'strawberry-shake', name: 'Strawberry Shake', variants: [{ label: M, price: 110 }, { label: L, price: 140 }] },
      { id: 'chocolate-thick-shake', name: 'Chocolate Thick Shake', variants: [{ label: M, price: 120 }, { label: L, price: 150 }] },
      { id: 'oreo-shake', name: 'Oreo Shake', variants: [{ label: M, price: 130 }, { label: L, price: 160 }] },
      { id: 'kitkat-shake', name: 'KitKat Shake', variants: [{ label: M, price: 130 }, { label: L, price: 160 }] },
    ],
  },
  {
    id: 'coffee',
    name: 'Coffee Collection',
    items: [
      { id: 'cappuccino', name: 'Cappuccino', price: 50 },
      { id: 'classic-cold-coffee', name: 'Classic Cold Coffee', variants: [{ label: M, price: 90 }, { label: L, price: 120 }] },
      { id: 'chocolate-cold-coffee', name: 'Chocolate Cold Coffee', variants: [{ label: M, price: 110 }, { label: L, price: 140 }] },
      { id: 'vietnamese-iced-coffee', name: 'Vietnamese Iced Coffee', variants: [{ label: M, price: 120 }, { label: L, price: 150 }] },
      { id: 'spanish-latte', name: 'Spanish Latte', price: 130 },
      { id: 'iced-mocha', name: 'Iced Mocha', price: 140 },
    ],
  },
  {
    id: 'snacks',
    name: 'Snacks',
    items: [
      { id: 'aloo-patties', name: 'Aloo Patties', price: 30 },
      { id: 'paneer-patties', name: 'Paneer Patties', price: 40 },
      { id: 'chilli-paneer-roll', name: 'Chilli Paneer Roll', price: 60 },
      { id: 'classic-stuffed-puff', name: 'Classic Stuffed Puff', price: 80 },
      { id: 'paneer-breaded-puff', name: 'Paneer Breaded Puff', price: 80 },
    ],
  },
];

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
