import type { NextConfig } from 'next';

/**
 * Security headers.
 *
 * These live here rather than in middleware on purpose. V1 has no per-request
 * work to do, so every page can be statically generated and served straight
 * from Vercel's CDN. Middleware would run a function on every request to
 * produce headers that never change — cost and complexity for nothing.
 *
 * On the CSP specifically, and stated plainly rather than dressed up:
 *
 *   `script-src` includes 'unsafe-inline'. Next.js inlines its hydration data
 *   into the HTML, and the strict alternative (a per-request nonce with
 *   'strict-dynamic') requires rendering every page dynamically — which would
 *   trade away static delivery, the thing that makes this site fast and cheap.
 *
 *   That trade is reasonable HERE, and the reason is specific: this site has no
 *   database, no user accounts, no forms, no uploads and no user-generated
 *   content. There is no mechanism by which an attacker's script could reach a
 *   page in the first place, so the inline-script allowance is not guarding a
 *   realistic path. It is NOT a general-purpose excuse: the moment this site
 *   renders anything a user supplied, revisit this line first.
 *
 * Everything else is locked down, because the rest costs nothing.
 */
function securityHeaders() {
  const isProduction = process.env.NODE_ENV === 'production';

  const csp = [
    "default-src 'self'",

    /**
     * `unsafe-eval` is DEVELOPMENT ONLY.
     *
     * React's dev build uses eval() for debugging features such as
     * reconstructing call stacks across environments; without this the console
     * fills with CSP violations while working locally. React never uses eval()
     * in production, so the allowance is conditional and must stay that way —
     * shipping `unsafe-eval` would undo much of the point of having a CSP.
     */
    `script-src 'self' 'unsafe-inline'${isProduction ? '' : " 'unsafe-eval'"}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    // Nobody may frame this site — clickjacking defence.
    "frame-ancestors 'none'",
    // No third-party frames are used in V1. When a map embed is added, this is
    // the line that needs a host added to it.
    "frame-src 'none'",
    // Stops an injected <base> tag re-pointing every relative URL.
    "base-uri 'self'",
    // Any form may only submit back to us.
    "form-action 'self'",
    "object-src 'none'",
    "media-src 'self'",
    "manifest-src 'self'",
    ...(isProduction ? ['upgrade-insecure-requests'] : []),
  ].join('; ');

  const headers = [
    { key: 'Content-Security-Policy', value: csp },
    // Stops the browser second-guessing our Content-Type.
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // Belt and braces alongside frame-ancestors, for older browsers.
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Switch off device APIs this site has no reason to touch.
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'X-DNS-Prefetch-Control', value: 'off' },
  ];

  /**
   * HSTS only in production. Over plain http a browser ignores it anyway, but
   * emitting it in development is how people accidentally pin localhost to
   * https and then spend an afternoon wondering why nothing loads.
   */
  if (isProduction) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    });
  }

  return headers;
}

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,

  // Advertising the exact framework is free reconnaissance, and there is no
  // cost to not doing it.
  poweredByHeader: false,

  /**
   * The backend workspace ships TypeScript source rather than a compiled build,
   * so Next transpiles it. This also means the two packages can never drift the
   * way a stale dist/ would allow.
   */
  transpilePackages: ['@mavens/backend'],

  images: {
    formats: ['image/avif', 'image/webp'],
    /**
     * No remote patterns. Only local images are used, and an open image
     * optimiser is a genuine abuse vector — it lets someone else's traffic
     * consume our quota by proxying their images through our domain.
     */
    remotePatterns: [],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders() }];
  },
};

export default nextConfig;
