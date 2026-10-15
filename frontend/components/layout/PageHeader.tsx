import { Container } from '@/components/ui/Container';
import { BotanicalMotif } from '@/components/ui/ArchPanel';

/**
 * The maroon banner at the top of every inner page.
 *
 * Carries the hero's colour story onto the rest of the site: a maroon band,
 * then the same arched cut into cream. Shorter than the home hero, so it frames
 * the page rather than competing with its content.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-maroon pb-32 pt-36 text-cream sm:pb-36 sm:pt-44">
      <div className="texture-fluted-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="glow-warm pointer-events-none absolute inset-0" aria-hidden="true" />
      <BotanicalMotif className="pointer-events-none absolute -right-16 top-10 h-64 w-auto text-gold/[0.08]" />

      <Container className="relative z-10 text-center">
        {eyebrow && <p className="eyebrow animate-fade-up text-gold/90">{eyebrow}</p>}

        <h1 className="animate-fade-up delay-1 mt-4 font-display text-3xl text-cream sm:text-4xl">{title}</h1>

        <div className="animate-fade-up delay-2 mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-xs text-gold" aria-hidden="true">
            &#10022;
          </span>
          <span className="h-px w-10 bg-gold/50" />
        </div>

        {lead && (
          <p className="animate-fade-up delay-3 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream-muted">
            {lead}
          </p>
        )}
      </Container>

      {/* The same arch that closes the home hero. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-[50px] w-full sm:h-[70px]"
          role="presentation"
        >
          <path d="M0,90 L0,72 Q720,-20 1440,72 L1440,90 Z" className="fill-cream" />
        </svg>
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 block h-[50px] w-full sm:h-[70px]"
          role="presentation"
        >
          <path
            d="M0,72 Q720,-20 1440,72"
            fill="none"
            stroke="#D4B483"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
