'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CloseIcon } from '@/components/ui/Icons';
import { GALLERY_CATEGORIES, gallery, type GalleryImage } from '@/content/gallery';
import { cn } from '@/lib/cn';

/**
 * Gallery grid with an accessible lightbox.
 *
 * Built and waiting: `gallery` in content/gallery.ts is empty until authorised
 * photography exists, so the gallery page renders its designed empty state
 * instead. Adding images to that file brings this to life with no code change.
 *
 * Lightbox accessibility, which is where most image galleries fall down:
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

  const visible =
    activeCategory === 'all' ? gallery : gallery.filter((image) => image.category === activeCategory);

  const close = useCallback(() => {
    setLightboxIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null) return null;
        const next = (current + delta + visible.length) % visible.length;
        return next;
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

      // Trap focus inside the dialog.
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

  const active: GalleryImage | null = lightboxIndex === null ? null : (visible[lightboxIndex] ?? null);

  return (
    <div>
      {/* Category filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by area">
        <FilterChip label="All" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
        {GALLERY_CATEGORIES.map((category) => (
          <FilterChip
            key={category.id}
            label={category.label}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          />
        ))}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setLightboxIndex(index);
              }}
              className="group block w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span className="sr-only">View larger: {image.alt}</span>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />
            </button>
            {image.caption && <p className="mt-3 text-sm text-ink-muted">{image.caption}</p>}
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

          <figure className="max-h-full max-w-5xl">
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="100vw"
              className="max-h-[80vh] w-auto rounded-xl object-contain"
              priority
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
