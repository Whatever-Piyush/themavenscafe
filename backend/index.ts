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
 */

export { getHealth, type HealthStatus } from './api/health';
