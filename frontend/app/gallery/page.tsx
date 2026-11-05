import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { PageHeader } from '@/components/layout/PageHeader';
import { ArchPanel } from '@/components/ui/ArchPanel';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { Section } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { isGalleryPending, spaces } from '@/content/gallery';

export const metadata: Metadata = {
  title: 'The Space',
  description:
    'The Maven’s in Chirawa — a ground-floor counter and dessert display, the kitchen above it, and a rooftop terrace to come.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  const pending = isGalleryPending();

  return (
    <>
      <PageHeader eyebrow="Chirawa, Rajasthan" title={copy.gallery.title} lead={copy.gallery.lead} />

      <Section tone="cream" containerSize="wide">
        {pending ? (
          <>
            <ComingSoon title={copy.gallery.pendingTitle} copy={copy.gallery.pendingCopy} />

            {/*
              The space described in words and brand motif while photography is
              pending. Each panel carries the accessible description of the
              photograph that will eventually replace it.
            */}
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {spaces.map((space) => (
                <article key={space.name}>
                  <ArchPanel
                    label={space.imageIntent}
                    tone={space.upcoming ? 'maroon' : 'sand'}
                    className="aspect-[4/5] w-full"
                  />
                  <div className="mt-6">
                    <p className="eyebrow flex items-center gap-2.5 text-maroon/60">
                      {space.floor}
                      {space.upcoming && (
                        <span className="rounded-full bg-maroon px-2.5 py-0.5 text-[0.6rem] tracking-wider text-cream">
                          Coming soon
                        </span>
                      )}
                    </p>
                    <h2 className="mt-2 font-display text-xl text-espresso">{space.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{space.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <GalleryGrid />
        )}
      </Section>
    </>
  );
}
