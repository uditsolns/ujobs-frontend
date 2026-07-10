import Link from 'next/link';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import JobsService from '@/services/jobs.service';
import LocationsService from '@/services/locations.service';
import { ROUTES, l } from '@/lib/constants/routes';
import { generateBreadcrumbSchema, generateJobListSchema, renderJsonLd } from '@/lib/seo/schema';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import JobCard from '@/components/jobs/JobCard';

export default async function CityPageContent({ cityData, slug, locale, dict }: any) {
  const cityName = cityData.name;
  const stateName = cityData.state;
  
  let jobs: any[] = [];
  try {
    const locations = await LocationsService.getLocations();
    const location = locations.find((loc: any) =>
      loc.name?.toLowerCase() === cityName.toLowerCase() ||
      loc.city?.toLowerCase() === cityName.toLowerCase()
    );

    if (location) {
      const jobsData = await JobsService.getJobsByCity(location.id) as any;
      jobs = Array.isArray(jobsData) ? jobsData : (jobsData.data || []);
    }
  } catch (error) {
    console.error('Failed to fetch city jobs:', error);
  }
  
  const jobCount = jobs.length;

  // Generate schema markup
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.common.home, url: `/${locale}` },
    { name: dict.common.jobs, url: `/${locale}${ROUTES.jobs.list}` },
    { name: dict.landing.latestJobsInCity.replace('{{city}}', cityName), url: `/${locale}/${slug}` },
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
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Link href={l('/', locale)} className="text-brand-100 hover:text-white">{dict.common.home}</Link>
                <span className="text-brand-200">/</span>
                <Link href={l(ROUTES.jobs.list, locale)} className="text-brand-100 hover:text-white">{dict.common.jobs}</Link>
                <span className="text-brand-200">/</span>
                <span className="text-white">{dict.landing.latestJobsInCity.replace('{{city}}', cityName)}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: dict.landing.jobsInCityWithState.replace('{{city}}', cityName).replace('{{state}}', stateName) }} />
              <p className="text-xl text-brand-100 mb-6" dangerouslySetInnerHTML={{ __html: jobCount > 0
                  ? dict.landing.verifiedJobsAvailableInCity.replace('{{count}}', jobCount.toString()).replace('{{city}}', cityName)
                  : dict.landing.exploreOpportunitiesInCity.replace('{{city}}', cityName)
                }} />
              <div className="flex flex-wrap gap-3">
                <Link href={l(`${ROUTES.jobs.list}?location=${encodeURIComponent(cityName)}`, locale)}>
                  <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 font-bold border-none">
                    <Briefcase className="mr-2 h-5 w-5" />
                    {dict.landing.browseAllJobs}
                  </Button>
                </Link>
                <Link href={l(ROUTES.download.home, locale)}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                    {dict.landing.downloadApp}
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
                  {dict.landing.latestJobsInCity.replace('{{city}}', cityName)}
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
            <Card padding="lg" className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {dict.landing.noJobsAvailableInCity.replace('{{city}}', cityName)}
              </h3>
              <p className="text-gray-600 mb-6">
                {dict.landing.noJobsAvailableInCityDesc}
              </p>
              <Link href={l(ROUTES.jobs.list, locale)}>
                <Button>{dict.landing.browseAllJobs}</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
