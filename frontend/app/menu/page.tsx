import type { Metadata } from 'next';
import { MenuBrowser } from '@/components/menu/MenuBrowser';
import { PageHeader } from '@/components/layout/PageHeader';
import { ButtonLink } from '@/components/ui/Button';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { Section } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { isMenuPending } from '@/content/menu';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Café, bakery and desserts at The Mavens Cafe in Chirawa — coffee, fresh baking and desserts made on the premises.',
  alternates: { canonical: '/menu' },
};

export default function MenuPage() {
  const pending = isMenuPending();

  return (
    <>
      <PageHeader eyebrow="Café · Bakery · Desserts" title={copy.menu.title} lead={copy.menu.lead} />

      <Section tone="cream" containerSize="default">
        {pending ? (
          <>
            <ComingSoon title={copy.menu.pendingTitle} copy={copy.menu.pendingCopy}>
              <ButtonLink href="/contact" variant="secondary">
                Visit us
              </ButtonLink>
            </ComingSoon>

            {/*
              What the menu will cover. These three are the cafe's own
              descriptor — café, bakery, desserts — not invented dishes.
            */}
            <div className="mt-16">
              <p className="eyebrow mb-7 text-center text-maroon/60">What you&rsquo;ll find</p>
              <ul className="grid gap-5 sm:grid-cols-3">
                {copy.home.craft.items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-2xl border border-sand bg-cream-deep/40 p-7 text-center"
                  >
                    <h2 className="font-display text-xl text-espresso">{item.name}</h2>
                    <div className="mx-auto mt-3 h-px w-8 bg-gold/50" />
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.copy}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <MenuBrowser />
            <p className="mt-16 text-center text-xs text-ink-muted">{copy.menu.disclaimer}</p>
          </>
        )}
      </Section>
    </>
  );
}
