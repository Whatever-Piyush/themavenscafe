import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onMaroon' | 'onMaroonGhost';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-maroon text-cream hover:bg-maroon-soft active:bg-maroon-deep shadow-soft hover:shadow-lift',
  secondary: 'bg-transparent text-maroon border border-maroon/30 hover:border-maroon hover:bg-maroon/5',
  ghost: 'bg-transparent text-espresso hover:text-maroon',
  onMaroon: 'bg-cream text-maroon hover:bg-gold hover:text-espresso shadow-soft',
  onMaroonGhost: 'bg-transparent text-cream border border-cream/35 hover:border-gold hover:text-gold',
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
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={cn(BASE, VARIANTS[variant], className)}>
      {children}
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
      {children}
    </button>
  );
}
