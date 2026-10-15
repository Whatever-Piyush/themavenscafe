import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ArchPanel } from '@/components/ui/ArchPanel';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'A café, bakery and dessert room in Chirawa, Rajasthan. Baked on the premises every morning, with a rooftop terrace open to the sky.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={copy.about.title} lead={copy.about.lead} />

      <Section tone="cream" containerSize="default">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="space-y-14">
            {copy.about.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="font-display text-2xl text-espresso">{section.heading}</h2>
                <div className="mt-4 h-px w-12 bg-gold/50" />
                <p className="mt-6 text-lg leading-relaxed text-ink-muted">{section.body}</p>
              </article>
            ))}
          </div>

          <aside className="lg:pt-4">
            <ArchPanel label="An arched niche with botanical line work" className="aspect-[3/4] w-full" />

            <div className="mt-10 rounded-2xl border border-sand bg-cream-deep/40 p-7">
              <p className="eyebrow text-maroon/60">Our standard</p>
              <ul className="mt-5 space-y-3">
                {site.pillars.map((pillar) => (
                  <li key={pillar} className="flex items-baseline gap-3">
                    <span className="text-xs text-gold" aria-hidden="true">
                      &#10022;
                    </span>
                    <span className="text-sm text-espresso">
                      <span className="font-medium">{pillar}</span>
                      <span className="text-ink-muted"> — {copy.home.pillars.descriptions[pillar]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <p className="font-script text-3xl text-maroon">{site.tagline}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <ButtonLink href="/menu">View the menu</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Visit us
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
