import type { NextConfig } from 'next';

/**
 * Static export configuration.
 *
 * The site is built to a folder of plain HTML, CSS, JS and assets in
 * `frontend/out`, which any static host can serve. There is no Node runtime in
 * production, which suits this project: V1 has no database, no forms and no
 * per-request work, so nothing was using a server anyway.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  SECURITY HEADERS HAVE MOVED
 *
 *  Headers cannot be set from here under `output: 'export'` — Next emits
 *  "Specified headers will not automatically work with output: export" and
 *  silently drops them, because there is no server left to attach them to.
 *  Headers are now the HOST's responsibility and live in `netlify.toml` at the
 *  repository root.
 *
 *  If you change a header, change it there. Leaving a `headers()` block here
 *  would be worse than useless: it would look authoritative while doing
 *  nothing.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const nextConfig: NextConfig = {
  /**
   * Emit a fully static site into `frontend/out`.
   * `out` is the Next default for exports and is relative to this directory.
   */
  output: 'export',

  reactStrictMode: true,

  // Advertising the exact framework is free reconnaissance. Harmless to omit.
  // (Under static export no Next server runs, so this is belt-and-braces for
  // `next start` / dev only.)
  poweredByHeader: false,

  /**
   * The backend workspace is kept in the repo for future server-side work but
   * is no longer imported by the static site — see the note in
   * `backend/index.ts`. The transpile entry stays so that re-introducing an
   * import (behind a Netlify Function, say) needs no config archaeology.
   */
  transpilePackages: ['@mavens/backend'],

  images: {
    /**
     * REQUIRED by `output: 'export'`, and a genuine trade-off worth naming.
     *
     * Next's image optimiser is a server that resizes and re-encodes on
     * request. A static export has no server, so the optimiser cannot run and
     * the build fails unless images are marked unoptimised.
     *
     * What is lost: automatic AVIF/WebP negotiation and automatic resizing.
     * `next/image` still does the things that matter most for layout quality —
     * width/height reserve space so there is no layout shift, `sizes` still
     * drives `srcset` selection, and lazy-loading still applies.
     *
     * Practical impact today is ZERO: `content/gallery.ts` is empty, so the
     * site ships no raster images at all. It becomes real when photography
     * arrives, and the mitigations are in the README — pre-encode to AVIF/WebP
     * at the correct sizes before committing, or adopt a Netlify Image CDN
     * loader.
     */
    unoptimized: true,
  },
};

export default nextConfig;
