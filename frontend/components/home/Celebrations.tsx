import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/Section';
import { PhotoWheel } from '@/components/home/PhotoWheel';
import { copy } from '@/content/copy';
import { resolve, site } from '@/content/site';


/**
 * Booking the whole cafe for an occasion.
 *
 * Enquiries go straight to a person: there is no form on this site, so the
 * WhatsApp button opens with the message already written.
 */
export function Celebrations() {
  const whatsapp = resolve(site.contact.whatsapp);
  const phoneHref = resolve(site.contact.phoneHref);
  const { eyebrow, title, lead, accent, body, whatsappCta, whatsappMessage, callCta } = copy.home.celebrations;

  return (
    <Section tone="cream" id="celebrations">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

      <div className="mx-auto -mt-4 max-w-2xl text-center">
        <p className="font-display text-xl italic text-maroon sm:text-2xl">{accent}</p>
        {/* Same face, size and colour as the lead above. */}
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">{body}</p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {whatsapp && (
          <ButtonLink href={`${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`} variant="primary">
            {whatsappCta}
          </ButtonLink>
        )}
        {phoneHref && (
          <ButtonLink href={phoneHref} variant="secondary">
            {callCta}
          </ButtonLink>
        )}
      </div>

      <PhotoWheel className="mt-10 -mb-6" />
    </Section>
  );
}
