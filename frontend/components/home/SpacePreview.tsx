import { ButtonLink } from '@/components/ui/Button';
import { ArchPanel } from '@/components/ui/ArchPanel';
import { Section, SectionHeading } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { spaces } from '@/content/gallery';

/**
 * The three floors, with the terrace given the most weight.
 *
 * A rooftop terrace is the genuine differentiator for a cafe in a small town —
 * it makes the place a destination rather than a coffee stop — so it gets the
 * tall panel and the maroon ground while the other two sit beside it.
 */
export function SpacePreview() {
  return (
    <Section tone="creamDeep" fluted>
      <SectionHeading eyebrow={copy.home.space.eyebrow} title={copy.home.space.title} lead={copy.home.space.lead} />

      <div className="grid gap-8 md:grid-cols-3">
        {spaces.map((space) => (
          <article key={space.name} className={space.feature ? 'md:row-span-2' : undefined}>
            <ArchPanel
              label={space.imageIntent}
              tone={space.feature ? 'maroon' : 'sand'}
              className={space.feature ? 'aspect-[3/4] w-full' : 'aspect-[4/3] w-full'}
            />

            <div className="mt-6">
              <p className="eyebrow text-maroon/60">{space.floor}</p>
              <h3 className="mt-2 font-display text-xl text-espresso">{space.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{space.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 text-center">
        <ButtonLink href="/gallery" variant="secondary">
          {copy.home.space.cta}
        </ButtonLink>
      </div>
    </Section>
  );
}
