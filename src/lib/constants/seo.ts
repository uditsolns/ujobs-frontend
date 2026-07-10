/**
 * SEO Constants
 * Default SEO values and configurations
 */

export const SEO_CONSTANTS = {
  defaultTitle: 'Ujobs India - Find Verified Jobs Across India',
  titleTemplate: '%s | Ujobs India',
  defaultDescription:
    'Join India\'s most trusted platform for finding verified jobs. 10,000+ jobs in delivery, sales, telecalling, healthcare, drivers, and 50+ categories. Apply easily via mobile app.',
  
  keywords: [
    'jobs in india',
    'verified jobs',
    'job search',
    'employment',
    'delivery jobs',
    'driver jobs',
    'telecaller jobs',
    'sales jobs',
    'nursing jobs',
    'healthcare jobs',
    'quick hiring',
    'mobile app jobs',
  ],
  
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Ujobs India',
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@ujobsindia',
    creator: '@ujobsindia',
  },
  
  // Revalidation times (in seconds)
  revalidate: {
    homepage: 300, // 5 minutes
    jobListing: 300, // 5 minutes
    jobDetail: 600, // 10 minutes
    seoPages: 3600, // 1 hour
    staticPages: 86400, // 24 hours
  },
} as const;

export type SEOConstants = typeof SEO_CONSTANTS;
