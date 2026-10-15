import { cn } from '@/lib/cn';
import { site } from '@/content/site';

/**
 * Brand marks.
 *
 * Built typographically from Playfair Display rather than reproducing the
 * cafe's custom-lettered logo, which exists only as raster artwork. This
 * recreates the LOCKUP — cup mark, wordmark, letter-spaced descriptor — without
 * passing itself off as the artwork.
 *
 * When a vector logo is supplied, replacing this one component updates the mark
 * everywhere it appears.
 */

/** The cup, steam and wheat mark. */
export function CupMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn('h-full w-full', className)}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Steam */}
      <path d="M20 13c0-2.2 2-2.6 2-4.6S20 6 20 4" opacity="0.9" />
      <path d="M26 13c0-2.6 2.4-3 2.4-5.4S26 4.6 26 2.4" opacity="0.75" />
      {/* Wheat ear — the bakery half of the identity */}
      <path d="M11 19c0-4.4 2-7.6 5-9.4" opacity="0.85" />
      <path
        d="M13.4 13.6c-1.6-.6-3.2-.2-4 1.2M15.6 11c-1.4-1-3-1-4.2.2M12.2 16.8c-1.8-.2-3.2.6-3.6 2.2"
        opacity="0.85"
      />
      {/* Cup */}
      <path d="M12 22h22v6a9 9 0 0 1-9 9h-4a9 9 0 0 1-9-9v-6Z" />
      <path d="M34 24.5h2.5a4 4 0 0 1 0 8H34" />
      {/* Saucer */}
      <path d="M9 41h28" opacity="0.6" />
    </svg>
  );
}

/**
 * The hero lockup: mark, uppercase wordmark, descriptor rule.
 * Large, centred and cinematic — used once per page at most.
 */
export function HeroWordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <span className="block h-16 w-16 text-gold sm:h-20 sm:w-20">
        <CupMark />
      </span>

      <h1 className="mt-6 font-display text-4xl font-medium uppercase leading-none tracking-[0.1em] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
        {site.wordmark}
      </h1>

      {/* Gold rule and diamond, as set on the signage. */}
      <div className="mt-6 flex w-full max-w-md items-center gap-4">
        <span className="h-px flex-1 bg-gold/40" />
        <span className="text-xs text-gold" aria-hidden="true">
          &#10022;
        </span>
        <span className="h-px flex-1 bg-gold/40" />
      </div>

      <p className="eyebrow mt-5 text-gold/90">{site.descriptor}</p>
    </div>
  );
}

/** The compact lockup used in the header and footer. */
export function Wordmark({
  className,
  tone = 'maroon',
}: {
  className?: string;
  tone?: 'maroon' | 'cream';
}) {
  const onCream = tone === 'maroon';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className={cn('block h-9 w-9 shrink-0', onCream ? 'text-maroon' : 'text-gold')}>
        <CupMark />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-medium tracking-tight',
            onCream ? 'text-maroon' : 'text-cream',
          )}
        >
          {site.name}
        </span>
        <span
          className={cn('eyebrow mt-1 text-[0.5rem]', onCream ? 'text-ink-muted' : 'text-cream/60')}
          aria-hidden="true"
        >
          {site.descriptor}
        </span>
      </span>
    </span>
  );
}
