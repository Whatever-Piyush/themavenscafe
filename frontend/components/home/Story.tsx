import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
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
          {/*
            The storefront at dusk, held inside the arch motif.

            The arch is doing real work here, not decoration: the cafe's own
            interior is built around arched niches, so framing the photograph
            the same way makes the section feel like part of the building rather
            than a picture dropped onto a page.

            Cropped from the TOP (`object-top`). The source is 2:3 and the frame
            is 3:4, so something has to go — and the illuminated sign is the
            whole point of the shot while the foreground pavement is the least
            interesting part of it.
          */}
          <div className="mask-arch relative overflow-hidden shadow-lift">
            <Photo
              src="/images/space/storefront-dusk"
              alt="The Maven's at dusk — the illuminated storefront sign above an open frontage, with arched niches, chandeliers and the dessert counter glowing inside"
              width={1024}
              height={1536}
              widths={[640, 1024]}
              sizes="(min-width: 1024px) 36rem, 92vw"
              className="aspect-[3/4] w-full object-cover object-top"
            />

            {/* A soft warm floor so the tagline card lands on tone rather than
                on whatever pixels happen to be underneath it. */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/45 to-transparent"
              aria-hidden="true"
            />
          </div>

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
