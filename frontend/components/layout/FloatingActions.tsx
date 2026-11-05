import { MapPinIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { resolve, site } from '@/content/site';

/**
 * Floating WhatsApp and directions bubbles.
 *
 * This site is read overwhelmingly on phones, where the two things a visitor
 * actually wants are "message them" and "take me there". Both were previously
 * only reachable by scrolling to the bottom of the page or opening the menu.
 * These keep them one thumb-tap away at any scroll position.
 *
 * Design notes, all of them mobile-first:
 *
 *   - Solid brand maroon with the same `liquid-rim` as the Call-to-order
 *     button, so this reads as the same family of control rather than a
 *     bolted-on widget.
 *
 *   - 56px circles. Larger than the 44px minimum because these are used
 *     one-handed, often in motion, and they sit near the screen edge where
 *     thumb accuracy is worst.
 *
 *   - Bottom-RIGHT, stacked vertically. Right-handed thumb reach on a phone is
 *     the bottom-right arc; the bottom-left is the hardest corner to hit.
 *
 *   - `env(safe-area-inset-bottom)` keeps them clear of the iPhone home
 *     indicator, which otherwise overlaps the lower bubble and swallows taps.
 *
 *   - Labels appear from `sm` up, where there is room. On a phone the icons
 *     carry it, with an accessible name for screen readers.
 *
 * Each bubble renders only if its detail actually exists — a dead WhatsApp
 * link is worse than no bubble.
 */
export function FloatingActions() {
  const whatsapp = resolve(site.contact.whatsapp);
  const maps = resolve(site.contact.maps);

  if (!whatsapp && !maps) return null;

  const bubble =
    'liquid-rim group flex h-14 items-center gap-0 rounded-full bg-maroon text-cream ' +
    'transition-[transform,gap,padding] duration-300 hover:scale-105 active:scale-95 ' +
    'motion-reduce:transition-none motion-reduce:hover:scale-100 ' +
    // Collapsed to a circle on phones; widens to show its label from sm up.
    'w-14 justify-center sm:w-auto sm:justify-start sm:gap-2.5 sm:px-5';

  const label = 'hidden whitespace-nowrap text-sm font-medium sm:inline';

  return (
    <div
      className="fixed bottom-0 right-0 z-40 flex flex-col items-end gap-3 p-5"
      style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${site.name} on WhatsApp`}
          className={bubble}
        >
          <WhatsAppIcon className="h-6 w-6 shrink-0" />
          <span className={label}>WhatsApp</span>
        </a>
      )}

      {maps && (
        <a
          href={maps}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${site.name}`}
          className={bubble}
        >
          <MapPinIcon className="h-6 w-6 shrink-0" />
          <span className={label}>Directions</span>
        </a>
      )}
    </div>
  );
}
