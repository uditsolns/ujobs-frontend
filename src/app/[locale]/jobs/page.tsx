import { Suspense } from 'react';
import { ApiService } from '@/services/api.service';
import JobsClient from '@/components/jobs/JobsClient';
import { getDictionary, Locale } from '@/i18n';
import { JobListResponse, WorkType, Location } from '@/types';

import { generateJobListingMetadata } from '@/lib/seo/metadata';
import { generateJobListSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata({ 
  params,
  searchParams, 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;
  const location = typeof resolvedSearchParams.location === 'string' ? resolvedSearchParams.location : undefined;
  
  return generateJobListingMetadata(category, location, locale);
}

export default async function JobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(locale as Locale);
  
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const location = typeof resolvedSearchParams.location === 'string' ? resolvedSearchParams.location : '';
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : '';
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;

  let initialJobs: any[] = [];
  let categories: WorkType[] = [];
  let locations: Location[] = [];
  let totalJobs = 0;
  let totalPages = 1;
  
  try {
    // Fetch categories and locations in parallel
    const [categoriesRes, locationsRes] = await Promise.all([
      ApiService.getCategories(),
      ApiService.getLocations()
    ]);

    categories = Array.isArray(categoriesRes) ? categoriesRes : [];
    locations = Array.isArray(locationsRes) ? locationsRes : [];

    // Fetch jobs based on search params if they exist, otherwise get regular list
    if (q || location || category) {
      const searchParams: any = { page, per_page: 12 };
      if (q) searchParams.query = q;
      if (location) searchParams.job_location = location;
      if (category) {
        const cat = categories.find(c => c.name === category);
        if (cat) searchParams.work_type_id = cat.id;
      }
      
      const searchRes = await ApiService.searchJobs(searchParams) as any;
      if (searchRes.status === 'success') {
        const rawData = searchRes.data || [];
        initialJobs = Array.isArray(rawData) ? rawData.filter((item: any) => item && typeof item === 'object' && !item.pincode) : [];
        totalJobs = searchRes.total || searchRes.meta?.total || initialJobs.length;
        totalPages = searchRes.last_page || searchRes.meta?.last_page || 1;
      } else {
        initialJobs = Array.isArray(searchRes) ? searchRes.filter((item: any) => item && typeof item === 'object' && !item.pincode) : [];
        totalJobs = initialJobs.length;
      }
    } else {
      const jobsData = await ApiService.getJobs(page) as any;
      if (jobsData.status === 'success') {
        const rawData = jobsData.data || [];
        initialJobs = Array.isArray(rawData) ? rawData.filter((item: any) => item && typeof item === 'object' && !item.pincode) : [];
        totalJobs = jobsData.total || jobsData.meta?.total || initialJobs.length;
        totalPages = jobsData.last_page || jobsData.meta?.last_page || 1;
      } else {
        const rawData = Array.isArray(jobsData) ? jobsData : (jobsData.data || []);
        initialJobs = Array.isArray(rawData) ? rawData.filter((item: any) => item && typeof item === 'object' && !item.pincode) : [];
        totalJobs = initialJobs.length;
      }
    }
    
  } catch (error) {
    console.error('Error in Jobs page data fetching:', error);
  }

  const jobListSchema = generateJobListSchema(initialJobs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Jobs', url: '/jobs' }
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-brand-600">Loading jobs...</div>}>
      <JsonLd schema={jobListSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JobsClient 
        initialJobs={initialJobs}
        categories={categories}
        locations={locations}
        locale={locale}
        dict={dict}
        initialTotal={totalJobs}
        initialTotalPages={totalPages}
        initialPage={page}
        initialQ={q}
        initialLocation={location}
        initialCategory={category}
      />
    </Suspense>
  );
}
