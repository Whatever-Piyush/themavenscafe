'use client';

import { useEffect, useRef, useState } from 'react';
import { WaveIcon } from '@/components/ui/Icons';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

const STOPPED_KEY = 'music-stopped';

/** Interactions that browsers accept as permission to start sound. */
const GESTURES = ['click', 'keydown', 'touchend'] as const;

function readStopped(): boolean {
  try {
    return localStorage.getItem(STOPPED_KEY) === '1';
  } catch {
    return false;
  }
}

function writeStopped(stopped: boolean) {
  try {
    if (stopped) localStorage.setItem(STOPPED_KEY, '1');
    else localStorage.removeItem(STOPPED_KEY);
  } catch {
    // Private mode: the stop still holds for this page view.
  }
}

/**
 * Background music on/off.
 *
 * Plays from arrival until stopped. Browsers refuse sound before the visitor
 * has interacted with the page, so the attempt on load usually fails, and it
 * then starts on the first tap, click or key press anywhere. A stop is
 * remembered, so a visitor who turned it off is not played music on return.
 *
 * State follows the element's own play/pause events rather than the click, so
 * the button stays truthful when the phone interrupts playback for a call.
 *
 * Lives in the header, which sits in the root layout, so the music carries on
 * across page navigation.
 */
export function MusicToggle({ transparent }: { transparent: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const stoppedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    stoppedRef.current = readStopped();

    const start = () => {
      if (stoppedRef.current || !audio.paused || document.hidden) return;
      // Rejects while the browser is still blocking sound.
      audio.play().catch(() => {});
    };

    const onGesture = (event: Event) => {
      // The button's own click handles itself; starting here too would have
      // that same click immediately stop it again.
      if (buttonRef.current?.contains(event.target as Node)) return;
      start();
    };

    // Nobody wants a cafe playing from a pocket after switching apps.
    const onVisibilityChange = () => {
      if (document.hidden) audio.pause();
      else start();
    };

    start();
    GESTURES.forEach((name) => window.addEventListener(name, onGesture, { passive: true }));
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      GESTURES.forEach((name) => window.removeEventListener(name, onGesture));
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    stoppedRef.current = !audio.paused;
    writeStopped(stoppedRef.current);

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={site.music}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label="Background music"
        className={cn(
          'liquid-rim flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
          'transition-[scale,background-color,color] duration-300 hover:scale-105 active:scale-95',
          'motion-reduce:transition-none motion-reduce:hover:scale-100',
          // Colour follows the surface, like the call button beside it. On or
          // off is carried by the wave alone.
          transparent
            ? 'bg-cream/15 text-cream supports-[backdrop-filter]:bg-cream/10'
            : 'bg-maroon text-cream',
        )}
      >
        <WaveIcon flowing={playing} className="h-6 w-6" />
      </button>
    </>
  );
}
