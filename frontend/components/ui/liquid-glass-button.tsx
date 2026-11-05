import { cn } from '@/lib/cn';

/**
 * Liquid-glass button styling.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  WHAT THIS KEPT FROM THE REFERENCE COMPONENT, AND WHAT IT DROPPED.
 *
 *  Kept: the pill shape, the hover lift, a translucent tint over a real
 *  backdrop blur, and a lit edge.
 *
 *  Dropped: `backdrop-filter: url("#...")` with an feTurbulence +
 *  feDisplacementMap chain. Two reasons, and the second is the decisive one.
 *
 *    It was Chromium-only. Safari and Firefox ignore an SVG filter referenced
 *    from `backdrop-filter` outright, so most phone visitors never saw it.
 *
 *    And where it DID render, it looked bad here. The reference sits on a flat
 *    near-black page, where warping the backdrop is invisible. This site has
 *    textured, coloured surfaces — the fluted maroon hero, cream sections — and
 *    displacing those smeared them into mottled blobs. The buttons read as
 *    smudged rather than glassy.
 *
 *  Also dropped: the stack's `inset 0 0 6px 6px` white bloom, which fogged the
 *  inside of each pill. See `.liquid-rim` in globals.css.
 *
 *  Structural note: this is a class recipe, not a <button>. Every CTA here is a
 *  link, and ButtonLink already handles Link-vs-anchor plus target/rel on
 *  external links — so all 16 buttons change from one place, and neither
 *  `class-variance-authority` nor `@radix-ui/react-slot` is needed.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * The rim lives in globals.css as `.liquid-rim`, NOT as a Tailwind arbitrary
 * value — see the note there. Built by concatenation here the `shadow-[...]`
 * token was split across string boundaries, Tailwind's text scanner never
 * matched it, and no CSS was generated: the buttons rendered with no rim at all.
 */
const RIM = 'liquid-rim';

/**
 * Shared structure and motion.
 *
 * `hover:scale-105` matches the reference's default variant. Deliberately no
 * sweeping gleam and no top-edge streak — the reference has neither, and adding
 * them made these read as generic frosted panels rather than this pane.
 */
const BASE =
  'relative isolate overflow-hidden rounded-full ' +
  'transition-[transform,background-color,filter] duration-300 ' +
  'hover:scale-105 active:scale-[0.98] ' +
  'motion-reduce:transition-none motion-reduce:hover:scale-100';

const GLASS =
  'supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-[1.15]';

/**
 * ON CREAM SURFACES — solid brand maroon, not a tint.
 *
 * This is arithmetic, not taste. Compositing maroon over cream always LIGHTENS
 * it: `maroon/75` over #F8F4EE resolves to #8E545E, a dusty rose, and the
 * espresso tint resolved to a flat grey-brown. No opacity below 100% can
 * produce #6B1E2E on a light page — only a solid fill can.
 *
 * So the glass character here comes from the rim, the lift and the hover rather
 * than from see-through. `backdrop-blur` is dropped too: behind an opaque fill
 * it renders nothing and only costs a compositing layer.
 *
 * Cream on solid maroon measures 9.1:1 — the strongest contrast of any button
 * on the site.
 */
const SOLID_MAROON = cn(BASE, RIM, 'bg-maroon text-cream hover:bg-maroon-soft active:bg-maroon-deep');

/** Primary action on a cream surface. */
export const liquidPrimaryLight = SOLID_MAROON;

/**
 * Quieter action on a cream surface.
 *
 * Currently identical to primary, because the brief is one exact brand colour
 * across all of them. That does flatten the primary/secondary distinction on
 * cream — if it needs to come back, an outline treatment (transparent fill,
 * maroon border, maroon label) keeps the exact colour while reading as the
 * lighter weight.
 */
export const liquidSecondaryLight = SOLID_MAROON;

/**
 * ON MAROON SURFACES — one shared faint glass, for the hero pair and the 404.
 *
 * Both weights use the SAME tint deliberately. The primary used to sit at
 * cream/25 against the secondary's cream/10, which made the two hero buttons
 * read as mismatched rather than as a pair. The fainter of the two is the
 * better one — on a dark ground a 10% veil is plenty to define an edge, and it
 * keeps the fluted texture of the hero visible through the glass instead of
 * washing it out.
 *
 * Cream label on this measures ~8.1:1, so the transparency costs nothing in
 * legibility.
 *
 * As on cream, this flattens the primary/secondary distinction. If it needs to
 * come back, the lighter-touch move is a gold hairline border on the primary
 * rather than a heavier fill.
 */
const GLASS_ON_DARK = cn(
  BASE,
  RIM,
  GLASS,
  'bg-cream/15 text-cream supports-[backdrop-filter]:bg-cream/10',
  'hover:bg-cream/25 supports-[backdrop-filter]:hover:bg-cream/20',
);

/** Primary action on a maroon surface. */
export const liquidPrimaryDark = GLASS_ON_DARK;

/** Quieter action on a maroon surface. */
export const liquidSecondaryDark = GLASS_ON_DARK;
