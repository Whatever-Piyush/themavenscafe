import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { resolve, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How The Mavens Cafe website handles your data — in short, it does not collect any.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

/**
 * Privacy policy.
 *
 * Unusually short, because it is accurate: this version of the site has no
 * forms, no accounts, no analytics, no advertising and no cookies. There is
 * genuinely nothing collected, so the honest policy is a brief one.
 *
 * If analytics, a contact form, or any embed is ever added, this page must be
 * updated in the same change. A privacy policy that describes a previous
 * version of a site is worse than none.
 */
export default function PrivacyPage() {
  const email = resolve(site.contact.email);

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        lead="The short version: this website does not collect your personal data."
      />

      <Section tone="cream" containerSize="narrow">
        <div className="space-y-10 text-lg leading-relaxed text-ink-muted">
          <section>
            <h2 className="font-display text-2xl text-espresso">What we collect</h2>
            <p className="mt-4">
              Nothing. This website has no contact form, no accounts, no newsletter sign-up and no shopping
              basket. We do not ask you for your name, email address, phone number or any other personal detail,
              so there is nothing for us to store.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Cookies and tracking</h2>
            <p className="mt-4">
              This website sets no cookies. It runs no analytics, no advertising pixels and no third-party
              trackers, and it does not attempt to identify you or follow you across other websites. That is also
              why you have not been shown a cookie banner — there is nothing to consent to.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Fonts and external services</h2>
            <p className="mt-4">
              The typefaces used here are downloaded when the site is built and served from our own domain, so
              your browser never contacts a font provider and your IP address is never shared with one. No part of
              this website loads content from another company&rsquo;s servers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Hosting</h2>
            <p className="mt-4">
              The site is hosted by Vercel, which — like any web host — processes standard technical request
              information such as IP addresses in order to serve pages and protect against abuse. We do not have
              access to that data in a form that identifies you, and we do not combine it with anything else.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Visiting us in person</h2>
            <p className="mt-4">
              If you contact us by phone or on social media, that conversation is covered by the relevant phone or
              platform provider rather than by this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Changes</h2>
            <p className="mt-4">
              If we add a contact form, analytics or any other feature that collects information, this page will be
              updated at the same time to describe exactly what changed and why.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-espresso">Questions</h2>
            <p className="mt-4">
              {email ? (
                <>
                  Write to us at{' '}
                  <a
                    href={`mailto:${email}`}
                    className="text-maroon underline decoration-gold/50 underline-offset-4 hover:decoration-maroon"
                  >
                    {email}
                  </a>
                  .
                </>
              ) : (
                <>Our contact details will be published on this site shortly.</>
              )}
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
