import { Suspense } from 'react';
import { Metadata } from 'next';
import { getDictionary, Locale } from '@/i18n';
import CandidatesService from '@/services/candidates.service';
import CategoriesService from '@/services/categories.service';
import LocationsService from '@/services/locations.service';
import CandidateListing from '@/components/candidates/CandidateListing';
import { Sparkles } from 'lucide-react';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const dict = await getDictionary(locale as Locale);
  
  const category = sp.category || sp.work_type;
  const city = sp.city;
  
  let title = dict.seo.title; // Fallback
  let description = dict.seo.description;

  if (category && city) {
    title = `Hire Trusted ${category} in ${city} | ${dict.common.title}`;
    description = `Find and hire trusted ${category} in ${city}. Browse profiles, check experience, and connect directly. Trusted profiles.`;
  } else if (category) {
    title = `Hire Trusted ${category} Professionals | ${dict.common.title}`;
    description = `Connect with top-rated ${category} across India. Direct hiring, zero commission, and trusted profiles.`;
  } else if (city) {
    title = `Trusted Professionals in ${city} | Hire Staff | ${dict.common.title}`;
    description = `Hire trusted domestic help, healthcare staff, and skilled workers in ${city}. Fast hiring, trusted profiles, 24/7 support.`;
  } else {
    title = `Hire Trusted Professionals | Candidates Pool | ${dict.common.title}`;
    description = `Browse India's pool of trusted professionals. Hire nurses, caretakers, maids, and drivers directly without any agency fees.`;
  }

  return {
    title,
    description,
    keywords: `${category ? category + ', ' : ''}${city ? city + ', ' : ''}hire staff, trusted candidates, ujobs india`,
  };
}

async function CandidatesContent({ locale, dict, searchParams }: { locale: string, dict: any, searchParams: any }) {
  const category = searchParams.category || searchParams.work_type;
  const city = searchParams.city;
  const gender = searchParams.gender;
  const experience = searchParams.experience;

  // Fetch initial data on server
  const [categories, locations, candidatesResponse] = await Promise.all([
    CategoriesService.getCategories(),
    LocationsService.getLocations(),
    CandidatesService.searchCandidates({
      page: 1,
      per_page: 12,
      work_type: category,
      city: city,
      gender: gender as any,
      experience: experience,
      min_profile_completion: 70
    })
  ]);

  return (
    <div className="min-h-screen bg-neutral-50 pb-12 pt-28 md:pt-32">
      {/* Header Section */}
      <section className="bg-white border-b border-neutral-100 py-10 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft [mask-image:linear-gradient(to_bottom,white,transparent)] -z-10" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-3 py-1 bg-brand-50 text-brand-700 rounded-full font-bold text-[9px] uppercase tracking-widest mb-4 border border-brand-100">
                <Sparkles className="w-3 h-3 mr-1" />
                {dict.candidatesList.badge}
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900 tracking-tight mb-2.5 leading-[1.1]" 
                  dangerouslySetInnerHTML={{ __html: dict.candidatesList.title }} />
              <p className="text-base text-neutral-500 font-medium leading-relaxed">
                {dict.candidatesList.description.replace('{count}', categories.length.toString())}
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-soft border border-neutral-100">
               <div className="text-center border-r border-neutral-100 pr-4">
                  <div className="text-2xl font-display font-black text-neutral-900 leading-none">{(candidatesResponse.total || 0).toLocaleString()}</div>
                  <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-1">{dict.candidatesList.activeCandidates}</div>
               </div>
               <div className="text-center">
                  <div className="text-2xl font-display font-black text-brand-600 leading-none">100%</div>
                  <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-1">{dict.candidatesList.verifiedProfiles}</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-8 md:py-10">
        <CandidateListing 
          locale={locale}
          dict={dict}
          initialCandidates={candidatesResponse.data}
          initialTotal={candidatesResponse.total || 0}
          initialTotalPages={candidatesResponse.last_page}
          categories={categories as any}
          locations={locations as any}
        />
      </section>
    </div>
  );
}

export default async function CandidatesPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const dict = await getDictionary(locale as Locale);

  return (
    <Suspense fallback={
       <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
       </div>
    }>
      <CandidatesContent locale={locale} dict={dict} searchParams={sp} />
    </Suspense>
  );
}
