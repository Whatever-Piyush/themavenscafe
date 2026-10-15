import { BADGE_LABELS, DIETARY_BADGES, type MenuItem } from '@/content/menu';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';

/**
 * A single menu item.
 *
 * Handles everything the data model allows: no price, a single price, or
 * several priced variants; dietary badges; sold-out state. Built now so that
 * dropping in the real menu requires no component work.
 */
export function MenuItemCard({ item }: { item: MenuItem }) {
  const unavailable = item.available === false;

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
      <div className="shrink-0 text-right">
        {item.variants && item.variants.length > 0 ? (
          <ul className="space-y-1">
            {item.variants.map((variant) => (
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
    </article>
  );
}
