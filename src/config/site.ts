/**
 * Site Configuration
 * Central configuration for the Ujobs India website
 */

export const siteConfig = {
  name: 'Ujobs India',
  description: 'Find verified jobs across India. Apply directly through our app. 10,000+ jobs in delivery, sales, telecalling, healthcare, and 50+ categories.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ujobsindia.com',
  ogImage: '/og-image.jpg',
  
  links: {
    playStore: process.env.NEXT_PUBLIC_PLAYSTORE_URL || 'https://play.google.com/store/apps/details?id=com.ujobsindia',
    appStore: process.env.NEXT_PUBLIC_APPSTORE_URL || 'https://apps.apple.com/in/app/ujobs-india/id6741137870',
    twitter: 'https://twitter.com/ujobsindia',
    facebook: 'https://facebook.com/ujobsindia',
    instagram: 'https://instagram.com/ujobsindia',
    linkedin: 'https://linkedin.com/company/ujobsindia',
  },
  
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@ujobsindia.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-1234567890',
  },
  
  company: {
    name: 'Ujobs India',
    address: 'India',
    registeredName: 'Ujobs India Private Limited',
  },
  
  // SEO defaults
  defaultTitle: 'Ujobs India - Find Verified Jobs Across India',
  titleTemplate: '%s | Ujobs India',
  defaultDescription: 'Join India\'s most trusted platform for finding verified jobs. 10,000+ jobs in delivery, sales, telecalling, healthcare, drivers, and 50+ categories. Apply easily via mobile app.',
  
  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
  },
  
  // Feature flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableSEOLogs: process.env.NEXT_PUBLIC_ENABLE_SEO_LOGS === 'true',
  },
} as const;

export type SiteConfig = typeof siteConfig;
