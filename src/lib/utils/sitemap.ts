import { i18n } from '@/i18n';

export interface SitemapEntry {
  path: string; // Path without locale, e.g., "", "/jobs", "/hire"
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujobsindia.com';

/**
 * Generates a multilingual sitemap XML with xhtml:link alternates.
 * This is the recommended way by Google for multilingual sites.
 */
export function generateMultilingualSitemapXML(entries: SitemapEntry[], currentLocale: string): string {
  const urls = entries.map((entry) => {
    // Ensure path starts with / if not empty
    const normalizedPath = entry.path === '' ? '' : (entry.path.startsWith('/') ? entry.path : `/${entry.path}`);
    
    const loc = `${BASE_URL}/${currentLocale}${normalizedPath}`;
    
    // Generate alternate links for all supported locales
    const alternates = i18n.locales.map((locale) => {
      return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${BASE_URL}/${locale}${normalizedPath}" />`;
    }).join('\n');
    
    // Add x-default (usually English)
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${normalizedPath}" />`;

    const lastMod = entry.lastModified instanceof Date 
      ? entry.lastModified.toISOString() 
      : (entry.lastModified || new Date().toISOString());

    return `  <url>
    <loc>${loc}</loc>
${alternates}
${xDefault}
    <lastmod>${lastMod}</lastmod>
    <changefreq>${entry.changeFrequency || 'daily'}</changefreq>
    <priority>${entry.priority || 0.5}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}
