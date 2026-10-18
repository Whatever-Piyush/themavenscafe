import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Section } from '@/components/ui/Section';
import { copy } from '@/content/copy';

export function Story() {
  /**
   * `pb-28 sm:pb-36` gives the section extra bottom room so the tagline card
   * can hang past the photo without colliding with the Signature section below.
   * The Section default (py-20 / sm:py-28) leaves only 80px on mobile and the
   * card overhangs 64px — without this the glass would end up blurring the next
   * section's background instead of the photograph, which breaks the effect.
   *
   * Keep these two in step: if the card's -bottom-* changes, this padding
   * should move with it, or the whitespace below stops matching the overhang.
   */
  return (
    <Section tone="cream" id="story" className="pb-28 sm:pb-36">
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

          {/*
            Overlapping tagline card — a layered detail that keeps the section
            from reading as two plain columns.

            Frosted maroon glass: a 40% tint so the panel keeps the brand colour,
            over a backdrop dimmed to 75%.

            Those two numbers trade against each other, which is the thing to
            understand before changing either. Real frosted glass DARKENS the
            scene behind it, and that dimming — not opacity — is what holds the
            thin gold script legible. So more tint buys back colour and allows
            LESS dimming, letting more of the photograph read through; less tint
            needs more dimming to compensate. Measured against the brightest part
            of the floor behind the card, this pairing lands at ~4.5:1, well
            clear of the 3:1 that large text needs.

            Push the tint below ~30% without also dropping the brightness and the
            text stops being readable — at 30%/100% it measures 2.65:1 and fails.

            The rest is the physics of glass rather than more blur: a bright
            inner edge along the top where light catches it, a specular sheen
            falling across the top-left, a lifted cream border, and a boost to
            saturation so colours read richer through it.

            It degrades honestly. `backdrop-filter` IS the effect — without it a
            40%-tinted panel over a photograph has no blur and no dimming to help
            it, so every transparent property sits inside
            `supports-[backdrop-filter]`. Browsers that cannot blur get a
            near-opaque card (85%), not a broken one.
          */}
          <div
            className="absolute -bottom-16 -left-4 max-w-[230px] overflow-hidden rounded-2xl border border-cream/30
                       bg-maroon/85 px-6 py-5 sm:-left-8
                       shadow-[0_10px_36px_-10px_rgba(43,26,23,0.5),inset_0_1px_0_0_rgba(248,244,238,0.45)]
                       supports-[backdrop-filter]:bg-maroon/40
                       supports-[backdrop-filter]:backdrop-blur-2xl
                       supports-[backdrop-filter]:backdrop-brightness-75
                       supports-[backdrop-filter]:backdrop-saturate-[1.6]
                       before:pointer-events-none before:absolute before:inset-0
                       before:bg-gradient-to-br before:from-cream/25 before:via-cream/5 before:to-transparent"
          >
            {/* `relative` lifts the text above the ::before sheen. */}
            <p className="relative font-script text-2xl leading-tight text-gold-light">Good Food</p>
            <p className="relative font-script text-2xl leading-tight text-gold-light">Better Moods</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
