import { Container } from './Container';
import { cn } from '@/lib/cn';

/**
 * A page section with brand-correct backgrounds.
 *
 * The `tone` prop is what keeps the maroon-to-cream rule honest: sections can
 * only be one of the approved surfaces, so no page can accidentally introduce a
 * fifth background colour.
 */

type Tone = 'cream' | 'creamDeep' | 'maroon' | 'espresso';

const TONES: Record<Tone, string> = {
  cream: 'bg-cream text-espresso',
  creamDeep: 'bg-cream-deep text-espresso',
  maroon: 'bg-maroon text-cream',
  espresso: 'bg-espresso text-cream',
};

export function Section({
  children,
  tone = 'cream',
  className,
  containerSize = 'default',
  id,
  fluted = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  containerSize?: 'narrow' | 'default' | 'wide';
  id?: string;
  fluted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 sm:py-28',
        TONES[tone],
        fluted && (tone === 'maroon' || tone === 'espresso' ? 'texture-fluted-light' : 'texture-fluted'),
        className,
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

/** Eyebrow + heading + optional lead, in the brand's standard arrangement. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  tone = 'light',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}) {
  const onDark = tone === 'dark';

  return (
    <div className={cn('mb-14 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className={cn('eyebrow mb-4', onDark ? 'text-gold' : 'text-maroon/70')}>{eyebrow}</p>
      )}

      <h2 className={cn('text-2xl sm:text-3xl', onDark ? 'text-cream' : 'text-espresso')}>{title}</h2>

      {/* The diamond divider from the signage. */}
      <div className={cn('mt-6 flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span className={cn('h-px w-10', onDark ? 'bg-gold/50' : 'bg-maroon/25')} />
        <span className={cn('text-xs', onDark ? 'text-gold' : 'text-maroon/50')} aria-hidden="true">
          &#10022;
        </span>
        <span className={cn('h-px w-10', onDark ? 'bg-gold/50' : 'bg-maroon/25')} />
      </div>

      {lead && (
        <p className={cn('mt-6 text-lg leading-relaxed', onDark ? 'text-cream-muted' : 'text-ink-muted')}>
          {lead}
        </p>
      )}
    </div>
  );
}
