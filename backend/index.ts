/**
 * @mavens/backend — public surface.
 *
 * V1 is intentionally almost empty. The Mavens Cafe website is a marketing site
 * with no database, no accounts, no forms and no payments, so there is no
 * server-side work to do beyond proving the runtime is alive.
 *
 * That emptiness is the design, not an unfinished state. This package exists to
 * hold the boundary: when real server logic arrives (a contact form, menu
 * management, ordering), it lands here — validated, framework-agnostic, free of
 * React — and the frontend reaches it through a thin adapter in app/api.
 *
 * The rule that keeps the boundary real: nothing in this package may import
 * React, Next.js, or anything from frontend/.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  CURRENTLY UNREFERENCED — DELIBERATELY, NOT BY NEGLECT
 *
 *  The website is built with `output: 'export'` as a fully static bundle, so
 *  there is no server in production and therefore no route handler importing
 *  this package. The Next adapter that used to live at
 *  `frontend/app/api/health/route.ts` was removed because `output: 'export'`
 *  rejects it outright:
 *
 *      Error: export const dynamic = "force-dynamic" on page "/api/health"
 *             cannot be used with "output: export"
 *
 *  A health check is meaningless in a static export anyway. The CDN would
 *  return a build-time timestamp from a cached file and report "ok" whatever
 *  the state of the world — which is worse than having no check, because it
 *  looks like a signal.
 *
 *  This package is kept intact so server-side work has somewhere to go. To
 *  bring it back, add a Netlify Function (`netlify/functions/health.ts`) that
 *  imports `getHealth` from here. Nothing in this folder needs to change —
 *  which was the point of keeping it framework-agnostic.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export { getHealth, type HealthStatus } from './api/health';
