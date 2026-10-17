import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for The Maven’s website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of use" lead="The ground rules for using this website." />

      <Section tone="cream" containerSize="narrow">
        <div className="space-y-10 text-lg leading-relaxed text-ink-muted">
          <section>
            <h2 className="font-display text-2xl text-espresso">About this website</h2>
            <p className="mt-4">
              This site provides information about {site.name}, a café, bakery and dessert room in{' '}
              {site.location}. It is informational only — you cannot place an order, make a booking or pay for
              anything through it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Accuracy</h2>
            <p className="mt-4">
              We keep the information here as accurate as we can, and where a detail is not yet confirmed we mark
              it as coming soon rather than guessing. Even so, menus, prices and opening hours change. Please
              treat anything on this site as a guide rather than a guarantee, and check with us directly if
              something matters to your visit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Allergies and dietary requirements</h2>
            <p className="mt-4">
              Where dietary information is shown it is provided in good faith, but our kitchen handles nuts,
              dairy, gluten and eggs, and we cannot guarantee that any item is free from traces of an allergen. If
              you have an allergy or intolerance, please speak to us in person before ordering. Do not rely on
              this website alone.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Our content</h2>
            <p className="mt-4">
              {/* No article before {site.name} — the name already begins with "The". */}
              {site.name} name, logo, photography and written content on this site belong to us. Please do not
              reproduce them commercially without asking first. You are of course welcome to share a link, or to
              post your own photographs of your visit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Links to other sites</h2>
            <p className="mt-4">
              Where we link to another website — a map, or a social media profile — we are not responsible for
              its content or its privacy practices.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Changes</h2>
            <p className="mt-4">
              We may update these terms as the site grows. The version published here is the one that applies.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
