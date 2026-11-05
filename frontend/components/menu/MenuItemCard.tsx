import { BADGE_LABELS, DIETARY_BADGES, type MenuItem } from '@/content/menu';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';

/**
 * Price columns for a category whose items carry two prices.
 *
 * Fixed widths, so every item's prices line up under each other, and no rules
 * between them: the gap and the M and L above keep them apart.
 * The first column is the smaller size, so an item with one price sits there,
 * in line with the others, instead of out at the far edge.
 */
// Centred, heads and prices alike, so each column hangs on one line however
// many figures a price has.
const COLUMN = 'w-[4.5rem] shrink-0 text-center';
const COLUMN_GAP = 'gap-4 sm:gap-8';
// One colour for every column, the same maroon as single prices elsewhere.
const COLUMN_TONES = ['text-maroon', 'text-maroon'];

/** Column names for a category, or null when its items have one price each. */
export function priceColumns(items: MenuItem[]): string[] | null {
  const widest = items.reduce((most, item) => Math.max(most, item.variants?.length ?? 0), 0);
  if (widest < 2) return null;
  const labelled = items.find((item) => item.variants?.some((variant) => variant.label));
  return Array.from({ length: widest }, (_, i) => labelled?.variants?.[i]?.label ?? '');
}

/** The names above the columns, e.g. M (8") and L (12"). */
export function PriceColumnHeads({ labels }: { labels: string[] }) {
  if (labels.every((label) => !label)) return null;
  return (
    // Pulled down onto the first item, so the names read as the heads of its
    // prices rather than a separate row floating above the list.
    <div className={cn('-mb-3 flex justify-end', COLUMN_GAP)} aria-hidden="true">
      {labels.map((label, i) => {
        // 'M (8")' sets as the size name over its measurement.
        const [name, measure] = label.split(/\s*\((.*)\)$/);
        return (
          <span key={i} className={cn(COLUMN, COLUMN_TONES[i] ?? 'text-maroon')}>
            {/* The price face, a step larger, so the letter carries as a heading. */}
            <span className="block font-display text-2xl leading-none">{name}</span>
            {measure && <span className="mt-1 block text-xs text-ink-muted">{measure}</span>}
          </span>
        );
      })}
    </div>
  );
}

/**
 * A single menu item.
 *
 * Handles everything the data model allows: no price, a single price, or
 * several priced variants; dietary badges; sold-out and coming-soon states.
 */
export function MenuItemCard({ item, columns }: { item: MenuItem; columns?: string[] | null }) {
  const unavailable = item.available === false;
  const variants = item.variants ?? [];
  // Two prices with no size names: shown together as "₹110 / ₹140".
  const unlabelled = variants.length > 0 && variants.every((variant) => !variant.label);

  return (
    <article
      className={cn(
        'print-keep flex gap-5 border-b border-sand/70 py-6 last:border-b-0',
        unavailable && 'opacity-55',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-lg text-espresso">{item.name}</h3>

          {/* Dietary badges sit next to the name — they are safety information,
              not decoration, so they must not be buried below the description. */}
          {item.badges
            ?.filter((badge) => DIETARY_BADGES.includes(badge))
            .map((badge) => (
              <span
                key={badge}
                title={BADGE_LABELS[badge]}
                className={cn(
                  'inline-flex items-center rounded-full border px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider',
                  badge === 'non-veg'
                    ? 'border-terracotta/40 text-terracotta'
                    : 'border-green-700/30 text-green-800',
                )}
              >
                {BADGE_LABELS[badge]}
              </span>
            ))}
        </div>

        {item.description && (
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">{item.description}</p>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {item.badges
            ?.filter((badge) => !DIETARY_BADGES.includes(badge))
            .map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-gold/25 px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider text-maroon"
              >
                {BADGE_LABELS[badge]}
              </span>
            ))}

          {unavailable && (
            <span className="text-[0.7rem] uppercase tracking-wider text-ink-muted">
              {copy.menu.unavailable}
            </span>
          )}
        </div>
      </div>

      {/* Price column */}
      {columns && item.upcoming ? (
        // Centred across both columns, so it sits on the same axis as the
        // prices above it. Empty columns hold the width.
        <div className={cn('relative flex min-h-7 shrink-0', COLUMN_GAP)}>
          {columns.map((_, i) => (
            <span key={i} className={COLUMN} />
          ))}
          <span className="absolute inset-0 flex items-center justify-center">
            <ComingSoonBadge />
          </span>
        </div>
      ) : columns ? (
        <div className={cn('flex shrink-0', COLUMN_GAP)}>
          {columns.map((label, i) => {
            const price = variants.length > 0 ? variants[i]?.price : i === 0 ? item.price : undefined;
            return (
              <span
                key={i}
                className={cn(COLUMN, 'font-display text-lg tabular-nums', COLUMN_TONES[i] ?? 'text-maroon')}
              >
                {price !== undefined ? (
                  <>
                    {label && <span className="sr-only">{label} </span>}₹{price}
                  </>
                ) : (
                  // No price in this size. A dash says so rather than leaving
                  // a gap that reads as missing; softer than the prices.
                  <span className="opacity-60" aria-label={label ? `No ${label}` : 'No price'}>
                    &mdash;
                  </span>
                )}
              </span>
            );
          })}
        </div>
      ) : (
        <div className="shrink-0 text-right">
          {item.upcoming ? (
            <ComingSoonBadge />
          ) : unlabelled ? (
            <span className="whitespace-nowrap font-display text-lg tabular-nums text-maroon">
              {variants.map((variant) => `₹${variant.price}`).join(' / ')}
            </span>
          ) : variants.length > 0 ? (
            <ul className="space-y-1">
              {variants.map((variant) => (
                <li key={variant.label} className="whitespace-nowrap text-sm">
                  <span className="text-ink-muted">{variant.label}</span>{' '}
                  <span className="font-display tabular-nums text-maroon">₹{variant.price}</span>
                </li>
              ))}
            </ul>
          ) : item.price !== undefined ? (
            <span className="font-display text-lg tabular-nums text-maroon">₹{item.price}</span>
          ) : (
            <span className="text-sm text-ink-muted" aria-label="Price on request">
              &mdash;
            </span>
          )}
        </div>
      )}
    </article>
  );
}

/**
 * Same badge as the rooftop's on the home page. Shown in place of a price:
 * there is none to show until the item launches.
 */
function ComingSoonBadge() {
  return (
    <span className="inline-block whitespace-nowrap rounded-full bg-maroon px-2.5 py-0.5 text-[0.6rem] uppercase tracking-wider text-cream">
      {copy.menu.comingSoon}
    </span>
  );
}
