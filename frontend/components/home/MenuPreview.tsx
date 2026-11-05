import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { Section, SectionHeading } from '@/components/ui/Section';
import { copy } from '@/content/copy';
import { isMenuPending, menu } from '@/content/menu';

/**
 * Menu preview.
 *
 * Renders category tiles once a menu exists; until then it shows a composed
 * "coming soon" panel rather than fabricated categories. The real menu has not
 * been supplied, and the provisional items visible in the architectural renders
 * are not the cafe's published menu — presenting them as such would be putting
 * words in the owner's mouth.
 */
export function MenuPreview() {
  if (isMenuPending()) {
    return (
      <Section tone="cream" id="menu-preview">
        <ComingSoon title={copy.menu.pendingTitle} copy={copy.menu.pendingCopy} tone="maroon">
          <ButtonLink href="/menu" variant="onMaroonGhost">
            About our menu
          </ButtonLink>
        </ComingSoon>
      </Section>
    );
  }

  return (
    <Section tone="cream" id="menu-preview">
      <SectionHeading
        eyebrow={copy.home.menuPreview.eyebrow}
        title={copy.home.menuPreview.title}
        lead={copy.home.menuPreview.lead}
      />

      {/* Eight categories: four across on a wide screen, so they sit in two
          even rows rather than a long column of pairs. */}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {menu.map((category) => (
          <li key={category.id}>
            <Link
              href={`/menu#${category.id}`}
              className="group flex h-full flex-col rounded-2xl border border-sand bg-cream-deep/40 p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:border-maroon/25 hover:bg-cream-deep hover:shadow-lift"
            >
              {/* Count above the name rather than beside it, so a long name
                  like "Coffee Collection" never squeezes it onto two lines. */}
              <span className="text-xs tabular-nums text-ink-muted">
                {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
              </span>
              <h3 className="mt-1.5 font-display text-2xl text-espresso transition-colors group-hover:text-maroon">
                {category.name}
              </h3>
              <div className="mt-4 h-px w-10 bg-gold/50" />

              {/* Grows to fill the tile, so every "View" sits on the same line
                  along a row. */}
              <p className="mt-4 mb-6 flex-1 text-sm leading-relaxed text-ink-muted">
                {category.items
                  .slice(0, 4)
                  .map((item) => item.name)
                  .join(' · ')}
                {category.items.length > 4 && ' …'}
              </p>

              <span className="eyebrow flex items-center gap-2 text-maroon">
                View
                <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 text-center">
        <ButtonLink href="/menu">{copy.home.menuPreview.cta}</ButtonLink>
      </div>
    </Section>
  );
}
