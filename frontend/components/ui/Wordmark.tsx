import Image from 'next/image';
import { cn } from '@/lib/cn';
import { site } from '@/content/site';

/**
 * Brand marks.
 *
 * The cup-and-wheat mark is the real signage artwork, extracted from the sign
 * photograph and used everywhere on the site — hero, header, footer, 404 and
 * the craft cards. The wordmark beside it is set in Playfair Display, which
 * matches the lettering's high-contrast skeleton without claiming to be the
 * custom typeface.
 *
 * One asset serves every position and colour: see CupMark below. If a vector
 * logo ever arrives, swapping the file at
 * `public/images/brand/cup-mark.png` updates the mark site-wide.
 */

/**
 * The cup, wheat and steam mark — the real signage artwork.
 *
 * Lifted from the high-resolution sign photograph: the maroon ground removed
 * with a soft alpha ramp across the bevel so edges stay anti-aliased, the
 * wordmark beneath it masked away, and the result flattened to a single colour.
 *
 * Rendered through a CSS mask rather than as an <img>, because the site needs
 * this mark in cream-gold on maroon AND in maroon on cream. The mask paints
 * `background-color` through the PNG's alpha, so `bg-current` picks up whatever
 * `text-*` colour the call site sets — one asset, any colour, nothing to keep
 * in sync.
 *
 * Decorative in every position: each call site pairs it with visible text, so
 * it is hidden from assistive technology rather than announced twice.
 *
 * Give it a height; the aspect ratio in `.mask-cup-mark` supplies the width.
 */
export function CupMark({ className }: { className?: string }) {
  // No `bg-current` here — the fill lives inside an @supports guard in
  // globals.css so an unsupported mask degrades to invisible, not a solid block.
  return <span aria-hidden="true" className={cn('mask-cup-mark block', className)} />;
}

/**
 * The hero lockup: mark, uppercase wordmark, descriptor rule.
 * Large, centred and cinematic — used once per page at most.
 *
 * The mark here is the ACTUAL signage artwork, not the SVG approximation used
 * elsewhere. It was lifted from the high-resolution sign photograph, had its
 * maroon ground removed with a soft alpha ramp across the bevel (so the edges
 * stay anti-aliased rather than developing a halo) and was flattened to a single
 * brand cream-gold — the photograph's own lighting gradient would have read as a
 * pasted photo on a flat page.
 *
 * `alt=""` is deliberate: the mark is decorative, and the business name is
 * already carried by the <h1> below it. Giving it alt text would make a screen
 * reader announce the name twice.
 */
export function HeroWordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <Image
        src="/images/brand/cup-mark.png"
        alt=""
        width={210}
        height={239}
        priority
        className="h-16 w-auto sm:h-20"
      />

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
      <CupMark className={cn('h-9 shrink-0', onCream ? 'text-maroon' : 'text-gold-light')} />

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
