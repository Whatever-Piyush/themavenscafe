import { cn } from '@/lib/cn';
import { BotanicalMotif } from './ArchPanel';

/**
 * The "coming soon" state.
 *
 * Used wherever real information does not exist yet — the menu, photography,
 * contact details. It is deliberately designed rather than apologetic: a
 * considered empty state reads as a business being careful, while a greyed-out
 * box with "TBD" reads as an unfinished website.
 *
 * The alternative — inventing plausible content — was rejected outright. Fake
 * prices and fictional opening hours on a real cafe's site mislead customers.
 */
export function ComingSoon({
  title,
  copy,
  tone = 'cream',
  className,
  children,
}: {
  title: string;
  copy?: string;
  tone?: 'cream' | 'maroon';
  className?: string;
  children?: React.ReactNode;
}) {
  const onMaroon = tone === 'maroon';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-14 sm:py-20',
        onMaroon ? 'bg-maroon text-cream' : 'border border-sand bg-cream-deep/50 text-espresso',
        className,
      )}
    >
      <BotanicalMotif
        className={cn(
          'pointer-events-none absolute -right-12 -top-10 h-52 w-auto rotate-12',
          onMaroon ? 'text-gold/10' : 'text-maroon/[0.07]',
        )}
      />
      <BotanicalMotif
        className={cn(
          'pointer-events-none absolute -bottom-16 -left-12 h-48 w-auto -rotate-[20deg]',
          onMaroon ? 'text-gold/10' : 'text-maroon/[0.06]',
        )}
      />

      <div className="relative mx-auto max-w-lg">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className={cn('h-px w-8', onMaroon ? 'bg-gold/50' : 'bg-maroon/25')} />
          <span className={cn('text-xs', onMaroon ? 'text-gold' : 'text-maroon/50')} aria-hidden="true">
            &#10022;
          </span>
          <span className={cn('h-px w-8', onMaroon ? 'bg-gold/50' : 'bg-maroon/25')} />
        </div>

        <h2 className={cn('font-display text-2xl sm:text-3xl', onMaroon ? 'text-cream' : 'text-espresso')}>
          {title}
        </h2>

        {copy && (
          <p className={cn('mt-5 leading-relaxed', onMaroon ? 'text-cream-muted' : 'text-ink-muted')}>{copy}</p>
        )}

        {children && <div className="mt-9">{children}</div>}
      </div>
    </div>
  );
}

/** Inline "Coming soon" for a single missing value in a list of details. */
export function PendingValue({ className }: { className?: string }) {
  return (
    <span className={cn('text-ink-muted/70 italic', className)}>Coming soon</span>
  );
}
