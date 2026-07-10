/**
 * Unified Landing Page (e.g., /driver-jobs, /delhi-jobs)
 * Handles both Category and City landing pages based on slug
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug } from '@/lib/constants/cities';
import { getCategoryBySlug } from '@/lib/constants/categories';
import { getDictionary, Locale } from '@/i18n';
import CategoriesService from '@/services/categories.service';
import LocationsService from '@/services/locations.service';
import { capitalize } from '@/lib/utils/string';

// We will import the actual view components once we've prepared them
// For now, we will reuse the logic from both
import CategoryPageContent from './CategoryPageContent';
import CityPageContent from './CityPageContent';

interface UnifiedPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: UnifiedPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!slug) return { title: 'Jobs | Ujobs India' };

  const baseSlug = slug.replace(/-jobs$/, '');
  
  // Try to find if it's a category or city
  const categoryData = getCategoryBySlug(baseSlug);
  const cityData = getCityBySlug(baseSlug);

  if (categoryData) {
    const { generateJobListingMetadata } = await import('@/lib/seo/metadata');
    return await generateJobListingMetadata(categoryData.name, undefined, locale);
  }

  if (cityData) {
    const { generateJobListingMetadata } = await import('@/lib/seo/metadata');
    return await generateJobListingMetadata(undefined, cityData.name, locale);
  }

  // Fallback for dynamic cities not in constants
  const { generateJobListingMetadata } = await import('@/lib/seo/metadata');
  return await generateJobListingMetadata(undefined, capitalize(baseSlug), locale);
}

export default async function UnifiedPage({ params }: UnifiedPageProps) {
  const { slug, locale } = await params;
  if (!slug) notFound();

  const dict = await getDictionary(locale as Locale);
  const baseSlug = slug.replace(/-jobs$/, '');
  
  // 1. Check if it's a category (Priority lookup)
  const categories = await CategoriesService.getCategories();
  const category = categories.find((cat: any) => 
    (cat.name || cat.work_type_name).toLowerCase() === baseSlug.toLowerCase() ||
    (cat.name || cat.work_type_name).toLowerCase().replace(/ /g, '-') === baseSlug
  );

  if (category) {
    return <CategoryPageContent category={category} slug={slug} locale={locale} dict={dict} />;
  }

  // 2. Check if it's a city (Constants lookup first, then API)
  const cityData = getCityBySlug(baseSlug);
  if (cityData) {
    return <CityPageContent cityData={cityData} slug={slug} locale={locale} dict={dict} />;
  }

  // 3. Dynamic City lookup from API
  const locations = await LocationsService.getLocations();
  const apiLocation = locations.find((loc: any) =>
    (loc.name || '').toLowerCase() === baseSlug.toLowerCase() ||
    (loc.city || '').toLowerCase() === baseSlug.toLowerCase() ||
    (loc.location_name || '').toLowerCase() === baseSlug.toLowerCase() ||
    (loc.name || '').toLowerCase().replace(/ /g, '-') === baseSlug
  );

  if (apiLocation) {
    const dynamicCityData = {
      id: apiLocation.id,
      name: apiLocation.name || apiLocation.location_name,
      slug: baseSlug,
      state: apiLocation.state || 'India',
      priority: 2
    };
    return <CityPageContent cityData={dynamicCityData} slug={slug} locale={locale} dict={dict} />;
  }

  notFound();
}
