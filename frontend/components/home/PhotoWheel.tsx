import { Photo } from '@/components/ui/Photo';
import { copy } from '@/content/copy';
import { photos, type GalleryImage } from '@/content/gallery';
import { cn } from '@/lib/cn';

type Slide = { photo: GalleryImage; title: string; note: string };

// The wheel's photos and captions, in the order set in the copy.
const SLIDES: Slide[] = copy.home.celebrations.wheel.flatMap(({ id, title, note }) =>
  photos.filter((image) => image.id === id).map((photo) => ({ photo, title, note })),
);

// Laid out twice per half, so one half is wider than even a large monitor and
// the loop never shows an empty stretch.
const ROUND = [...SLIDES, ...SLIDES];

// Seconds per photo, so the pace stays the same as photos are added.
const SECONDS_PER_PHOTO = 6;

/**
 * A strip of arch-framed photographs drifting right to left, without end.
 *
 * The round is rendered twice and the track slides by exactly half its width,
 * so the second copy lands where the first began and the loop has no seam.
 * Spacing is padding on each frame rather than `gap`, which keeps the two
 * halves exactly equal.
 *
 * Hovering pauses it and lifts a caption over the photo. Phones have no hover,
 * so each frame also takes focus: a tap shows its caption the same way.
 *
 * With reduced motion the strip stands still and scrolls by hand instead, and
 * only the first set is shown.
 */
export function PhotoWheel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        // Full bleed: wider than the section's container, edge to edge.
        'relative left-1/2 w-screen -translate-x-1/2 overflow-hidden motion-reduce:overflow-x-auto',
        // Photos fade in and out at the edges rather than being cut off.
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      {/* `!` because the animation shorthand in .animate-marquee lands later
          in the stylesheet and would otherwise reset these. */}
      <ul
        className="animate-marquee flex w-max pt-6 pb-12 hover:[animation-play-state:paused]! focus-within:[animation-play-state:paused]! motion-reduce:animate-none!"
        style={{ animationDuration: `${ROUND.length * SECONDS_PER_PHOTO}s` }}
      >
        {[...ROUND, ...ROUND].map((slide, i) => (
          <Frame key={i} slide={slide} first={i < SLIDES.length} />
        ))}
      </ul>
    </div>
  );
}

function Frame({ slide: { photo, title, note }, first }: { slide: Slide; first: boolean }) {
  return (
    <li
      // Repeats are hidden from screen readers and skipped by Tab, but can
      // still take focus from a tap, which is what shows the caption on a phone.
      tabIndex={first ? 0 : -1}
      aria-hidden={!first || undefined}
      className={cn('group shrink-0 px-2.5 outline-none sm:px-4', !first && 'motion-reduce:hidden')}
    >
      <figure className="mask-arch relative overflow-hidden shadow-lift group-focus-visible:ring-2 group-focus-visible:ring-gold">
        <Photo
          src={photo.src}
          alt={first ? photo.alt : ''}
          width={photo.width}
          height={photo.height}
          widths={photo.widths}
          sizes="(min-width: 640px) 18rem, 13rem"
          className="aspect-[4/5] w-52 object-cover transition-[scale] duration-700 group-hover:scale-105 group-focus:scale-105 motion-reduce:transition-none sm:w-72"
        />

        <figcaption
          className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-espresso via-espresso/80 to-transparent
                     px-4 pt-20 pb-4 text-cream [text-shadow:0_1px_8px_rgb(43_26_23/0.6)] opacity-0 transition-[opacity,translate] duration-500
                     group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100
                     motion-reduce:transition-none sm:px-5 sm:pb-5"
        >
          <p className="font-display text-lg leading-snug sm:text-xl">{title}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-cream/85 sm:text-sm">{note}</p>
        </figcaption>
      </figure>
    </li>
  );
}
