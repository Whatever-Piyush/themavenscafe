import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  /**
   * Preview deployments must never be indexed — they would compete with
   * production for the same queries and leak unfinished work into search.
   */
  if (process.env.VERCEL_ENV === 'preview') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Nothing useful for a crawler behind /api, and crawling it only burns
      // serverless invocations.
      disallow: ['/api/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
