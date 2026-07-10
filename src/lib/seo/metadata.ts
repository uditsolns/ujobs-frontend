/**
 * SEO Metadata Utilities
 * Helper functions for generating SEO metadata
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { SEO_CONSTANTS } from '@/lib/constants/seo';
import { i18n } from '@/i18n';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  noIndex?: boolean;
  locale?: string;
}

/**
 * Generate standard page metadata
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  path = '/',
  noIndex = false,
  locale = 'en',
}: GenerateMetadataProps): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : SEO_CONSTANTS.defaultTitle;
  
  const pageDescription = description || SEO_CONSTANTS.defaultDescription;
  const pageImage = image || `${siteConfig.url}${siteConfig.ogImage}`;
  
  // Ensure path doesn't already have locale
  const cleanPath = path.startsWith(`/${locale}/`) 
    ? path.replace(`/${locale}`, '') 
    : (path === `/${locale}` ? '/' : path);
    
  const canonicalUrl = `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
  
  const allKeywords = [...SEO_CONSTANTS.keywords, ...keywords];

  const languages: Record<string, string> = {};
  i18n.locales.forEach((l) => {
    languages[l] = `/${l}${cleanPath === '/' ? '' : cleanPath}`;
  });

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    authors: [{ name: siteConfig.company.name }],
    creator: siteConfig.company.name,
    publisher: siteConfig.company.name,
    
    metadataBase: new URL(siteConfig.url),
    
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `/en${cleanPath === '/' ? '' : cleanPath}`,
      },
    },
    
    openGraph: {
      type: 'website',
      locale: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'kn', 'gu', 'pa', 'ml', 'or', 'ne'].includes(locale) 
        ? `${locale === 'en' ? 'en' : locale}_IN` 
        : locale,
      url: canonicalUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: '@ujobsindia',
    },
    
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/**
 * Generate metadata for job listing pages
 */
export async function generateJobListingMetadata(
  category?: string,
  city?: string,
  locale: string = 'en'
): Promise<Metadata> {
  const { getDictionary } = await import('@/i18n');
  const dict = await getDictionary(locale as any);
  const seo = dict.seo;
  const common = dict.common as any;

  let title: string;
  let description: string;
  let keywords: string[] = [];

  // Multilingual keyword parts
  const jobsLabel = common.jobs || 'Jobs';
  const vacancyLabel = common.vacancy || 'Vacancy';
  const hiringLabel = common.hiring || 'Hiring';
  const latestLabel = common.latest || 'Latest';

  if (category && city) {
    title = seo.categoryInCityTitle.replace('{{category}}', category).replace('{{city}}', city);
    description = seo.categoryInCityDescription.replace('{{category}}', category).replace('{{city}}', city);
    keywords = [
      `${category} ${jobsLabel} ${city}`,
      `${category} ${vacancyLabel} ${city}`,
      `${category} ${hiringLabel} ${city}`,
      `${latestLabel} ${category} ${jobsLabel} ${city}`,
    ];
  } else if (category) {
    title = seo.categoryTitle.replace('{{category}}', category);
    description = seo.categoryDescription.replace('{{category}}', category);
    keywords = [
      `${category} ${jobsLabel}`,
      `${category} ${vacancyLabel}`,
      `${category} ${hiringLabel}`,
      `${latestLabel} ${category} ${jobsLabel}`,
    ];
  } else if (city) {
    title = seo.cityTitle.replace('{{city}}', city);
    description = seo.cityDescription.replace('{{city}}', city);
    keywords = [
      `${jobsLabel} in ${city}`,
      `${vacancyLabel} in ${city}`,
      `${hiringLabel} in ${city}`,
      `${latestLabel} ${jobsLabel} in ${city}`,
    ];
  } else {
    title = common.findJobs || 'Find Jobs';
    description = seo.description;
  }

  const path = category && city
    ? `/jobs/${category.toLowerCase()}-jobs-in-${city.toLowerCase()}`
    : category
    ? `/jobs/${category.toLowerCase()}-jobs`
    : city
    ? `/jobs/jobs-in-${city.toLowerCase()}`
    : '/jobs';

  return generateMetadata({ title, description, keywords, path, locale });
}

/**
 * Generate metadata for job detail pages
 */
export function generateJobDetailMetadata(
  job: {
    id: string | number;
    title: string;
    description: string;
    location?: string;
    company?: string;
  },
  locale: string = 'en'
): Metadata {
  const title = `${job.title} ${job.location ? `in ${job.location}` : ''} - ${job.company || 'Ujobs India'}`;
  const description = (job.description || '').slice(0, 160) + '...';
  
  const path = `/jobs/${job.id}-${job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  
  return generateMetadata({
    title,
    description,
    keywords: [
      job.title,
      `${job.title} jobs`,
      job.location || '',
      job.company || '',
    ],
    path,
    locale
  });
}
