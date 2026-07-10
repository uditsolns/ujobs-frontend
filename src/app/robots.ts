import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujobsindia.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', 
          '/_next/', 
          '/admin/', 
          '/dashboard/', 
          '/profile/edit',
          '/search?*', // Prevent crawl of internal search result pages to avoid duplicate content
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
