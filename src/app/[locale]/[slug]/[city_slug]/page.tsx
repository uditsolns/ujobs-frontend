/**
 * Category × City Landing Page (e.g., /driver-jobs/delhi, /nurse-jobs/mumbai)
 * Dynamic SEO-optimized programmatic pages
 * 100% data-driven - PRIMARY SEO DRIVER
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Briefcase, ArrowRight, TrendingUp } from 'lucide-react';
import JobsService from '@/services/jobs.service';
import LocationsService from '@/services/locations.service';
import CategoriesService from '@/services/categories.service';
import { JOB_CATEGORIES, getCategoryBySlug } from '@/lib/constants/categories';
import { PRIORITY_CITIES, getCityBySlug } from '@/lib/constants/cities';
import { ROUTES, l } from '@/lib/constants/routes';
import { SEO_CONSTANTS } from '@/lib/constants/seo';
import { i18n, getDictionary, Locale } from '@/i18n';
import { generateJobListingMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateJobListSchema, renderJsonLd } from '@/lib/seo/schema';
import { capitalize } from '@/lib/utils/string';
import type { Job } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import JobCard from '@/components/jobs/JobCard';

interface CategoryCityPageProps {
  params: Promise<{
    slug: string;
    city_slug: string;
    locale: string;
  }>;
}

// Generate static params for high-priority combinations
export async function generateStaticParams() {
  const topCategories = JOB_CATEGORIES.filter((c) => c.priority === 1).slice(0, 10);
  const topCities = PRIORITY_CITIES.filter((c) => c.priority === 1);

  const combinations = [];
  for (const category of topCategories) {
    for (const city of topCities) {
      for (const locale of i18n.locales) {
        combinations.push({
          slug: `${category.slug}-jobs`,
          city_slug: city.slug,
          locale: locale,
        });
      }
    }
  }

  return combinations;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryCityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug, city_slug: citySlug, locale } = resolvedParams;
  
  // Guard against undefined params
  if (!slug || !citySlug) {
    return {
      title: 'Jobs | Ujobs India',
      description: 'Find jobs across India'
    };
  }
  
  const categorySlug = slug.replace(/-jobs$/, '');
  
  // Try constants first
  const categoryConst = getCategoryBySlug(categorySlug);
  const cityConst = getCityBySlug(citySlug);
  
  let categoryName = categoryConst?.name;
  let cityName = cityConst?.name;

  // If not in constants, try to find in API for better metadata
  if (!categoryName || !cityName) {
    try {
      const [apiCategories, apiLocations] = await Promise.all([
        CategoriesService.getCategories(),
        LocationsService.getLocations(),
      ]);

      if (!categoryName) {
        const match = apiCategories.find(c => 
          c.name.toLowerCase() === categorySlug.replace(/-/g, ' ') ||
          c.name.toLowerCase().replace(/ /g, '-') === categorySlug
        );
        categoryName = match?.name;
      }

      if (!cityName) {
        const match = apiLocations.find(l => 
          l.name?.toLowerCase() === citySlug.replace(/-/g, ' ') ||
          l.name?.toLowerCase().replace(/ /g, '-') === citySlug ||
          l.city?.toLowerCase() === citySlug.replace(/-/g, ' ')
        );
        cityName = match?.name;
      }
    } catch (e) {
      // Fallback to capitalized slug
    }
  }
  
  categoryName = categoryName || capitalize(categorySlug);
  cityName = cityName || capitalize(citySlug);
  
  return await generateJobListingMetadata(categoryName, cityName, locale);
}

// ISR Configuration
export const revalidate = 3600;

export default async function CategoryCityPage({ params }: CategoryCityPageProps) {
  // Extract slugs from URL
  const resolvedParams = await params;
  const { slug, city_slug: citySlug, locale } = resolvedParams;
  const dict = await getDictionary(locale as Locale);
  
  // Guard against undefined params
  if (!slug || !citySlug) {
    notFound();
  }
  
  const categorySlug = slug.replace(/-jobs$/, '');
  
  // 1. Initial lookup from constants for performance
  let categoryData = getCategoryBySlug(categorySlug);
  let cityData = getCityBySlug(citySlug);
  
  // 2. Fetch all categories and locations to find dynamic matches
  const [apiCategories, apiLocations] = await Promise.all([
    CategoriesService.getCategories(),
    LocationsService.getLocations(),
  ]);

  // Match category (from constants or API)
  const category = apiCategories.find((cat) =>
    (categoryData && cat.name.toLowerCase() === categoryData.name.toLowerCase()) ||
    (cat.name.toLowerCase() === categorySlug.replace(/-/g, ' ')) ||
    (cat.name.toLowerCase().replace(/ /g, '-') === categorySlug)
  );

  // Match location (from constants or API)
  const location = apiLocations.find((loc) =>
    (cityData && (loc.name?.toLowerCase() === cityData.name.toLowerCase() || loc.city?.toLowerCase() === cityData.name.toLowerCase())) ||
    (loc.name?.toLowerCase() === citySlug.replace(/-/g, ' ')) ||
    (loc.name?.toLowerCase().replace(/ /g, '-') === citySlug) ||
    (loc.city?.toLowerCase() === citySlug.replace(/-/g, ' '))
  );

  // If we can't find either in the API, we can't show jobs
  if (!category || !location) {
    // Last ditch effort for city metadata if it's in constants but not in API
    if (!categoryData || !cityData) {
      notFound();
    }
  }

  // Update names for UI if found via API
  const categoryName = category?.name || categoryData?.name || capitalize(categorySlug);
  const cityName = location?.name || cityData?.name || capitalize(citySlug);
  const stateName = cityData?.state || (location as any)?.state || 'India';

  // Fetch data
  let jobs: Job[] = [];
  if (category && location) {
    try {
      const res = await JobsService.getJobsByCategoryAndCity(category.id, location.id, cityName);
      jobs = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  }

  const jobCount = jobs.length;

  // Generate schema markup
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.common.home || 'Home', url: `/${locale}` },
    { name: dict.common.jobs || 'Jobs', url: `/${locale}${ROUTES.jobs.list}` },
    { name: `${categoryName} Jobs`, url: `/${locale}${ROUTES.category.detail(categorySlug)}` },
    { name: cityName, url: `/${locale}${ROUTES.category.city(categorySlug, citySlug)}` },
  ]);

  const jobListSchema = jobs.length > 0 ? generateJobListSchema(jobs.slice(0, 10)) : null;

  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)}
      />
      {jobListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(jobListSchema)}
        />
      )}

      <div className="min-h-screen bg-gray-50 pt-28 md:pt-32">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
          <div className="container-custom py-12 md:py-16">
            <div className="max-w-3xl">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Link href={l('/', locale)} className="text-brand-100 hover:text-white">
                  {dict.common.home}
                </Link>
                <span className="text-brand-200">/</span>
                <Link href={l(ROUTES.jobs.list, locale)} className="text-brand-100 hover:text-white">
                  {dict.common.jobs}
                </Link>
                <span className="text-brand-200">/</span>
                <Link
                  href={l(ROUTES.category.detail(categorySlug), locale)}
                  className="text-brand-100 hover:text-white"
                >
                  {categoryName}
                </Link>
                <span className="text-brand-200">/</span>
                <span className="text-white">{cityName}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {categoryName} Jobs in {cityName}
              </h1>
              <p className="text-xl text-brand-100 mb-6">
                {jobCount > 0
                  ? `${jobCount} verified ${categoryName.toLowerCase()} ${jobCount === 1 ? 'job' : 'jobs'} in ${cityName}, ${stateName}`
                  : `Explore ${categoryName.toLowerCase()} job opportunities in ${cityName}, ${stateName}`
                }
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href={l(ROUTES.jobs.list, locale)}>
                                  <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                                    <Briefcase className="mr-2 h-5 w-5" />
                                    Browse All Jobs
                                  </Button>
                                </Link>
                                <Link href={l(ROUTES.download.home, locale)}>
                                  <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-transparent border-white text-white hover:bg-white/10"
                                  >
                                    Download App
                                  </Button>
                                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-12">
          {/* Jobs Grid */}
          {jobs.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Latest {categoryName} Jobs in {cityName}
                </h2>
                <span className="text-gray-600">
                  {jobCount} {jobCount === 1 ? 'job' : 'jobs'} found
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} locale={locale} dict={dict} />
                ))}
              </div>
            </div>
          ) : (
            <Card padding="lg" className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No {categoryName} Jobs in {cityName} Right Now
              </h3>
              <p className="text-gray-600 mb-6">
                Check back later or explore similar opportunities
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={l(ROUTES.category.detail(categorySlug), locale)}>
                  <Button variant="outline">All {categoryName} Jobs</Button>
                </Link>
                <Link href={l(ROUTES.city.detail(citySlug), locale)}>
                  <Button variant="outline">All Jobs in {cityName}</Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Related Links */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {/* Other cities for this category */}
            <Card padding="lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {categoryName} Jobs in Other Cities
              </h3>
              <div className="space-y-2">
                {PRIORITY_CITIES.filter((c) => c.priority === 1 && c.slug !== citySlug)
                  .slice(0, 6)
                  .map((city) => (
                    <Link
                      key={city.id}
                      href={l(ROUTES.category.city(categorySlug, city.slug), locale)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-brand-600" />
                        <span className="text-gray-900 group-hover:text-brand-600">
                          {categoryName} in {city.name}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-600" />
                    </Link>
                  ))}
              </div>
            </Card>

            {/* Other categories in this city */}
            <Card padding="lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Other Jobs in {cityName}
              </h3>
              <div className="space-y-2">
                {JOB_CATEGORIES.filter((c) => c.priority === 1 && c.slug !== categorySlug)
                  .slice(0, 6)
                  .map((category) => (
                    <Link
                      key={category.id}
                      href={l(ROUTES.category.city(category.slug, citySlug), locale)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-brand-600" />
                        <span className="text-gray-900 group-hover:text-brand-600">
                          {category.name} in {cityName}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-600" />
                    </Link>
                  ))}
              </div>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="mt-16">
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {categoryName} Jobs in {cityName}: Your Complete Guide
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>
                  Looking for {categoryName.toLowerCase()} jobs in {cityName}? Ujobs India helps you find verified {categoryName.toLowerCase()} opportunities in {cityName}, {stateName}. We connect {categoryName.toLowerCase()} job seekers with employers hiring in {cityName}.
                </p>
                <p>
                  {jobCount > 0 ? (
                    <>
                      We currently feature <strong>{jobCount}</strong> verified {categoryName.toLowerCase()} {jobCount === 1 ? 'job' : 'jobs'} in {cityName} from various companies. Our platform makes it easy to search and apply for {categoryName.toLowerCase()} positions that match your skills and experience.
                    </>
                  ) : (
                    <>
                      While we don't have {categoryName.toLowerCase()} jobs listed in {cityName} at this moment, new opportunities are added regularly. Download our app to receive notifications when {categoryName.toLowerCase()} jobs become available in {cityName}.
                    </>
                  )}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  {categoryName} Job Opportunities in {cityName}
                </h3>
                <p>
                  {cityName} offers various opportunities for {categoryName.toLowerCase()} workers. The local economy and businesses in {cityName} create ongoing demand for skilled {categoryName.toLowerCase()} professionals.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  How to Apply for {categoryName} Jobs in {cityName}
                </h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Download the Ujobs India mobile app from Play Store or App Store</li>
                  <li>Create your profile and upload your resume</li>
                  <li>Search for {categoryName.toLowerCase()} jobs in {cityName}</li>
                  <li>Apply directly through the app with one tap</li>
                  <li>Track your application status in real-time</li>
                  <li>Communicate directly with employers</li>
                </ol>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  Benefits of Using Ujobs India for {categoryName} Jobs
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All {categoryName.toLowerCase()} jobs in {cityName} are verified by our team</li>
                  <li>Quick and easy application process through mobile app</li>
                  <li>Direct communication with hiring managers</li>
                  <li>Get hired within 24-48 hours for most positions</li>
                  <li>Free to use for job seekers</li>
                  <li>Regular updates on new {categoryName.toLowerCase()} opportunities in {cityName}</li>
                </ul>

                <p className="mt-6">
                  Start your {categoryName.toLowerCase()} career in {cityName} today! Download our app and apply to verified {categoryName.toLowerCase()} jobs in {cityName}, {stateName}.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
