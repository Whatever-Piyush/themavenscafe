import { Section, SectionHeading } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { site } from '@/content/site';

/**
 * The four brand pillars: Premium · Fresh · Handcrafted · Always.
 *
 * These four words are the cafe's own, taken from their brand materials. The
 * one-line expansions describe what each word commits to in practice — they
 * make no claim the brand has not already made about itself.
 */
export function Pillars() {
  return (
    <Section tone="maroon" fluted>
      <SectionHeading
        eyebrow={copy.home.pillars.eyebrow}
        title={copy.home.pillars.title}
        lead={copy.home.pillars.lead}
        tone="dark"
      />

      <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {site.pillars.map((pillar, index) => (
          <li key={pillar} className="relative">
            {/* Hairline separator between columns on wide screens. */}
            {index > 0 && (
              <span
                className="absolute -left-5 top-1 hidden h-full w-px bg-cream/12 lg:block"
                aria-hidden="true"
              />
            )}

            <span className="font-display text-sm text-gold" aria-hidden="true">
              0{index + 1}
            </span>

            <h3 className="mt-3 font-display text-xl text-cream">{pillar}</h3>

            <div className="mt-4 h-px w-8 bg-gold/40" />

            <p className="mt-4 text-sm leading-relaxed text-cream-muted">
              {copy.home.pillars.descriptions[pillar]}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
