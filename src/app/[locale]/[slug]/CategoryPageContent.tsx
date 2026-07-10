import Link from 'next/link';
import { Briefcase, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import JobsService from '@/services/jobs.service';
import { ROUTES, l } from '@/lib/constants/routes';
import { generateBreadcrumbSchema, generateJobListSchema, renderJsonLd } from '@/lib/seo/schema';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import JobCard from '@/components/jobs/JobCard';
import { getTier1Cities } from '@/lib/constants/cities';

export default async function CategoryPageContent({ category, slug, locale, dict }: any) {
  const categoryName = category.name || category.work_type_name;
  const jobsData = await JobsService.getJobsByCategory(category.id) as any;
  const jobs = Array.isArray(jobsData) ? jobsData : (jobsData.data || []);
  const jobCount = jobs.length;
  const topCities = getTier1Cities();

  // Generate schema markup
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.common.home, url: `/${locale}` },
    { name: dict.common.jobs, url: `/${locale}${ROUTES.jobs.list}` },
    { name: dict.landing.categoryJobsInIndia.replace('{{category}}', categoryName), url: `/${locale}/${slug}` },
  ]);

  const jobListSchema = jobs.length > 0 ? generateJobListSchema(jobs.slice(0, 10)) : null;

  return (
    <>
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
              <div className="flex items-center gap-2 mb-4 text-brand-100 text-sm">
                <Link href={l('/', locale)} className="hover:text-white">{dict.common.home}</Link>
                <span>/</span>
                <Link href={l(ROUTES.jobs.list, locale)} className="hover:text-white">{dict.common.jobs}</Link>
                <span>/</span>
                <span className="text-white">{dict.landing.categoryJobsInIndia.replace('{{category}}', categoryName)}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: dict.landing.categoryJobsInIndia.replace('{{category}}', categoryName) }} />
              <p className="text-xl text-brand-100 mb-6 font-medium" dangerouslySetInnerHTML={{ __html: jobCount > 0 
                  ? dict.landing.verifiedJobsAvailable.replace('{{count}}', jobCount.toString()).replace('{{category}}', categoryName.toLowerCase())
                  : dict.landing.exploreOpportunities.replace('{{category}}', categoryName.toLowerCase())
                }} />
              <div className="flex flex-wrap gap-3">
                <Link href={l(`${ROUTES.jobs.list}?q=${encodeURIComponent(categoryName)}`, locale)}>
                  <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 font-bold border-none">
                    <Briefcase className="mr-2 h-5 w-5" />
                    {dict.landing.browseAllJobs}
                  </Button>
                </Link>
                <Link href={l(ROUTES.employer.home, locale)}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                    {dict.landing.hireCategory.replace('{{category}}', categoryName)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-12">
          {jobs.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {dict.landing.latestJobsInCategory.replace('{{category}}', categoryName)}
                </h2>
                <span className="text-gray-600 font-medium">
                  {jobCount} {dict.jobsList?.showingResults ? dict.jobsList.showingResults.replace('{count}', '').replace('Showing', '').trim() : 'results'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {jobs.map((job: any) => (
                  <JobCard key={job.id} job={job} locale={locale} dict={dict} />
                ))}
              </div>
            </div>
          ) : (
            <Card padding="lg" className="text-center py-20 border-2 border-dashed border-gray-200">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {dict.landing.noJobsAvailableInCategory.replace('{{category}}', categoryName)}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {dict.landing.noJobsAvailableInCategoryDesc.replace('{{category}}', categoryName.toLowerCase())}
              </p>
              <Link href={l(ROUTES.download.home, locale)}>
                <Button size="lg">{dict.landing.registerForJobAlerts}</Button>
              </Link>
            </Card>
          )}

          {/* Browse by City */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {dict.landing.jobsInTopCities.replace('{{category}}', categoryName)}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topCities.map((city) => (
                <Link
                  key={city.id}
                  href={l(`/jobs?category=${encodeURIComponent(categoryName)}&location=${encodeURIComponent(city.name)}`, locale)}
                >
                  <Card variant="interactive" padding="md" className="border-neutral-200 hover:border-brand-500 hover:bg-brand-50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-brand-600" />
                        <span className="font-bold text-gray-900">{city.name}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-brand-400" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
