/**
 * Root Sitemap Index Handler
 * 
 * Generates a standard <sitemapindex> for search engines.
 * Links to sub-sitemaps for static pages, categories, cities, and paginated jobs.
 */

import { i18n } from '@/i18n';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujobsindia.com';

export async function GET(): Promise<Response> {
  const locales = i18n.locales;
  const sitemaps: string[] = [];

  // Generate sub-sitemap URLs for each language
  for (const locale of locales) {
    // Static pages sitemap
    sitemaps.push(`${BASE_URL}/sitemap-static-${locale}.xml`);

    // Category pages sitemap
    sitemaps.push(`${BASE_URL}/sitemap-categories-${locale}.xml`);

    // City pages sitemap
    sitemaps.push(`${BASE_URL}/sitemap-cities-${locale}.xml`);

    // Job pages sitemaps (paginated for scalability)
    // For 100k+ jobs, we use multiple pages
    const maxJobsPerSitemap = 10000;
    const estimatedTotalJobs = 100000;
    const jobSitemapPages = Math.ceil(estimatedTotalJobs / maxJobsPerSitemap);

    // Limit to 20 pages per language for now (200k jobs per language)
    for (let page = 1; page <= Math.min(jobSitemapPages, 20); page++) {
      sitemaps.push(`${BASE_URL}/sitemap-jobs-${locale}-${page}.xml`);
    }
  }

  const xml = generateSitemapIndexXML(sitemaps);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function generateSitemapIndexXML(sitemaps: string[]): string {
  const now = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;
}
