import { cn } from '@/lib/cn';

/**
 * The handful of icons this site needs.
 *
 * Hand-drawn rather than pulling in an icon package: six small paths do not
 * justify a dependency, and the brand marks (cup, botanical motif) have to be
 * custom anyway. Every dependency is a supply-chain surface, and this one would
 * have bought convenience rather than capability.
 *
 * All are decorative by default — `aria-hidden` — because each is paired with a
 * visible text label at every call site. An icon announced alongside the label
 * it duplicates is noise for a screen-reader user.
 */

type IconProps = { className?: string };

const base = 'h-5 w-5 shrink-0';
const stroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...stroke}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...stroke}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...stroke}>
      <path d="M3.5 20.5 5 16.3a8.5 8.5 0 1 1 3.2 3.1l-4.7 1.1Z" />
      <path d="M9 9.2c.3 2.6 3.2 5.5 5.8 5.8.6.1 1.2-.3 1.5-.8l-1.8-1.1-1 .8a7 7 0 0 1-2.4-2.4l.8-1L10.8 8c-.5.3-.9.7-.8 1.2Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-4 w-4 shrink-0', className)} {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...stroke}>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...stroke}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
