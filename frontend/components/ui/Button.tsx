import Link from 'next/link';
import { cn } from '@/lib/cn';
import {
  liquidPrimaryDark,
  liquidPrimaryLight,
  liquidSecondaryDark,
  liquidSecondaryLight,
} from './liquid-glass-button';

/**
 * The existing variant names now map onto the liquid-glass recipes, so all 16
 * call sites pick up the new look without 16 separate edits — and the
 * primary/secondary hierarchy they already encoded is preserved rather than
 * flattened into one uniform glass.
 *
 *   primary        maroon glass, cream label   (prominent, on cream)
 *   secondary      cream glass, maroon label   (quiet, on cream)
 *   glass          maroon glass, cream label   (the header's CTA)
 *   onMaroon       brighter cream glass        (prominent, on maroon)
 *   onMaroonGhost  fainter cream glass         (quiet, on maroon)
 *
 * `solidMaroon` is kept for anything that must read as a hard, opaque control
 * rather than glass.
 */
type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'onMaroon'
  | 'onMaroonGhost'
  | 'glass'
  | 'solidMaroon';

const VARIANTS: Record<Variant, string> = {
  // ── On a CREAM surface ──
  primary: liquidPrimaryLight,
  secondary: liquidSecondaryLight,
  // The header bar is pale glass, so its CTA needs the dark-on-light treatment
  // to stay prominent — cream-on-cream would vanish.
  glass: liquidPrimaryLight,

  // ── On a MAROON surface ──
  onMaroon: liquidPrimaryDark,
  onMaroonGhost: liquidSecondaryDark,

  solidMaroon:
    'bg-maroon text-cream hover:bg-maroon-soft active:bg-maroon-deep shadow-soft hover:shadow-lift',

  ghost: 'bg-transparent text-espresso hover:text-maroon',
};

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide ' +
  'transition-all duration-200 ease-[var(--ease-out-soft)] ' +
  // A visible, on-brand focus ring. Keyboard users get the same quality of
  // experience as pointer users, not an afterthought.
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold ' +
  'disabled:pointer-events-none disabled:opacity-50';

interface ButtonAsLink {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Side effect on activation — e.g. closing the mobile menu. */
  onClick?: () => void;
}

export function ButtonLink({ href, children, variant = 'primary', className, onClick }: ButtonAsLink) {
  const external = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  if (external) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(BASE, VARIANTS[variant], className)}
        // noopener closes the reverse-tabnabbing hole where the opened page can
        // rewrite window.opener.location. noreferrer stops us leaking the
        // originating URL. Both, always, on every external link.
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={cn(BASE, VARIANTS[variant], className)}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(BASE, VARIANTS[variant], className)} {...props}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
