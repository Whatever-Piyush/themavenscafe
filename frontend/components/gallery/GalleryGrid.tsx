'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Photo } from '@/components/ui/Photo';
import { CloseIcon } from '@/components/ui/Icons';
import { GALLERY_CATEGORIES, gallery, type GalleryImage } from '@/content/gallery';
import { cn } from '@/lib/cn';

/**
 * Gallery grid with an accessible lightbox.
 *
 * Laid out as CSS multi-columns rather than a fixed grid. The set mixes
 * landscape and portrait frames, and a rigid grid would either crop them to a
 * common ratio — throwing away the composition of a tall cake shot — or leave
 * ragged gaps. Masonry lets each image keep its own proportions, which is both
 * kinder to the photographs and closer to how an editorial spread reads.
 *
 * Lightbox accessibility, which is where most galleries fall down:
 *   - focus moves into the dialog on open and returns to the trigger on close
 *   - Escape closes, arrow keys move between images
 *   - focus is trapped inside while open
 *   - background scroll is locked
 *   - it is a real labelled dialog, not a styled div
 */
export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /**
   * Only offer filters that would actually return something.
   *
   * The category list includes 'terrace', and there are no terrace photographs
   * yet. A chip that leads to an empty grid looks broken, so chips are derived
   * from the images present — the filter appears by itself the day a terrace
   * photograph is added.
   */
  const categories = useMemo(
    () => GALLERY_CATEGORIES.filter((c) => gallery.some((img) => img.category === c.id)),
    [],
  );

  const visible = useMemo(
    () =>
      activeCategory === 'all'
        ? gallery
        : gallery.filter((image) => image.category === activeCategory),
    [activeCategory],
  );

  const close = useCallback(() => {
    setLightboxIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null) return null;
        return (current + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, close, step]);

  const active: GalleryImage | null =
    lightboxIndex === null ? null : (visible[lightboxIndex] ?? null);

  return (
    <div>
      {/* Category filter */}
      {categories.length > 1 && (
        <div className="mb-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by area">
          <FilterChip label="All" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              label={category.label}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      )}

      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
        {visible.map((image, index) => (
          <li key={image.id} className="break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setLightboxIndex(index);
                }}
                className="group block w-full overflow-hidden rounded-2xl shadow-soft transition-shadow duration-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span className="sr-only">View larger: {image.alt}</span>
                <Photo
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  widths={image.widths}
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 44vw, 92vw"
                  className="w-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                />
              </button>

              {image.caption && (
                <figcaption className="mt-3 text-sm text-ink-muted">{image.caption}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/95 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-8 sm:top-8"
          >
            <span className="sr-only">Close</span>
            <CloseIcon className="h-6 w-6" />
          </button>

          <figure className="max-h-full">
            <Photo
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              widths={active.widths}
              sizes="92vw"
              priority
              className="max-h-[78vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-cream-muted">
              {active.caption ?? active.alt}
            </figcaption>
          </figure>

          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span className="sr-only">Previous image</span>
                <span aria-hidden="true">&larr;</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span className="sr-only">Next image</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-5 py-2 text-sm transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        active
          ? 'border-maroon bg-maroon text-cream'
          : 'border-sand text-espresso/75 hover:border-maroon/40 hover:text-maroon',
      )}
    >
      {label}
    </button>
  );
}
