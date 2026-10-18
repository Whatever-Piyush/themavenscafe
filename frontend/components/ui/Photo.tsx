import { cn } from '@/lib/cn';

/**
 * A photograph, served in the best format and size the browser can use.
 *
 * Why this exists rather than `next/image`: the site is a static export, so
 * Next's image optimiser cannot run and `images.unoptimized` is set. Nothing
 * negotiates formats or resolutions at request time, which means the
 * negotiation has to live in the markup — a `<picture>` with pre-encoded
 * sources, each carrying a real `srcset` with width descriptors.
 *
 * The saving is not marginal. For the storefront photograph:
 *
 *                     640w        1024w
 *     JPEG           139 KB       312 KB
 *     WebP           103 KB       218 KB
 *     AVIF            61 KB       133 KB
 *     (source PNG was 2453 KB)
 *
 * So a phone takes 61 KB where a naive implementation would have shipped the
 * 2.4 MB original — a ~97% reduction.
 *
 * Files are named `<src>-<width>.<ext>`. Browsers pick the first `<source>`
 * whose type they understand, then the narrowest candidate that satisfies
 * `sizes`; the `<img>` is the universal JPEG fallback, so nothing is ever left
 * without a picture.
 *
 * `width`/`height` are the LARGEST variant's intrinsic dimensions. They set the
 * aspect ratio the browser reserves before any bytes arrive, which is what
 * stops the layout jumping as the image loads.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  widths,
  sizes,
  className,
  priority = false,
}: {
  /** Path without width suffix or extension, e.g. '/images/space/storefront-dusk' */
  src: string;
  /** Describe the frame. Pass '' only when the image is purely decorative. */
  alt: string;
  /** Intrinsic dimensions of the largest variant. */
  width: number;
  height: number;
  /** Available encoded widths, ascending. Must match the files on disk. */
  widths: number[];
  /** How wide the image renders at each breakpoint, so the browser can choose. */
  sizes: string;
  className?: string;
  /** Set for above-the-fold images so they are not lazy-loaded. */
  priority?: boolean;
}) {
  const srcSetFor = (ext: string) => widths.map((w) => `${src}-${w}.${ext} ${w}w`).join(', ');
  const widest = widths[widths.length - 1] ?? width;

  return (
    <picture>
      <source srcSet={srcSetFor('avif')} sizes={sizes} type="image/avif" />
      <source srcSet={srcSetFor('webp')} sizes={sizes} type="image/webp" />
      {/*
        A plain <img>, deliberately: next/image cannot emit a <picture> with
        multiple pre-encoded formats, and under a static export it adds no
        optimisation to compensate for that. The explicit dimensions below do
        the one job next/image would otherwise be here for.
      */}
      <img
        src={`${src}-${widest}.jpg`}
        srcSet={srcSetFor('jpg')}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={cn('block', className)}
      />
    </picture>
  );
}
