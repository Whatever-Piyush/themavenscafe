import { ButtonLink } from '@/components/ui/Button';
import { ArchPanel } from '@/components/ui/ArchPanel';
import { Section } from '@/components/ui/Section';
import { copy } from '@/content/copy';

export function Story() {
  return (
    <Section tone="cream" id="story">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-4 text-maroon/70">{copy.home.story.eyebrow}</p>

          <h2 className="text-2xl sm:text-3xl">{copy.home.story.title}</h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted">
            {copy.home.story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <ButtonLink href="/about" variant="secondary">
              {copy.home.story.cta}
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <ArchPanel
            label="An arched niche in the cafe, lit from above"
            className="aspect-[4/5] w-full"
          />

          {/* Overlapping tagline card — a layered detail that keeps the section
              from reading as two plain columns. */}
          <div className="absolute -bottom-6 -left-4 max-w-[230px] rounded-xl bg-maroon px-6 py-5 text-cream shadow-lift sm:-left-8">
            <p className="font-script text-2xl leading-tight text-gold">Good Food</p>
            <p className="font-script text-2xl leading-tight text-gold">Better Moods</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
