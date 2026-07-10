/**
 * Categories Sitemap Generator
 * 
 * Generates sitemap for all category pages (e.g., /driver-jobs, /nurse-jobs)
 * URL: /sitemap-categories-[locale].xml -> /sitemap-categories/[locale]
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
    // Fetch all categories and locations from API
    const [categoriesResult, locationsResult] = await Promise.allSettled([
      ApiService.getCategories(),
      ApiService.getLocations(),
    ]);

    const categories = categoriesResult.status === 'fulfilled' && Array.isArray(categoriesResult.value) 
      ? categoriesResult.value 
      : [];
    const locations = locationsResult.status === 'fulfilled' && Array.isArray(locationsResult.value) 
      ? locationsResult.value 
      : [];

    // Add category pages (e.g., /driver-jobs)
    for (const category of categories) {
      if (!category.name) continue;
      
      const categorySlug = slugify(category.name);
      entries.push({
        path: `/${categorySlug}-jobs`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      });

      // Add category + city combinations (e.g., /driver-jobs/mumbai)
      // Limit to top 20 cities to avoid excessive URLs
      const topLocations = locations.slice(0, 20);
      for (const location of topLocations) {
        if (!location.name) continue;
        
        const locationSlug = slugify(location.name);
        entries.push({
          path: `/${categorySlug}-jobs/${locationSlug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error('Error generating categories sitemap:', error);
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
