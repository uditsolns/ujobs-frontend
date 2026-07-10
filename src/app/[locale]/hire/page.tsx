import { Metadata } from 'next';
import { Suspense } from 'react';
import { Locale, getDictionary } from '@/i18n';
import CandidatesService from '@/services/candidates.service';
import CategoriesService from '@/services/categories.service';
import LocationsService from '@/services/locations.service';
import CandidateListing from '@/components/candidates/CandidateListing';
import Badge from '@/components/ui/Badge';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Users, 
  ShieldCheck, 
  MapPin,
  CheckCircle,
  Zap,
  ArrowRight,
  Smartphone,
  Download
} from 'lucide-react';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const dict = await getDictionary(locale);
  
  const category = sp.category || sp.work_type;
  const city = sp.city;
  
  let title = 'Hire Trusted Professionals - Ujobs India';
  let description = 'Ujobs India platform to hire domestic help, healthcare services, and skilled professionals. Trusted and profile-screened candidates.';

  if (category && city) {
    title = `Hire Trusted ${category} in ${city} | ${dict.common.title}`;
  } else if (category) {
    title = `Hire Top-Rated ${category} Professionals | ${dict.common.title}`;
  } else if (city) {
    title = `Hire Trusted Professionals in ${city} | ${dict.common.title}`;
  }

  return {
    title,
    description,
    keywords: 'hire staff, trusted candidates, ujobs india, hire maids, hire nurses, hire drivers',
  };
}

async function HireContent({ locale, dict, searchParams }: { locale: string, dict: any, searchParams: any }) {
  const category = searchParams.category || searchParams.work_type;
  const city = searchParams.city;
  
  // Fetch initial data on server
  const [categories, locations, candidatesResponse] = await Promise.all([
    CategoriesService.getCategories(),
    LocationsService.getLocations(),
    CandidatesService.searchCandidates({
      page: 1,
      per_page: 12,
      work_type: category,
      city: city,
      min_profile_completion: 70
    })
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 pt-28 md:pt-32">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 bg-white border-b border-neutral-100 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-grid-soft [mask-image:linear-gradient(to_bottom,white,transparent)] -z-10" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="brand" className="mb-4 bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[9px]">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              India's Most Trusted Hiring Platform
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900 tracking-tight mb-4 leading-[1.1]">
              Hire Trusted <span className="text-brand-600">Professionals</span> in Minutes.
            </h1>
            
            <p className="text-base md:text-lg text-neutral-500 font-medium leading-relaxed max-w-xl mx-auto">
              Skip the agencies. Connect directly with trusted nurses, caretakers, maids, and drivers.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-neutral-100 shadow-soft p-4 md:p-5 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { label: 'Screened Profiles', value: '50,000+', icon: <Users className="w-4 h-4 text-brand-500" /> },
              { label: 'Cities Covered', value: '50+', icon: <MapPin className="w-4 h-4 text-brand-500" /> },
              { label: 'App Rating', value: '4.5/5', icon: <CheckCircle className="w-4 h-4 text-brand-500" /> }
            ].map((stat, i) => (
              <div key={i} className="flex-1 flex items-center justify-center gap-3 py-3 md:py-0 px-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-xl font-display font-black text-neutral-900 leading-none mb-0.5">{stat.value}</div>
                  <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="py-12 md:py-16 container-custom">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-5">
           <div>
              <h2 className="text-xl lg:text-2xl font-display font-black text-neutral-900 tracking-tight uppercase tracking-wider">Browse <span className="text-brand-600">Candidates</span></h2>
              <p className="text-xs text-neutral-500 font-medium mt-1">Filter by specialization, location, and experience to find your perfect match.</p>
           </div>
           
           <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100 text-[9px] font-black text-emerald-700 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {candidatesResponse.total?.toLocaleString()} Professionals Online
           </div>
        </div>

        <CandidateListing 
          locale={locale}
          dict={dict}
          initialCandidates={candidatesResponse.data}
          initialTotal={candidatesResponse.total || 0}
          initialTotalPages={candidatesResponse.last_page}
          categories={categories as any}
          locations={locations as any}
          showHero={false}
        />
      </section>

      {/* Lead Form Section - Re-designed as "Ready to Get Started" */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-50 to-indigo-50/30 relative overflow-hidden border-t border-brand-100/40" id="contact-form">
        {/* Background decorative bubbles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             <div className="space-y-6">
                <Badge variant="brand" className="mb-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest text-[9px] flex items-center w-fit gap-1.5 shadow-sm">
                  <Zap className="w-3.5 h-3.5" />
                  Personalized Assistance
                </Badge>
                <h2 className="text-3xl md:text-5xl font-display font-black text-neutral-900 tracking-tight leading-[1.05]">
                  Ready to <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent italic">Get Started?</span>
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-xl">
                  Can't find the right match? Post your requirement and let our concierge team find suitable trusted professionals for you.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    'Instant shortlisting based on your needs',
                    'Direct interviews with screened candidates',
                    'Dedicated support throughout the process'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-neutral-800 font-bold text-sm">
                       <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 border border-emerald-100">
                          <CheckCircle className="w-3.5 h-3.5" />
                       </div>
                       {item}
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-brand-100 shadow-elevated ring-4 ring-brand-500/[0.03] relative overflow-hidden text-center flex flex-col items-center">
                {/* Friendly Phone / Download Icon */}
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 border border-brand-100">
                  <Smartphone className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-black text-neutral-900 mb-2">Get the Safe Hiring App</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-8 max-w-sm">
                  To post your staffing requirements, view trusted candidate profiles, and contact workers directly, please download our official mobile app.
                </p>

                {/* QR Code and App badges layout */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center w-full border-t border-b border-neutral-100 py-6 mb-6">
                  <div className="sm:col-span-5 flex flex-col items-center gap-1.5 p-3 bg-neutral-50 rounded-2xl border border-neutral-200/60 w-fit mx-auto">
                    <QRCodeSVG value="https://ujobsindia.com/download-redirect" size={100} />
                    <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400 mt-1">Scan to Download</span>
                  </div>

                  <div className="sm:col-span-7 flex flex-col gap-3 w-full">
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.ujobsindia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-5 py-3.5 bg-neutral-900 text-white rounded-2xl hover:bg-black transition-all active:scale-[0.98] border border-neutral-800 shadow-sm w-full"
                    >
                      <Download className="w-4 h-4 text-brand-400" />
                      <div className="text-left leading-none">
                        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Get it on</div>
                        <div className="text-sm font-black">Google Play</div>
                      </div>
                    </a>

                    <a 
                      href="https://apps.apple.com/in/app/ujobs-india/id6741137870"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-5 py-3.5 bg-neutral-900 text-white rounded-2xl hover:bg-black transition-all active:scale-[0.98] border border-neutral-800 shadow-sm w-full"
                    >
                      <Smartphone className="w-4 h-4 text-brand-400" />
                      <div className="text-left leading-none">
                        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Download on the</div>
                        <div className="text-sm font-black">App Store</div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Free & Secure Staffing
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function HirePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={
       <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
       </div>
    }>
      <HireContent locale={locale} dict={dict} searchParams={sp} />
    </Suspense>
  );
}
