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
            Map panel.

            No embed while the street address is unknown. Guessing coordinates
            for a real business would send real customers somewhere wrong.
          */}
          <div className="mask-arch relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden border border-sand bg-cream-deep p-10 text-center">
            <BotanicalMotif className="pointer-events-none absolute -bottom-12 -right-10 h-64 w-auto text-maroon/[0.06]" />

            <div className="relative">
              <MapPinIcon className="mx-auto h-10 w-10 text-maroon/40" />
              <p className="eyebrow mt-5 text-maroon/60">{site.location}</p>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
                {maps
                  ? 'Open the map for directions.'
                  : 'Our exact address and map will appear here once confirmed.'}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
