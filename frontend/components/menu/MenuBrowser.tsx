'use client';

import { useMemo, useState } from 'react';
import { MenuItemCard } from './MenuItemCard';
import { SearchIcon } from '@/components/ui/Icons';
import { copy } from '@/content/copy';
import { menu, type MenuCategory } from '@/content/menu';
import { cn } from '@/lib/cn';

/**
 * Category filtering and search.
 *
 * Entirely client-side: the whole menu ships in the page, so filtering costs no
 * network request and works instantly. For a menu of this size that is simpler,
 * faster, and removes an API surface that would otherwise need protecting.
 *
 * This is the only interactive component on the site, which is why it is also
 * the only 'use client' boundary outside the header.
 */
export function MenuBrowser() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [query, setQuery] = useState('');

  const visible = useMemo<MenuCategory[]>(() => {
    const normalised = query.trim().toLowerCase();

    return menu
      .filter((category) => activeCategory === 'all' || category.id === activeCategory)
      .map((category) => ({
        ...category,
        items: normalised
          ? category.items.filter(
              (item) =>
                item.name.toLowerCase().includes(normalised) ||
                item.description?.toLowerCase().includes(normalised),
            )
          : category.items,
      }))
      .filter((category) => category.items.length > 0);
  }, [activeCategory, query]);

  const resultCount = visible.reduce((total, category) => total + category.items.length, 0);

  return (
    <div>
      {/* Controls */}
      <div className="no-print sticky top-[4.5rem] z-30 -mx-5 mb-12 border-b border-sand/70 bg-cream/95 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Categories */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by category">
            <CategoryChip
              label={copy.menu.allCategories}
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {menu.map((category) => (
              <CategoryChip
                key={category.id}
                label={category.name}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>

          {/* Search */}
          <div className="relative lg:w-72">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.menu.searchPlaceholder}
              aria-label={copy.menu.searchLabel}
              className="w-full rounded-full border border-sand bg-cream py-2.5 pl-10 pr-4 text-sm text-espresso placeholder:text-ink-muted/70 focus:border-maroon/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            />
          </div>
        </div>

        {/* Announced to screen readers as results change. */}
        <p aria-live="polite" className="sr-only">
          {resultCount} {resultCount === 1 ? 'item' : 'items'} shown
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-ink-muted">{copy.menu.noResults}</p>
      ) : (
        <div className="space-y-16">
          {visible.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-40">
              <div className="mb-6">
                <h2 className="font-display text-2xl text-espresso sm:text-3xl">{category.name}</h2>
                {category.tagline && <p className="mt-2 text-sm text-ink-muted">{category.tagline}</p>}
                <div className="mt-5 h-px w-16 bg-gold/50" />
              </div>

              <div>
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        active
          ? 'border-maroon bg-maroon text-cream'
          : 'border-sand bg-transparent text-espresso/75 hover:border-maroon/40 hover:text-maroon',
      )}
    >
      {label}
    </button>
  );
}
