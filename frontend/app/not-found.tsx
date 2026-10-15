import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CupMark } from '@/components/ui/Wordmark';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="texture-fluted-light relative flex min-h-dvh items-center justify-center bg-maroon py-32 text-cream">
      <div className="glow-warm pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative text-center">
        <span className="mx-auto block h-16 w-16 text-gold">
          <CupMark />
        </span>

        <p className="eyebrow mt-8 text-gold/80">{copy.notFound.eyebrow}</p>

        <h1 className="mt-5 font-display text-3xl text-cream">{copy.notFound.title}</h1>

        <p className="mx-auto mt-6 max-w-md text-cream-muted">{copy.notFound.copy}</p>

        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/" variant="onMaroon">
            {copy.notFound.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="/menu" variant="onMaroonGhost">
            {copy.notFound.ctaSecondary}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
