'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { CupMark } from '@/components/ui/Wordmark';
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

  const onHome = pathname === '/';
  const transparent = onHome && !scrolled && !menuOpen;
  const phoneHref = resolve(site.contact.phoneHref);

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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-out-soft)]',
        transparent
          ? 'bg-transparent py-5'
          : 'bg-cream/95 py-3 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-cream/85',
      )}
    >
      <Container size="wide">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-sm transition-opacity hover:opacity-80"
            aria-label={`${site.name} — home`}
          >
            <span className={cn('block h-8 w-8 shrink-0 transition-colors', transparent ? 'text-gold' : 'text-maroon')}>
              <CupMark />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  'font-display text-base font-medium tracking-tight transition-colors sm:text-lg',
                  transparent ? 'text-cream' : 'text-maroon',
                )}
              >
                {site.name}
              </span>
              <span
                className={cn(
                  'eyebrow mt-1 hidden text-[0.5rem] transition-colors sm:block',
                  transparent ? 'text-cream/65' : 'text-ink-muted',
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
                      : active
                        ? 'text-maroon'
                        : 'text-espresso/75 hover:text-maroon',
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
          {phoneHref ? (
            <div className="hidden lg:block">
              <ButtonLink
                href={phoneHref}
                variant={transparent ? 'onMaroonGhost' : 'primary'}
                className="px-6 py-2.5 text-xs"
              >
                Call to order
              </ButtonLink>
            </div>
          ) : (
            <div className="hidden lg:block">
              <ButtonLink
                href="/contact"
                variant={transparent ? 'onMaroonGhost' : 'primary'}
                className="px-6 py-2.5 text-xs"
              >
                Visit us
              </ButtonLink>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              'relative z-50 flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden',
              transparent || menuOpen ? 'text-cream hover:bg-cream/10' : 'text-maroon hover:bg-maroon/10',
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

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="texture-fluted-light fixed inset-0 z-40 flex flex-col justify-center bg-maroon px-8 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={cn(
                'border-b border-cream/10 py-4 font-display text-2xl transition-colors',
                pathname === item.href ? 'text-gold' : 'text-cream hover:text-gold',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-col gap-4">
          {phoneHref && (
            <ButtonLink href={phoneHref} variant="onMaroon" onClick={closeMenu}>
              Call us
            </ButtonLink>
          )}
          <p className="font-script text-center text-2xl text-gold">{site.tagline}</p>
        </div>
      </div>
    </header>
  );
}
