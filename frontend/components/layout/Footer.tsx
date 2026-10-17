import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Wordmark';
import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { formatTime, formattedAddress, hoursSummary, resolve, site } from '@/content/site';

/**
 * Footer — maroon, bookending the maroon hero.
 *
 * The page opens and closes in the brand colour with the cream body held
 * between them. That is what makes the single hero transition feel composed
 * rather than like the theme simply ran out halfway down.
 *
 * Every contact channel renders only if it genuinely exists. A dead link or a
 * placeholder phone number in a footer is the kind of detail that quietly tells
 * a visitor the business is not real.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const phone = resolve(site.contact.phone);
  const phoneHref = resolve(site.contact.phoneHref);
  const whatsapp = resolve(site.contact.whatsapp);
  const instagram = resolve(site.contact.instagram);
  const instagramHandle = resolve(site.contact.instagramHandle);
  const email = resolve(site.contact.email);
  const summary = hoursSummary();

  const channels = [
    phoneHref && phone ? { href: phoneHref, label: phone, Icon: PhoneIcon, external: false } : null,
    whatsapp ? { href: whatsapp, label: 'WhatsApp', Icon: WhatsAppIcon, external: true } : null,
    instagram
      ? { href: instagram, label: instagramHandle ?? 'Instagram', Icon: InstagramIcon, external: true }
      : null,
    email ? { href: `mailto:${email}`, label: email, Icon: MailIcon, external: false } : null,
  ].filter((channel): channel is NonNullable<typeof channel> => channel !== null);

  return (
    <footer className="texture-fluted-light bg-maroon text-cream">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          {/* Brand */}
          <div>
            <Wordmark tone="cream" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream-muted">{site.description}</p>
            <p className="font-script mt-6 text-2xl text-gold">{site.tagline}</p>
          </div>

          {/* Find us */}
          <div>
            <h2 className="eyebrow mb-5 text-gold">Find us</h2>
            <address className="space-y-3 text-sm not-italic leading-relaxed text-cream-muted">
              <p>{formattedAddress() ?? site.location}</p>

              {channels.length > 0 ? (
                <ul className="space-y-2.5 pt-1">
                  {channels.map(({ href, label, Icon, external }) => (
                    <li key={href}>
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="inline-flex items-center gap-2.5 transition-colors hover:text-gold"
                      >
                        <Icon className="h-4 w-4 text-gold/70" />
                        <span>{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="pt-1 text-cream/50 italic">Contact details coming soon</p>
              )}
            </address>
          </div>

          {/* Hours */}
          <div>
            <h2 className="eyebrow mb-5 text-gold">Hours</h2>
            {summary ? (
              <div className="text-sm text-cream-muted">
                <p>{summary.label}</p>
                <p className="mt-1 tabular-nums text-cream">{summary.range}</p>
              </div>
            ) : site.hours.length > 0 ? (
              <dl className="space-y-2 text-sm text-cream-muted">
                {site.hours.map((entry) => (
                  <div key={entry.day} className="flex justify-between gap-4">
                    <dt>{entry.day.slice(0, 3)}</dt>
                    <dd className="tabular-nums">
                      {formatTime(entry.opens)} &ndash; {formatTime(entry.closes)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm text-cream/50 italic">Opening hours coming soon</p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream-muted">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            ))}
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold">
              Terms
            </Link>
          </nav>

          <p className="text-xs text-cream/50">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
