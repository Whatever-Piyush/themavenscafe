import { ButtonLink } from '@/components/ui/Button';
import { ContactDetails } from '@/components/ui/ContactDetails';
import { MapPinIcon } from '@/components/ui/Icons';
import { BotanicalMotif } from '@/components/ui/ArchPanel';
import { Section, SectionHeading } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { hasAnyContactDetail, resolve, site } from '@/content/site';

export function VisitUs() {
  const hasDetails = hasAnyContactDetail();
  const maps = resolve(site.contact.maps);

  return (
    <Section tone="cream" id="visit">
      <SectionHeading
        eyebrow={copy.home.visit.eyebrow}
        title={copy.home.visit.title}
        lead={hasDetails ? copy.home.visit.lead : copy.home.visit.leadPending}
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <ContactDetails />

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact" variant="primary">
              Visit us
            </ButtonLink>
            {maps && (
              <ButtonLink href={maps} variant="secondary">
                {copy.contact.labels.directions}
              </ButtonLink>
            )}
          </div>
        </div>

        {/*
          Map placeholder.

          No embedded map is rendered while the street address is unknown — a
          map pinned to the wrong place is worse than no map, and we will not
          guess coordinates. The panel below holds the space with the brand's
          own motif so the layout is already right when the address arrives.
        */}
        <div className="mask-arch relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden border border-sand bg-cream-deep p-10 text-center">
          <BotanicalMotif className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-auto text-maroon/[0.06]" />

          <div className="relative">
            <MapPinIcon className="mx-auto h-9 w-9 text-maroon/40" />
            <p className="eyebrow mt-5 text-maroon/60">{site.location}</p>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {maps
                ? 'Tap “Get directions” above to open the map.'
                : 'The map goes live as soon as our exact address is confirmed.'}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
