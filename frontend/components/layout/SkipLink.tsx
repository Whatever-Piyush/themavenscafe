/**
 * Skip-to-content link.
 *
 * Visually hidden until focused. For a keyboard or screen-reader user this is
 * the difference between landing on the page and tabbing through the entire
 * navigation on every single page load.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                 focus:rounded-full focus:bg-maroon focus:px-6 focus:py-3 focus:text-sm
                 focus:font-medium focus:text-cream focus:shadow-lift"
    >
      Skip to content
    </a>
  );
}
