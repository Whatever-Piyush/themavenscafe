'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { MusicToggle } from '@/components/layout/MusicToggle';
import { CupMark } from '@/components/ui/Wordmark';
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { resolve, site } from '@/content/site';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';

/**
 * Sticky header.
 *
 * Progressive enhancement note: the SOLID cream treatment is the default, and
 * JavaScript only ever makes it transparent while sitting over the maroon hero.
 * Built the other way round, a visitor without JS would get cream text on a
 * cream background — invisible navigation. The accessible state is the one that
 * survives failure.
 */
export function Header() {
  const scrolled = useScrolled(80);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /**
   * Transparent at the top of EVERY page, not just home.
   *
   * This used to be gated on `onHome`, which dated from when inner pages opened
   * on cream. They don't — every route now begins with a maroon band (the hero
   * on home, PageHeader everywhere else, a full maroon panel on 404). The gate
   * meant inner pages rendered the pale glass bar directly over that maroon,
   * which came out as a washed-out pink strip and looked nothing like home.
   *
   * Also transparent while the mobile menu is open, for the same reason: the
   * panel behind the bar is maroon too.
   */
  const transparent = !scrolled || menuOpen;
  const phoneHref = resolve(site.contact.phoneHref);
  const phone = resolve(site.contact.phone);
  const whatsapp = resolve(site.contact.whatsapp);
  const instagram = resolve(site.contact.instagram);
  const instagramHandle = resolve(site.contact.instagramHandle);

  /**
   * Closing happens on the click that navigates, not in an effect watching the
   * pathname. Watching the pathname costs an extra render on every navigation,
   * and closing the menu is genuinely part of tapping a link.
   */
  const closeMenu = () => setMenuOpen(false);

  // Escape to close, and lock background scroll while the panel is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    // Move focus into the panel so a keyboard user is not left behind it.
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
    <header
      data-site-header=""
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-out-soft)]',
        transparent
          ? 'bg-transparent py-5'
          : [
              // Frosted glass once scrolled. Opaque fallback first, then the
              // transparent version only where the blur can actually render.
              'bg-cream/95 py-3 shadow-soft',
              'border-b border-cream/40',
              'shadow-[inset_0_1px_0_0_rgba(248,244,238,0.5)]',
              'supports-[backdrop-filter]:bg-cream/60',
              'supports-[backdrop-filter]:backdrop-blur-2xl',
              // Brightened, NOT dimmed — the inverse of the Story card.
              // That card holds light text on a dark tint, so it darkens its
              // backdrop; this bar holds dark text on a light tint, so dimming
              // would eat the contrast. Lifting the backdrop keeps the ground
              // pale enough for maroon and espresso type to stay crisp when a
              // photograph or the maroon band scrolls beneath.
              'supports-[backdrop-filter]:backdrop-brightness-[1.35]',
              'supports-[backdrop-filter]:backdrop-saturate-[1.3]',
            ].join(' '),
      )}
    >
      {/*
        Without JavaScript the scroll listener never runs, so the bar stays in
        its transparent state forever — correct over the maroon band each page
        opens with, but cream-on-cream once the reader scrolls into the body.
        Invisible navigation is a severe enough failure to be worth eight lines.

        Previously the default was the solid bar, which was safe but meant a
        no-JS visitor never saw the transparent treatment at all. This keeps the
        good default and only intervenes where JS is actually absent.
      */}
      <noscript>
        <style>{`
          [data-site-header] {
            background-color: var(--color-cream);
            border-bottom: 1px solid var(--color-sand);
          }
          [data-site-header] a,
          [data-site-header] span {
            color: var(--color-maroon);
          }
        `}</style>
      </noscript>

      <Container size="wide">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-sm transition-opacity hover:opacity-80"
            aria-label={`${site.name} — home`}
          >
            <CupMark
              className={cn(
                'h-9 shrink-0 transition-colors',
                transparent ? 'text-gold-light' : 'text-maroon',
              )}
            />
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  'whitespace-nowrap font-display text-base font-medium tracking-tight transition-colors sm:text-lg',
                  transparent ? 'text-cream' : 'text-maroon',
                )}
              >
                {site.name}
              </span>
              <span
                className={cn(
                  'eyebrow mt-1 text-[0.5rem] transition-colors',
                  /**
                   * Shown only over the hero, then dropped once the bar
                   * condenses — which is both a cleaner condensed header and
                   * the fix for a real contrast problem.
                   *
                   * At 8px uppercase this counts as small text and needs 4.5:1.
                   * On the glass bar with the maroon band scrolling beneath it,
                   * even solid-ish maroon/90 only reaches 4.33:1, and the old
                   * ink-muted managed 4.20:1 — it was already below AA before
                   * any glass went in. Removing it from the condensed state
                   * settles that rather than papering over it.
                   */
                  transparent ? 'hidden text-cream/65 sm:block' : 'hidden',
                )}
                aria-hidden="true"
              >
                {site.descriptor}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative text-sm font-medium tracking-wide transition-colors',
                    'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold',
                    'after:transition-all after:duration-300',
                    active ? 'after:w-full' : 'after:w-0 hover:after:w-full',
                    transparent
                      ? active
                        ? 'text-gold'
                        : 'text-cream/85 hover:text-cream'
                      : // Solid maroon, not a tint. On 60% glass with the
                        // maroon band beneath, maroon/90 measures 4.33:1 and
                        // fails; only solid clears AA at 5.06:1. The hover
                        // affordance is the gold underline above, not colour.
                        'text-maroon',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/*
            The call-to-order button appears only once a real phone number
            exists. A dial link to a placeholder is worse than no button.
          */}
          <div className="ml-auto flex items-center gap-1 min-[360px]:gap-2 lg:ml-0">
            <MusicToggle transparent={transparent} />

            {/* Desktop: the full labelled button. */}
            <div className="hidden lg:block">
              <ButtonLink
                href={phoneHref ?? '/contact'}
                variant={transparent ? 'onMaroonGhost' : 'glass'}
                className="px-6 py-2.5 text-xs"
              >
                {phoneHref ? 'Call to order' : 'Visit us'}
              </ButtonLink>
            </div>

            {/*
              Phone: the same action as an icon button, which was missing
              entirely — both branches above were `hidden lg:block`, so the one
              thing a phone visitor most wants to do had no control at all.

              Icon-only rather than the full pill, because at 390px a labelled
              button alongside the wordmark and the toggle crowds the bar into
              illegibility. 44px square, so it is still a proper tap target, and
              it carries an accessible name since the icon alone says nothing to
              a screen reader.
            */}
            {phoneHref && (
              <a
                href={phoneHref}
                aria-label={phone ? `Call ${site.name} on ${phone}` : `Call ${site.name}`}
                className={cn(
                  'liquid-rim flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors lg:hidden',
                  transparent
                    ? 'bg-cream/15 text-cream supports-[backdrop-filter]:bg-cream/10'
                    : 'bg-maroon text-cream',
                )}
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              // 44px is the accepted minimum tap target; 40 was marginally under.
              'relative z-50 flex h-11 w-11 items-center justify-center rounded-full sm:-ml-2 transition-colors lg:hidden',
              transparent ? 'text-cream hover:bg-cream/10' : 'text-maroon hover:bg-maroon/10',
            )}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="flex h-4 w-5 flex-col justify-between">
              <span
                className={cn(
                  'h-px w-full bg-current transition-transform duration-300',
                  menuOpen && 'translate-y-[7px] rotate-45',
                )}
              />
              <span className={cn('h-px w-full bg-current transition-opacity duration-200', menuOpen && 'opacity-0')} />
              <span
                className={cn(
                  'h-px w-full bg-current transition-transform duration-300',
                  menuOpen && '-translate-y-[7px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </Container>
    </header>

    {/*
      MOBILE PANEL — a SIBLING of <header>, not a child. This is the fix for a
      real bug, not a tidy-up.

      It is `position: fixed; inset: 0`. A `backdrop-filter` on an ancestor
      creates a containing block for fixed descendants, so while the panel lived
      inside the header it was trapped in the header's own box instead of
      covering the viewport — the page showed straight through it and most of
      the links were clipped away. And the header gets its backdrop-filter
      exactly when `transparent` is false, which is exactly when the menu is
      open. Opening the menu was what broke the menu.

      As a sibling it cannot be affected by anything the header does to itself.
    */}
    <div
      id="mobile-menu"
      ref={panelRef}
      hidden={!menuOpen}
      className="texture-fluted-light fixed inset-0 z-[45] flex flex-col bg-maroon pt-[5.25rem] lg:hidden"
    >
      {/*
        The scroller starts below the bar, because the bar is transparent while
        this is open: on a short phone, links scrolling beneath it would show
        straight through the logo.
      */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-7">
        <div className="mx-auto my-auto w-full max-w-sm py-4">
          <nav aria-label="Mobile" className="flex flex-col">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={cn(
                  // min-h-14 keeps every row a comfortable thumb target.
                  'flex min-h-14 items-center justify-center font-display text-[1.75rem] leading-none transition-colors hover:text-gold',
                  pathname === item.href ? 'text-gold' : 'text-cream',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div aria-hidden="true" className="my-7 flex items-center justify-center gap-3 text-gold/70">
            <span className="h-px w-10 bg-current" />
            <span className="h-1 w-1 rotate-45 bg-current" />
            <span className="h-px w-10 bg-current" />
          </div>

          {/*
            Contact actions, given real prominence.

            On a phone the job of this menu is not browsing — it is calling. So
            the call is the one filled control on the panel, in the signage
            cream-gold, with the two secondary routes as quiet glass beneath it.
          */}
          <div className="flex flex-col gap-3">
            {phoneHref && phone && (
              <a
                href={phoneHref}
                onClick={closeMenu}
                aria-label={`Call ${site.name} on ${phone}`}
                className="liquid-rim flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-gold-light px-6 text-base font-medium text-maroon"
              >
                <PhoneIcon className="h-5 w-5 shrink-0" />
                <span>{phone}</span>
              </a>
            )}

            {(whatsapp || instagram) && (
              <div className="flex gap-3">
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3 text-sm text-cream"
                  >
                    <WhatsAppIcon className="h-[1.125rem] w-[1.125rem] shrink-0 text-gold" />
                    <span>WhatsApp</span>
                  </a>
                )}

                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    aria-label={instagramHandle ? `Instagram, ${instagramHandle}` : 'Instagram'}
                    className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3 text-sm text-cream"
                  >
                    <InstagramIcon className="h-[1.125rem] w-[1.125rem] shrink-0 text-gold" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="font-script shrink-0 pb-8 pt-4 text-center text-2xl text-gold">{site.tagline}</p>
      </div>
    </div>
    </>
  );
}
