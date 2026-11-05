import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { BotanicalMotif } from '@/components/ui/ArchPanel';
import { ButtonLink } from '@/components/ui/Button';
import { ContactDetails } from '@/components/ui/ContactDetails';
import { MapPinIcon } from '@/components/ui/Icons';
import { Section } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { hasAnyContactDetail, resolve, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Visit Us',
  description: 'Find The Maven’s in Chirawa, Rajasthan — café, bakery and desserts.',
  alternates: { canonical: '/contact' },
};

/**
 * Visit Us.
 *
 * There is deliberately no enquiry form. V1 has no email service wired up, and
 * a form that silently discards what someone types is worse than no form at
 * all — it costs a customer their message and their goodwill. When contact
 * channels go live, the direct links below are faster for everyone anyway.
 */
export default function ContactPage() {
  const hasDetails = hasAnyContactDetail();
  const maps = resolve(site.contact.maps);
  const mapsEmbed = resolve(site.contact.mapsEmbed);

  return (
    <>
      <PageHeader eyebrow="Find us" title={copy.contact.title} lead={copy.contact.lead} />

      <Section tone="cream" containerSize="default">
        {!hasDetails && (
          <div className="mb-14 rounded-2xl border border-gold/40 bg-gold/10 px-7 py-6">
            <p className="text-sm leading-relaxed text-espresso">{copy.contact.pendingNotice}</p>
          </div>
        )}

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <ContactDetails />

            <p className="mt-10 border-t border-sand pt-7 text-sm leading-relaxed text-ink-muted">
              {copy.contact.noFormNote}
            </p>

            {maps && (
              <div className="mt-8">
                <ButtonLink href={maps}>{copy.contact.labels.directions}</ButtonLink>
              </div>
            )}
          </div>

          {/*
            The map.

            Uses Google's keyless `output=embed` form — no API key, no billing
            account, which keeps the zero-cost constraint intact. It is pinned
            by ADDRESS rather than coordinates, because no verified coordinates
            exist yet and a guessed pin sends people to the wrong street.

            `loading="lazy"` matters here: this is the one third-party frame on
            the site, and it should not compete with the page's own content for
            bandwidth on a phone. The CSP in netlify.toml allows exactly these
            two Google hosts in `frame-src` and nothing else.
          */}
          <div className="mask-arch relative min-h-[380px] overflow-hidden border border-sand bg-cream-deep">
            {mapsEmbed ? (
              <iframe
                src={mapsEmbed}
                title={`Map showing ${site.name} in ${site.location}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <div className="flex h-full min-h-[380px] flex-col items-center justify-center p-10 text-center">
                <BotanicalMotif className="pointer-events-none absolute -bottom-12 -right-10 h-64 w-auto text-maroon/[0.06]" />
                <div className="relative">
                  <MapPinIcon className="mx-auto h-10 w-10 text-maroon/40" />
                  <p className="eyebrow mt-5 text-maroon/60">{site.location}</p>
                  <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
                    Our exact address and map will appear here once confirmed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
