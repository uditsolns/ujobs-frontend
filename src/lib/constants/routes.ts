/**
 * Routes Configuration
 * Centralized route definitions
 */

import { slugify, encodeId } from '../utils/string';

export const ROUTES = {
  home: '/',
  
  jobs: {
    list: '/jobs',
    search: '/jobs/search',
    detail: (id: string | number, title?: string, location?: string) => {
      let slug = `${id}`;
      if (title) slug += `-${slugify(title)}`;
      if (location) slug += `-in-${slugify(location)}`;
      return `/jobs/${slug}`;
    },
  },
  
  category: {
    detail: (slug: string) => `/${slugify(slug)}-jobs`,
    city: (categorySlug: string, citySlug: string) => `/${slugify(categorySlug)}-jobs/${slugify(citySlug)}`,
  },
  
  city: {
    detail: (slug: string) => `/${slugify(slug)}-jobs`,
  },
  
  employer: {
    home: '/hire',
    pricing: '/hire/pricing',
    contact: '/hire/contact',
  },
  
  download: {
    home: '/download',
    android: 'https://play.google.com/store/apps/details?id=com.ujobsindia',
    ios: 'https://apps.apple.com/in/app/ujobs-india/id6741137870',
  },
  
  about: '/about',
  contact: '/contact',
  
  candidates: {
    list: '/candidates',
    detail: (id: string | number, name?: string, category?: string, city?: string) => {
      const encoded = encodeId(id);
      let slug = `${encoded}`;
      if (name) slug += `-${slugify(name)}`;
      if (category) slug += `-${slugify(category)}`;
      if (city) slug += `-in-${slugify(city)}`;
      return `/candidates/${slug}`;
    },
  },
  
  legal: {
    privacy: '/privacy',
    terms: '/terms',
    disclaimer: '/terms', // Fallback
  },
  
  auth: {
    login: '/login',
    register: '/login?mode=register',
    forgotPassword: '/forgot-password',
  },
} as const;

export type Routes = typeof ROUTES;

/**
 * Helper to ensure a path starts with the current locale
 * CRITICAL: Prevents 404 errors by always adding /[locale] prefix
 */
export function l(path: string, locale: string): string {
  // If path is an external URL, return it as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If path already starts with the locale (e.g. /en/jobs), don't add it again
  const localePrefix = `/${locale}`;
  if (path.startsWith(`${localePrefix}/`) || path === localePrefix) {
    return path;
  }
  
  // Clean path: ensure it starts with / but not double //
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${localePrefix}${cleanPath}`;
}
