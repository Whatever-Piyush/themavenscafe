import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { HeroWordmark } from '@/components/ui/Wordmark';
import { copy } from '@/content/copy';
import { site } from '@/content/site';

/**
 * The maroon hero.
 *
 * Depth is built from the brand palette rather than a photograph: a maroon
 * ground, a warm pool of light echoing the pendant lamps, the fluted wall
 * texture from the cafe's panelling, and a vignette to hold the centre.
 *
 * That is a deliberate choice, not a placeholder. The only photography we have
 * is third-party watermarked reference material that cannot be published, so
 * the hero is designed to look finished without it — and real imagery can be
 * layered in behind this later without rebuilding the section.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-maroon pb-40 pt-32 text-cream">
      {/* Layer 1 — the fluted wall */}
      <div className="texture-fluted-light pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Layer 2 — warm light from above */}
      <div className="glow-warm pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Layer 3 — vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(74,20,32,0.7)_100%)]"
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center">
        <div className="animate-mark-settle">
          <HeroWordmark />
        </div>

        <p className="font-script animate-fade-up delay-3 mt-9 text-3xl text-cream sm:text-4xl">{site.tagline}</p>

        <div className="animate-fade-up delay-4 mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/menu" variant="onMaroon">
            {copy.home.hero.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="/contact" variant="onMaroonGhost">
            {copy.home.hero.ctaSecondary}
          </ButtonLink>
        </div>

        {/* Brand pillars */}
        <ul className="animate-fade-in delay-5 mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          {site.pillars.map((pillar, index) => (
            <li key={pillar} className="flex items-center gap-5">
              <span className="eyebrow text-cream/55">{pillar}</span>
              {index < site.pillars.length - 1 && (
                <span className="text-gold/40" aria-hidden="true">
                  &#10022;
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>

      {/* Scroll cue */}
      <div
        className="animate-scroll-cue absolute bottom-28 left-1/2 z-10 -translate-x-1/2 text-cream/60"
        aria-hidden="true"
      >
        <svg width="22" height="30" viewBox="0 0 22 30" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="1" y="1" width="20" height="28" rx="10" />
          <circle cx="11" cy="9" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      </div>

      <ArchTransition />
    </section>
  );
}

/**
 * The maroon-to-cream transition.
 *
 * Three layers doing three jobs:
 *
 *   1. A gradient band carrying maroon down into shadow, so the change begins
 *      as a fade rather than arriving as an edge.
 *   2. An arch cut out of the cream, rising into the maroon.
 *   3. A gold hairline tracing that arch, matching the brass detailing on the
 *      cafe's own arched niches.
 *
 * The arch is what makes this read as architecture rather than as a CSS
 * gradient. It is also pure CSS and SVG — no scroll listener, no animation
 * library, no layout shift — and it behaves identically with JavaScript off,
 * which matters because it is the first thing anyone sees.
 */
function ArchTransition() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0" aria-hidden="true">
      <div className="h-40 bg-gradient-to-b from-transparent via-maroon-deep/40 to-maroon-deep/70" />

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[70px] w-full sm:h-[100px]"
        role="presentation"
      >
        <path d="M0,120 L0,96 Q720,-28 1440,96 L1440,120 Z" className="fill-cream" />
      </svg>

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 block h-[70px] w-full sm:h-[100px]"
        role="presentation"
      >
        <path
          d="M0,96 Q720,-28 1440,96"
          fill="none"
          stroke="#D4B483"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
