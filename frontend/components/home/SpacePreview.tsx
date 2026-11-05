import { ButtonLink } from '@/components/ui/Button';
import { ArchPanel } from '@/components/ui/ArchPanel';
import { Photo } from '@/components/ui/Photo';
import { Section, SectionHeading } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { spaces } from '@/content/gallery';

/**
 * The three floors, as three equal cards.
 *
 * The rooftop used to get a taller panel and a row-span to mark it out as the
 * differentiator, but that left its heading and copy sitting far below the
 * other two and the row read as broken rather than emphasised. Same aspect
 * ratio across all three now, so the headings line up.
 *
 * The rooftop keeps the maroon ground — that still separates it from the two
 * rooms that exist, and it pairs with the badge rather than competing with it.
 *
 * The "Coming soon" badge is not decoration: the terrace does NOT exist yet,
 * and a planned space described warmly enough reads as somewhere you could ask
 * to sit tonight. The status belongs on the card, not buried in the prose.
 */
export function SpacePreview() {
  return (
    <Section tone="creamDeep" fluted>
      <SectionHeading eyebrow={copy.home.space.eyebrow} title={copy.home.space.title} lead={copy.home.space.lead} />

      <div className="grid gap-8 md:grid-cols-3">
        {spaces.map((space) => (
          <article key={space.name}>
            {space.photo ? (
              // Same arch and ratio as the motif panels beside it, so the row
              // still lines up. The source is portrait, so the 4:3 crop sits a
              // little below centre: tables, the lit arch and the counter.
              <div className="mask-arch relative overflow-hidden shadow-lift">
                <Photo
                  {...space.photo}
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="aspect-[4/3] w-full object-cover object-[50%_62%]"
                />
                {/* The same soft overhead light the motif panels carry. */}
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(248,244,238,0.22),transparent_65%)]"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <ArchPanel
                label={space.imageIntent}
                tone={space.upcoming ? 'maroon' : 'sand'}
                className="aspect-[4/3] w-full"
              />
            )}

            <div className="mt-6">
              <p className="eyebrow flex items-center gap-2.5 text-maroon/60">
                {space.floor}
                {space.upcoming && (
                  <span className="rounded-full bg-maroon px-2.5 py-0.5 text-[0.6rem] tracking-wider text-cream">
                    Coming soon
                  </span>
                )}
              </p>
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
