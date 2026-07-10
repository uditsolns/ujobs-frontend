/**
 * Cities Sitemap Generator
 * 
 * Generates sitemap for all city pages (e.g., /mumbai-jobs, /delhi-jobs)
 * URL: /sitemap-cities-[locale].xml -> /sitemap-cities/[locale]
 */

import { NextRequest } from 'next/server';
import ApiService from '@/services/api.service';
import { slugify } from '@/lib/utils/string';
import { generateMultilingualSitemapXML, SitemapEntry } from '@/lib/utils/sitemap';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
): Promise<Response> {
  const { locale } = await params;
  const entries: SitemapEntry[] = [];

  try {
    // Fetch all locations from API
    const locations = await ApiService.getLocations();

    if (Array.isArray(locations)) {
      // Add city pages (e.g., /mumbai-jobs, /delhi-jobs)
      for (const location of locations) {
        if (!location.name) continue;
        
        const citySlug = slugify(location.name);
        entries.push({
          path: `/${citySlug}-jobs`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.9,
        });
      }
    }
  } catch (error) {
    console.error('Error generating cities sitemap:', error);
  }

  // Generate XML
  const xml = generateMultilingualSitemapXML(entries, locale);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
