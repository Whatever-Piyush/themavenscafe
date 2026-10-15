import { cn } from '@/lib/cn';

/**
 * An arch-shaped panel — the recurring niche shape from the cafe's walls.
 *
 * Doubles as the interim image placeholder while the photography rights
 * question is open. It renders the botanical line-art motif on a warm ground,
 * which is a deliberate art-directed stand-in rather than a grey box: the page
 * looks finished today, and swapping in a real photograph later is a one-line
 * change at the call site.
 */
export function ArchPanel({
  className,
  label,
  tone = 'sand',
}: {
  className?: string;
  /** Describes what will eventually live here. Also the accessible name. */
  label: string;
  tone?: 'sand' | 'maroon';
}) {
  const grounds = {
    sand: 'bg-gradient-to-b from-sand to-cream-deep text-maroon/15',
    maroon: 'bg-gradient-to-b from-maroon-soft to-maroon-deep text-gold/20',
  };

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'mask-arch relative flex items-center justify-center overflow-hidden shadow-lift',
        grounds[tone],
        className,
      )}
    >
      <BotanicalMotif className="absolute -right-8 bottom-0 h-[78%] w-auto" />

      {/* Soft overhead light, matching the cove lighting in the niches. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(248,244,238,0.5),transparent_65%)]"
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * The fanned-leaf line drawing painted inside the cafe's arches.
 * Reused across the site as a quiet brand watermark.
 */
export function BotanicalMotif({ className }: { className?: string }) {
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const angle = -72 + i * 18;
    return (
      <g key={i} transform={`rotate(${angle} 100 180)`}>
        <path
          d="M100 180 C 86 128, 90 76, 100 36 C 110 76, 114 128, 100 180 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M100 168 L100 48" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.65" />
      </g>
    );
  });

  return (
    <svg viewBox="0 0 200 190" className={className} aria-hidden="true" fill="none">
      {leaves}
    </svg>
  );
}
