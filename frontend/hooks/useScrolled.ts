'use client';

import { useEffect, useState } from 'react';

/**
 * Reports whether the page has scrolled past a threshold.
 *
 * Uses a passive listener and coalesces work into a single rAF callback, so
 * fast scrolling cannot queue up more state updates than the browser can paint.
 * A naive `onScroll -> setState` is the most common cause of janky headers.
 */
export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(read);
    };

    // Run once on mount: the page may be restored mid-scroll on a back
    // navigation, and the header must match where the user actually is.
    read();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}
