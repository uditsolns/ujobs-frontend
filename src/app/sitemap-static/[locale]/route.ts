/**
 * Static Pages Sitemap Generator
 * 
 * Generates sitemap for all static pages (homepage, jobs, hire, etc.)
 * URL: /sitemap-static-[locale].xml -> /sitemap-static/[locale]
 */

import { NextRequest } from 'next/server';
import { generateMultilingualSitemapXML, SitemapEntry } from '@/lib/utils/sitemap';

// All static pages without locale prefix
const STATIC_PAGES: SitemapEntry[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/jobs', priority: 0.9, changeFrequency: 'daily' },
  { path: '/hire', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/download', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/candidates', priority: 0.8, changeFrequency: 'daily' },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
): Promise<Response> {
  const { locale } = await params;
  
  // Generate XML using the utility
  const xml = generateMultilingualSitemapXML(STATIC_PAGES, locale);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
