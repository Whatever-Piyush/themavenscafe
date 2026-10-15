import { ClockIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from './Icons';
import { formatTime, resolve, site } from '@/content/site';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';

/**
 * The contact details block, shared by the home page and /contact.
 *
 * Each channel renders as a live link when a real value exists and as a quiet
 * "coming soon" line when it does not. Nothing is fabricated, and nothing
 * renders as a dead link — a tel: pointing at a placeholder number is a real
 * person dialling a stranger.
 */

interface Channel {
  label: string;
  value: string | null;
  href: string | null;
  external: boolean;
  Icon: (props: { className?: string }) => React.JSX.Element;
}

function buildChannels(): Channel[] {
  const phone = resolve(site.contact.phone);
  const phoneHref = resolve(site.contact.phoneHref);
  const whatsapp = resolve(site.contact.whatsapp);
  const instagram = resolve(site.contact.instagram);
  const instagramHandle = resolve(site.contact.instagramHandle);
  const email = resolve(site.contact.email);
  const maps = resolve(site.contact.maps);
  const address = resolve(site.contact.address);

  return [
    {
      label: copy.contact.labels.address,
      value: address ?? site.location,
      href: maps,
      external: true,
      Icon: MapPinIcon,
    },
    {
      label: copy.contact.labels.phone,
      value: phone,
      href: phoneHref,
      external: false,
      Icon: PhoneIcon,
    },
    {
      label: copy.contact.labels.whatsapp,
      value: whatsapp ? 'Message us on WhatsApp' : null,
      href: whatsapp,
      external: true,
      Icon: WhatsAppIcon,
    },
    {
      label: copy.contact.labels.instagram,
      value: instagramHandle ?? (instagram ? 'Instagram' : null),
      href: instagram,
      external: true,
      Icon: InstagramIcon,
    },
    {
      label: copy.contact.labels.email,
      value: email,
      href: email ? `mailto:${email}` : null,
      external: false,
      Icon: MailIcon,
    },
  ];
}

export function ContactDetails({ className }: { className?: string }) {
  const channels = buildChannels();

  return (
    <div className={cn('space-y-10', className)}>
      <dl className="space-y-7">
        {channels.map((channel) => (
          <div key={channel.label} className="flex gap-4">
            <channel.Icon className="mt-0.5 h-5 w-5 shrink-0 text-maroon/50" />

            <div className="min-w-0">
              <dt className="eyebrow text-maroon/60">{channel.label}</dt>
              <dd className="mt-1.5 break-words text-base text-espresso">
                {channel.value === null ? (
                  <span className="italic text-ink-muted/70">{copy.contact.comingSoon}</span>
                ) : channel.href ? (
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="underline decoration-gold/50 underline-offset-4 transition-colors hover:text-maroon hover:decoration-maroon"
                  >
                    {channel.value}
                  </a>
                ) : (
                  channel.value
                )}
              </dd>
            </div>
          </div>
        ))}

        {/* Hours */}
        <div className="flex gap-4">
          <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-maroon/50" />
          <div className="min-w-0 flex-1">
            <dt className="eyebrow text-maroon/60">{copy.contact.labels.hours}</dt>
            <dd className="mt-1.5">
              {site.hours.length === 0 ? (
                <span className="italic text-ink-muted/70">{copy.contact.comingSoon}</span>
              ) : (
                <ul className="max-w-xs space-y-2">
                  {site.hours.map((entry) => (
                    <li
                      key={entry.day}
                      className="flex items-baseline justify-between gap-6 border-b border-sand/70 pb-1.5"
                    >
                      <span className="text-sm text-ink-muted">{entry.day}</span>
                      <span className="text-sm font-medium tabular-nums text-espresso">
                        {formatTime(entry.opens)} &ndash; {formatTime(entry.closes)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
