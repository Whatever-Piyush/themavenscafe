import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/**
 * robots.txt.
 *
 * Under `output: 'export'` this is evaluated once at BUILD time and written as
 * a static file. That is the correct moment: each deploy context (production
 * vs preview) runs its own build, so each gets the rules it should have.
 */

/**
 * Required by `output: 'export'`.
 *
 * Reading process.env below makes Next treat this metadata route as dynamic,
 * and it refuses to export a dynamic route:
 *
 *     Error: export const dynamic = "force-static"/export const revalidate not
 *            configured on route "/robots.txt" with "output: export"
 *
 * `force-static` says what we actually mean: evaluate once at build time and
 * write a plain file. The env lookup still happens — during the build, which is
 * the only moment that exists in a static export anyway.
 */
export const dynamic = 'force-static';

/**
 * Whether this build is a preview rather than production.
 *
 * Checked across hosts so the behaviour survives a move between them:
 *   - Netlify sets CONTEXT to 'production' | 'deploy-preview' | 'branch-deploy'
 *   - Vercel sets VERCEL_ENV to 'production' | 'preview' | 'development'
 *
 * Defaults to treating the build as production when neither is present (a local
 * `npm run build`), which keeps local output identical to the real thing.
 */
function isPreviewBuild(): boolean {
  const netlifyContext = process.env.CONTEXT;
  if (netlifyContext && netlifyContext !== 'production') return true;

  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === 'preview') return true;

  return false;
}

export default function robots(): MetadataRoute.Robots {
  /**
   * Preview deployments must never be indexed — they would compete with
   * production for the same queries and leak unfinished work into search.
   */
  if (isPreviewBuild()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
