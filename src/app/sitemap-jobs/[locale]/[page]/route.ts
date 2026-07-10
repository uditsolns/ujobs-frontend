/**
 * Jobs Sitemap Generator (Paginated)
 * 
 * Generates paginated sitemap for all job detail pages
 * URL: /sitemap-jobs-[locale]-[page].xml -> /sitemap-jobs/[locale]/[page]
 */

import { NextRequest } from 'next/server';
import JobsService from '@/services/jobs.service';
import { ROUTES } from '@/lib/constants/routes';
import { generateMultilingualSitemapXML, SitemapEntry } from '@/lib/utils/sitemap';

const JOBS_PER_SITEMAP = 10000;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string; page: string }> }
): Promise<Response> {
  const { locale, page } = await params;
  const pageNumber = parseInt(page, 10);
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    return new Response('Invalid page number', { status: 400 });
  }

  const entries: SitemapEntry[] = [];

  try {
    const startIndex = (pageNumber - 1) * JOBS_PER_SITEMAP;
    const jobs = await JobsService.getAllJobsPaginated(startIndex, JOBS_PER_SITEMAP);

    if (Array.isArray(jobs)) {
      for (const job of jobs) {
        if (!job.id) continue;
        
        const jobTitle = job.job_title || job.name || 'Job Opening';
        const locationName = job.location?.name || job.location?.city || job.location?.location_name;
        
        entries.push({
          path: ROUTES.jobs.detail(job.id, jobTitle, locationName),
          lastModified: new Date(job.updated_at || job.created_at || new Date()),
          changeFrequency: 'hourly',
          priority: 1.0,
        });
      }
    }
  } catch (error) {
    console.error(`Error generating jobs sitemap (page ${pageNumber}):`, error);
  }

  if (entries.length === 0) {
    return new Response(generateEmptySitemapXML(), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
    });
  }

  const xml = generateMultilingualSitemapXML(entries, locale);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  });
}

function generateEmptySitemapXML(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
}
