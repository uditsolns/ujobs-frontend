import { Metadata } from 'next';
import Link from 'next/link';
import { ApiService } from '@/services/api.service';
import JobsService from '@/services/jobs.service';
import BannersService from '@/services/banners.service';
import CandidatesService from '@/services/candidates.service';
import LocationsService from '@/services/locations.service';
import { getDictionary, Locale } from '@/i18n';
import { loadConfig } from '@/config/runtime';
import StickyDownloadBanner from '@/components/shared/StickyDownloadBanner';

// Modern UI Components
import PremiumHero from '@/components/home/PremiumHero';
import TrustBadges from '@/components/shared/TrustBadges';
import JobCard from '@/components/jobs/JobCard';
import CandidateCard from '@/components/candidates/CandidateCard';
import TestimonialGrid, { sampleTestimonials } from '@/components/shared/TestimonialGrid';
import AppDownloadBanner from '@/components/shared/AppDownloadBanner';
import FAQAccordion, { jobSeekerFAQs } from '@/components/shared/FAQAccordion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Image from 'next/image';
import { getApiImageUrl } from '@/lib/utils/url';
import { 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Briefcase, 
  Star, 
  CheckCircle2, 
  Users, 
  Zap, 
  ChevronRight,
  Clock,
  Award,
  RefreshCw,
  Newspaper,
  ArrowUpRight
} from 'lucide-react';

import { 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateHowToApplySchema,
  generateFAQSchema,
  renderJsonLd 
} from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo/metadata';
import { ROUTES, l } from '@/lib/constants/routes';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  const seo = dictionary.seo;
  
  return generateSeoMetadata({
    title: seo?.title || 'Hire Trusted Professionals & Find Verified Jobs',
    description: seo?.description || "India's most trusted platform for specialized home and office help. Hire verified nurses, caretakers, drivers, and maids directly.",
    keywords: typeof seo?.keywords === 'string' ? seo.keywords.split(',').map((k: string) => k.trim()) : [],
    path: '/',
    locale
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const organizationSchema = generateOrganizationSchema(dict);
  const websiteSchema = generateWebSiteSchema();
  const howToSchema = generateHowToApplySchema(dict);
  const faqSchema = dict.home?.faq?.items ? generateFAQSchema(dict.home.faq.items) : null;

  let categories: any[] = [];
  let locations: any[] = [];
  let stats: any = null;
  let featuredJobs: any[] = [];
  let featuredCandidates: any[] = [];

  try {
    const results = await Promise.allSettled([
      ApiService.getCategories(),
      JobsService.getJobStats(),
      JobsService.getFeaturedJobs(16),
      CandidatesService.getFeaturedCandidates(12),
      LocationsService.getLocations()
    ]);
    
    if (results[0].status === 'fulfilled') categories = results[0].value;
    if (results[1].status === 'fulfilled') stats = results[1].value;
    if (results[2].status === 'fulfilled') featuredJobs = results[2].value;
    if (results[3].status === 'fulfilled') featuredCandidates = results[3].value;
    if (results[4].status === 'fulfilled') locations = results[4].value;
  } catch (error) {
    console.error('Home Page Data Fetch Error:', error);
  }

  if (!locations || locations.length === 0) {
    locations = [
      { id: 1, name: 'Mumbai' },
      { id: 2, name: 'Delhi' },
      { id: 3, name: 'Bangalore' },
      { id: 4, name: 'Hyderabad' },
      { id: 5, name: 'Chennai' },
      { id: 6, name: 'Kolkata' },
      { id: 8, name: 'Pune' },
      { id: 7, name: 'Ahmedabad' }
    ];
  }

  // Fallback defaults in case API categories are missing or insufficient
  const defaultCategories = [
    { id: 1, name: 'Home Nurse', work_type_name: 'Home Nurse', job_count: 142 },
    { id: 2, name: 'Patient Caretaker', work_type_name: 'Patient Caretaker', job_count: 98 },
    { id: 28, name: 'Maid', work_type_name: 'Maid', job_count: 156 },
    { id: 5, name: 'Driver', work_type_name: 'Driver', job_count: 120 },
    { id: 17, name: 'Cook', work_type_name: 'Cook', job_count: 85 },
    { id: 30, name: 'Nanny', work_type_name: 'Nanny', job_count: 64 },
    { id: 24, name: 'Housekeeping', work_type_name: 'Housekeeping', job_count: 53 },
    { id: 31, name: 'Japa Maid', work_type_name: 'Japa Maid', job_count: 42 },
    { id: 23, name: 'Security Guard', work_type_name: 'Security Guard', job_count: 37 },
    { id: 45, name: 'Medical Attendant', work_type_name: 'Medical Attendant', job_count: 29 }
  ];

  if (!categories || categories.length === 0) {
    categories = defaultCategories;
  } else if (categories.length < 10) {
    // Fill up to 10 unique categories using defaults
    const existingNames = new Set(categories.map((c: any) => (c.name || c.work_type_name || '').toLowerCase()));
    for (const defCat of defaultCategories) {
      if (categories.length >= 10) break;
      if (!existingNames.has(defCat.name.toLowerCase())) {
        categories.push(defCat);
        existingNames.add(defCat.name.toLowerCase());
      }
    }
  }

  const priorityCategories = [
    'nurse', 
    'patient caretaker', 
    'caretaker', 
    'medical attendant', 
    'maid', 
    'nanny', 
    'driver',
    'cook',
    'housekeeping',
    'japa maid',
    'security guard'
  ];
  
  const displayCategories = (Array.isArray(categories) ? categories : []).map((cat: any) => {
    const name = cat.name || cat.work_type_name || 'Category';
    const slug = name.toLowerCase().replace(/ /g, '-');
    const isPriority = priorityCategories.some(p => slug.includes(p.replace(/ /g, '-')));
    
    return {
      id: cat.id || Math.random(),
      name: name,
      slug: slug,
      image: getApiImageUrl(cat.image),
      count: cat.job_count || 0,
      isPriority: isPriority
    };
  }).sort((a, b) => {
    if (a.isPriority && !b.isPriority) return -1;
    if (!a.isPriority && b.isPriority) return 1;
    return b.count - a.count;
  });

  const heroCategories = displayCategories.filter(cat => cat.isPriority).slice(0, 10);
  const otherCategories = displayCategories.filter(cat => !cat.isPriority);

  const realStats = [
    { value: stats?.active_jobs || '5,000', label: dict.home.stats.verifiedOpenings, icon: <Briefcase className="w-5 h-5" /> },
    { value: stats?.total_candidates || '50,000', label: dict.home.stats.activeProfessionals, icon: <Users className="w-5 h-5" /> },
    { value: stats?.total_cities || '50', label: dict.home.stats.citiesCovered, icon: <MapPin className="w-5 h-5" /> },
    { value: '24/7', label: dict.home.stats.customerSupport, icon: <Clock className="w-5 h-5" /> },
  ];

  const renderMediaLogo = (id: number) => {
    switch (id) {
      case 1:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M15,15 H25 V45 H15 Z M20,10 A3,3 0 1,0 20,4 A3,3 0 1,0 20,10" className="fill-blue-600" />
            <text x="35" y="38" className="font-serif font-extrabold text-[16px] tracking-tight">Hindustan</text>
            <text x="125" y="38" className="font-sans font-light text-[15px] text-blue-600 uppercase tracking-widest">Metro</text>
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="18" width="12" height="12" rx="3" className="fill-purple-600" />
            <rect x="23" y="26" width="12" height="12" rx="3" className="fill-indigo-500" />
            <text x="45" y="38" className="font-sans font-black text-[18px] tracking-tighter">Hindustan</text>
            <text x="135" y="38" className="font-mono font-bold text-[18px] text-purple-600">&lt;Bytes&gt;</text>
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="instaGradHome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#833AB4" />
                <stop offset="50%" stopColor="#F56040" />
                <stop offset="100%" stopColor="#FCAF45" />
              </linearGradient>
            </defs>
            <circle cx="25" cy="30" r="12" className="fill-none stroke-[3] stroke-rose-500" />
            <circle cx="25" cy="30" r="5" className="fill-rose-500" />
            <circle cx="32" cy="23" r="1.5" className="fill-rose-500" />
            <text x="48" y="38" fill="url(#instaGradHome)" className="font-sans font-black text-[22px] tracking-tight">Insta</text>
            <text x="105" y="38" className="font-serif italic font-bold text-[22px] text-neutral-800 fill-current">Story</text>
          </svg>
        );
      case 4:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <polygon points="20,12 24,22 34,22 26,28 29,38 20,32 11,38 14,28 6,22 16,22" className="fill-amber-500" />
            <text x="40" y="38" className="font-serif font-black text-[15px] tracking-tight">Influencive</text>
            <text x="136" y="38" className="font-sans font-extrabold text-[13px] text-amber-600 uppercase tracking-widest">India</text>
          </svg>
        );
      case 5:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,30 Q20,10 30,30 T50,30" className="fill-none stroke-emerald-500 stroke-[4]" strokeLinecap="round" strokeLinejoin="round" />
            <text x="55" y="38" className="font-sans font-extrabold text-[18px] tracking-tight italic">The Daily</text>
            <text x="135" y="38" className="font-sans font-black text-[20px] text-emerald-600 uppercase tracking-tighter">Beat</text>
          </svg>
        );
      case 6:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="15" width="40" height="30" rx="8" className="fill-red-600" />
            <polygon points="25,23 33,30 25,37" className="fill-white" />
            <text x="58" y="38" className="font-sans font-black text-[24px] tracking-tighter">TP</text>
            <text x="85" y="38" className="font-sans font-light text-[24px] text-red-600">TV</text>
            <rect x="115" y="20" width="45" height="18" rx="4" className="fill-neutral-900" />
            <text x="120" y="32" className="font-sans font-bold text-[10px] text-white tracking-widest">NEWS</text>
          </svg>
        );
      case 7:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M15,15 H35 V20 H15 Z M20,20 V40 M30,20 V40 M15,40 H35 V45 H15 Z" className="fill-indigo-600" />
            <text x="45" y="38" className="font-serif font-black text-[22px] tracking-tight">PHH</text>
            <text x="98" y="38" className="font-serif font-normal text-[20px] text-indigo-600 uppercase tracking-widest">Times</text>
          </svg>
        );
      case 8:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M15,35 L30,15 L25,30 L40,25 L25,45 L30,30 Z" className="fill-cyan-500" />
            <text x="45" y="38" className="font-sans font-black text-[18px] tracking-tight">The Viral</text>
            <text x="122" y="38" className="font-sans font-extrabold text-[18px] text-cyan-600 uppercase">Bytes</text>
          </svg>
        );
      default:
        return null;
    }
  };

  const ujobsSteps = [
    { number: 1, title: dict.home.howItWorks.steps[0].title, description: dict.home.howItWorks.steps[0].desc, icon: <Users className="w-8 h-8 text-white" />, color: 'bg-blue-600' },
    { number: 2, title: dict.home.howItWorks.steps[1].title, description: dict.home.howItWorks.steps[1].desc, icon: <Zap className="w-8 h-8 text-white" />, color: 'bg-brand-600' },
    { number: 3, title: dict.home.howItWorks.steps[2].title, description: dict.home.howItWorks.steps[2].desc, icon: <CheckCircle2 className="w-8 h-8 text-white" />, color: 'bg-emerald-600' }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-brand-500 selection:text-white overflow-hidden">
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={howToSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      
      {/* 1. Hero Section */}
      <PremiumHero 
        locale={locale} 
        dict={dict}
        categories={categories} 
        locations={locations} 
        candidates={featuredCandidates} 
      />

      {/* 2. Stats Section */}
      <section className="py-10 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {realStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-brand-100">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-neutral-900 mb-1 leading-none">{stat.value}+</div>
                <div className="text-[10px] font-black text-neutral-600 uppercase tracking-widest" dangerouslySetInnerHTML={{ __html: stat.label }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why UJobs India - TRUST HOOK */}
      <section className="py-12 bg-neutral-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-600 text-white rounded-full text-[11px] font-black uppercase tracking-wider mb-4 shadow-brand-sm">
               <ShieldCheck className="w-3.5 h-3.5" />
               {dict.home.whyUjobs.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black mb-3 text-neutral-900 tracking-tight" dangerouslySetInnerHTML={{ __html: dict.home.whyUjobs.title }} />
            <p className="text-lg md:text-xl text-neutral-800 font-bold leading-relaxed italic mb-4" dangerouslySetInnerHTML={{ __html: dict.home.whyUjobs.italic }} />
            <p className="text-neutral-700 font-medium max-w-2xl mx-auto opacity-90 leading-relaxed" dangerouslySetInnerHTML={{ __html: dict.home.whyUjobs.description }} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {dict.home.whyUjobs.features.map((feature: any, i: number) => {
              const icons = [<ShieldCheck key="s" className="w-6 h-6" />, <Users key="u" className="w-6 h-6" />, <RefreshCw key="r" className="w-6 h-6" />];
              const bgs = ['bg-emerald-50 text-emerald-600 border-emerald-100', 'bg-blue-50 text-blue-600 border-blue-100', 'bg-amber-50 text-amber-600 border-amber-100'];
              return (
                <div key={i} className="p-6 rounded-[2rem] bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-2xl ${bgs[i]} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {icons[i]}
                  </div>
                  <h3 className="text-lg font-black text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-700 leading-relaxed text-sm font-medium opacity-90" dangerouslySetInnerHTML={{ __html: feature.desc }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Dual Target Section (Hirers vs Workers) */}
      <section className="py-12 bg-white">
        <div className="container-custom">
           <div className="grid lg:grid-cols-2 gap-8">
              {/* For Hirers */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group shadow-sm">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                 <h3 className="text-2xl lg:text-3xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl">👔</span> <span dangerouslySetInnerHTML={{ __html: dict.home.hirerSection.title }} />
                 </h3>
                 <ul className="space-y-4 mb-10">
                    {dict.home.hirerSection.items.map((item: string, i: number) => (
                       <li key={i} className="flex items-start gap-3 text-neutral-800 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                       </li>
                    ))}
                 </ul>
                 <Link href={l(ROUTES.employer.home, locale)}>
                    <Button size="lg" className="w-full sm:w-auto h-14 px-10 bg-neutral-900 text-white rounded-xl font-black hover:bg-black active:scale-95 transition-all">
                       {dict.home.hirerSection.cta} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                 </Link>
              </div>

              {/* For Workers */}
              <div className="bg-white border-2 border-brand-100 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group shadow-sm">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                 <h3 className="text-2xl lg:text-3xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl">👷</span> <span dangerouslySetInnerHTML={{ __html: dict.home.workerSection.title }} />
                 </h3>
                 <ul className="space-y-4 mb-10">
                    {dict.home.workerSection.items.map((item: string, i: number) => (
                       <li key={i} className="flex items-start gap-3 text-neutral-800 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                       </li>
                    ))}
                 </ul>
                 <Link href={l(ROUTES.auth.register, locale)}>
                    <Button size="lg" className="w-full sm:w-auto h-14 px-10 bg-brand-600 text-white rounded-xl font-black hover:bg-brand-700 shadow-brand active:scale-95 transition-all">
                       {dict.home.workerSection.cta} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-12 bg-neutral-50 border-y border-neutral-200 overflow-visible relative z-20">
         <div className="container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-black text-neutral-900 mb-10 tracking-tight">{dict.home.howItWorks.title}</h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
               {ujobsSteps.map((step, i) => (
                  <div key={i} className="relative group">
                     <div className={`w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                        {step.icon}
                     </div>
                     <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-neutral-100 text-[10px] font-black text-neutral-900 mb-2 shadow-sm">
                        0{step.number}
                     </div>
                     <h3 className="text-xl font-black text-neutral-900 mb-3">{step.title}</h3>
                     <p className="text-sm text-neutral-700 font-bold opacity-80 leading-relaxed max-w-[220px] mx-auto" dangerouslySetInnerHTML={{ __html: step.description }} />
                     {i < 2 && <div className="hidden md:block absolute top-8 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-px bg-neutral-200 dashed" />}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. Explore Specializations */}
      {displayCategories.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <Badge variant="brand" className="mb-3 bg-white border-brand-100 text-brand-700 py-1 px-4 font-bold">
                <Zap className="w-3.5 h-3.5 mr-2" /> 
                {dict.home.specializations.badge}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display font-black text-neutral-900 mb-3 tracking-tight" dangerouslySetInnerHTML={{ __html: dict.home.specializations.title }} />
              <p className="text-sm md:text-base text-neutral-600 font-bold opacity-80" dangerouslySetInnerHTML={{ __html: dict.home.specializations.description.replace('{count}', categories.length.toString()) }} />
            </div>

            {heroCategories.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-500 text-white rounded-lg flex items-center justify-center shadow-brand">
                      <Zap className="w-4 h-4 fill-current" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight" dangerouslySetInnerHTML={{ __html: dict.home.specializations.mostSearched }} />
                  </div>
                  <Link href={l(ROUTES.jobs.list, locale)} className="hidden md:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-black text-xs uppercase tracking-widest transition-all hover:gap-3">
                    {dict.home.specializations.browseAll} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {heroCategories.map((category: any) => (
                    <Link key={category.id} href={l(ROUTES.category.detail(category.name), locale)} className="group">
                      <Card padding="none" variant="interactive" className="h-full border-none bg-white hover:bg-neutral-50 rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 relative">
                        <div className="aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100/50 flex items-center justify-center p-8 group-hover:from-brand-50 group-hover:to-brand-100/30 transition-all duration-700 relative">
                          {category.image && !category.image.includes('undefined') ? (
                            <Image src={category.image} alt={category.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-contain group-hover:scale-110 transition-transform duration-700 p-4 relative z-10" quality={95} />
                          ) : (
                            <Briefcase className="w-16 h-16 text-neutral-200 group-hover:text-brand-500 transition-colors relative z-10" />
                          )}
                        </div>
                        <div className="p-4 text-center">
                          <h4 className="text-base font-black text-neutral-900 mb-1 leading-tight group-hover:text-brand-600 transition-colors uppercase tracking-tight">{category.name}</h4>
                          <div className="inline-flex items-center px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                            {category.count > 0 ? `${category.count}+ Professionals` : 'Premium Category'}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Featured Professionals */}
      {featuredCandidates.length > 0 && (
        <section className="py-16 bg-neutral-50/50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="brand" className="mb-4 bg-brand-50 border-brand-100 text-brand-700 py-1.5 px-6 font-black uppercase tracking-[0.2em] text-[10px]">
                <Award className="w-4 h-4 mr-2" /> 
                {dict.home.featuredProfessionals.badge}
              </Badge>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-neutral-900 tracking-tight mb-4 leading-[1.05]" dangerouslySetInnerHTML={{ __html: dict.home.featuredProfessionals.title }} />
              <p className="text-lg text-neutral-600 font-bold opacity-80 leading-relaxed max-w-2xl mx-auto">
                {dict.home.featuredProfessionals.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredCandidates.map((candidate: any) => (
                <CandidateCard 
                  key={candidate.id || candidate.worker_id} 
                  candidate={{
                    ...candidate,
                    id: candidate.id || candidate.worker_id
                  }} 
                  dict={dict} 
                  variant="featured" 
                  locale={locale} 
                />
              ))}
            </div>
            <div className="text-center">
               <Link href={l(ROUTES.candidates.list, locale)}>
                 <Button variant="outline" size="lg" className="rounded-2xl h-16 px-12 border-neutral-200 bg-white text-neutral-900 hover:border-brand-500 hover:text-brand-600 font-black uppercase tracking-[0.15em] text-xs transition-all shadow-sm hover:shadow-md active:scale-95">
                   {dict.home.featuredProfessionals.cta}
                 </Button>
               </Link>
            </div>
          </div>
        </section>
      )}

      {/* 8. Testimonials Section - ENHANCED MARQUEE DESIGN */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="brand" className="mb-4 bg-brand-50 border-brand-100 text-brand-700 py-1.5 px-6 font-black uppercase tracking-widest text-[10px]">
              {dict.home.testimonials.badge}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-black text-neutral-900 tracking-tight mb-6" dangerouslySetInnerHTML={{ __html: dict.home.testimonials.title }} />
            <p className="text-lg text-neutral-600 font-medium opacity-90 leading-relaxed" dangerouslySetInnerHTML={{ __html: dict.home.testimonials.description }} />
          </div>
        </div>
        
        <TestimonialGrid 
          variant="marquee" 
          speed="normal"
          testimonials={dict.home.testimonials.items.map((item: any) => ({ ...item, rating: 5 }))} 
        />
        
        <div className="container-custom mt-16 text-center">
          <div className="inline-flex items-center gap-8 py-4 px-8 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-200 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-[10px] text-white font-bold">
                    User
                  </div>
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-500 flex items-center justify-center text-[10px] text-white font-bold">
                +10K
              </div>
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-neutral-900">4.5/5 Rating</div>
              <div className="text-xs text-neutral-500 font-medium">on Google Play Store</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Media Coverage Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="brand" className="mb-4 bg-white border-brand-100 text-brand-700 py-1.5 px-6 font-black uppercase tracking-widest text-[10px]">
              <Newspaper className="w-4 h-4 mr-2" /> 
              Media Presence
            </Badge>
            <h2 className="text-3xl md:text-5xl font-display font-black text-neutral-900 tracking-tight mb-4">
              Ujobs India in <span className="text-brand-600">the News</span>
            </h2>
            <p className="text-lg text-neutral-600 font-medium opacity-90 leading-relaxed max-w-2xl mx-auto">
              Read what leading national publications have to say about our technology, growth, and commitment to safe, middleman-free hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {[
              { id: 1, pub: 'Hindustan Metro', url: 'https://www.hindustanmetro.com/ujobs-india-transforming-blue-collar-employment-in-india/', title: 'Ujobs India: Transforming Blue-Collar Employment', tag: 'Editorial Feature', date: 'Feb 2025', img: 'https://ujobsindia.com/wp-content/uploads/2025/02/s1-1-1024x789.png' },
              { id: 2, pub: 'Hindustan Bytes', url: 'https://hindustanbytes.com/ujobs-india-transforming-blue-collar-employment-in-india', title: 'Bridging the Trust Gap in Blue-Collar Staffing', tag: 'Tech News', date: 'Feb 2025', img: 'https://ujobsindia.com/wp-content/uploads/2025/02/s2-1024x789.png' },
              { id: 3, pub: 'Insta Story', url: 'https://instastory.in/ujobs-india-transforming-blue-collar-employment-in-india', title: 'Advanced Smart Matches Redefining Recruitment', tag: 'Trending', date: 'Feb 2025', img: 'https://ujobsindia.com/wp-content/uploads/2025/02/s3-1024x789.png' },
              { id: 4, pub: 'Influencive India', url: 'https://influenciveindia.in/ujobs-india-transforming-blue-collar-employment-in-india', title: 'Socio-Economic Impact of Zero Commission Model', tag: 'Socio Impact', date: 'Feb 2025', img: 'https://ujobsindia.com/wp-content/uploads/2025/02/s4-1024x789.png' },
              { id: 5, pub: 'The Daily Beat', url: 'https://thedailybeat.in/ujobs-india-transforming-blue-collar-employment-in-india', title: 'Digital Innovation: Direct Connection & No Middlemen', tag: 'Industry Analysis', date: 'Feb 2025', img: 'https://ujobsindia.com/wp-content/uploads/2025/02/s5-1024x789.png' },
              { id: 6, pub: 'TPTV', url: 'https://tptv.in/ujobs-india-transforming-blue-collar-employment-in-india', title: 'Mobile-First Platform Empowering Domestic Help', tag: 'Video Feature', date: 'Feb 2025', img: 'https://ujobsindia.com/wp-content/uploads/2025/02/s6-1024x789.png' },
              { id: 7, pub: 'PHH Times', url: 'https://phhtimes.com/ujobs-india-transforming-blue-collar-employment-in-india', title: 'Earning High Trust Ratings in Premium Caregiving', tag: 'Trust Rating', date: 'Feb 2025', img: 'https://ujobsindia.com/wp-content/uploads/2025/02/s7-1024x789.png' },
              { id: 8, pub: 'The Viral Bytes', url: 'https://theviralbytes.in/ujobs-india-transforming-blue-collar-employment-in-india', title: 'Lakhs of Families Connected directly on App', tag: 'Platform Stats', date: 'Feb 2025', img: 'https://ujobsindia.com/wp-content/uploads/2025/02/s8-1024x814.png' }
            ].map((art) => (
              <a 
                key={art.id} 
                href={art.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block bg-white border border-neutral-200 rounded-[2rem] overflow-hidden hover:border-brand-500 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative"
              >
                {/* Visual Vector Logo Preview */}
                <div className="aspect-[4/3] relative w-full flex items-center justify-center p-8 bg-neutral-50/50 border-b border-neutral-100 group-hover:bg-neutral-100/30 transition-colors duration-300">
                  {renderMediaLogo(art.id)}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                  {/* Overlay tag */}
                  <div className="absolute bottom-4 left-4 z-10">
                     <span className="text-[9px] font-black uppercase tracking-wider bg-neutral-900/85 text-white px-2.5 py-1 rounded-xl backdrop-blur-sm border border-white/10 shadow-md">
                        {art.tag}
                     </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-800 rounded-md text-[9px] font-black uppercase tracking-wider">
                        {art.pub}
                      </span>
                      <span className="text-[9px] font-bold text-neutral-400">
                        {art.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-neutral-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                  </div>
                  <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[10px] font-black text-brand-600 uppercase tracking-widest">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <Link href={l('/media-coverage', locale)}>
              <Button variant="outline" size="lg" className="rounded-2xl h-14 px-10 border-neutral-200 bg-white text-neutral-900 hover:border-brand-500 hover:text-brand-600 font-black uppercase tracking-[0.15em] text-[10px] transition-all">
                Explore All Coverage
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. App Download & FAQ - ENHANCED LAYOUT */}
      <section className="py-20 bg-neutral-50/50">
        <div className="container-custom">
          <AppDownloadBanner dict={dict} />
          
          <div className="mt-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-black text-neutral-900 mb-4 tracking-tight">{dict.home.faq.title}</h2>
              <p className="text-neutral-600 font-medium">Everything you need to know about Ujobs India. Can't find an answer? Contact our 24/7 support.</p>
            </div>
            <FAQAccordion faqs={dict.home.faq.items} />
          </div>
        </div>
      </section>

      {/* 9. Final CTA - PROPER COMPACT EXECUTIVE DESIGN */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-white">
        {/* Background Dot Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] -z-10" style={{ backgroundImage: 'radial-gradient(#1F2937 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="container-custom">
          <div className="max-w-5xl mx-auto relative">
            {/* Main Content Layer - Tightened Padding */}
            <div className="bg-white border-[1.5px] border-neutral-900 rounded-[2.5rem] p-8 md:p-12 relative shadow-[12px_12px_0px_0px_rgba(31,41,55,0.03)] group">
              
              {/* Decorative Corner Accent */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-brand-500/20 rounded-tr-xl pointer-events-none" />
              
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100 mb-6 shadow-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                   <span className="text-[9px] font-black text-neutral-900 uppercase tracking-[0.2em]">{dict.home.finalCta.badge}</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-display font-black mb-6 tracking-tight leading-[1.05] text-neutral-900 max-w-2xl" dangerouslySetInnerHTML={{ __html: dict.home.finalCta.title }} />
                
                <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 mb-8 text-neutral-800">
                  <p className="text-base md:text-lg font-bold tracking-tight" dangerouslySetInnerHTML={{ __html: dict.home.finalCta.joinCount }} />
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-200" />
                  <p className="text-base md:text-lg font-bold tracking-tight" dangerouslySetInnerHTML={{ __html: dict.home.finalCta.hireIn }} />
                </div>

                <p className="text-neutral-500 font-medium text-xs md:text-sm max-w-lg leading-relaxed mb-10 opacity-80" dangerouslySetInnerHTML={{ __html: dict.home.finalCta.middlemen }} />

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
                  <Link href={l(ROUTES.employer.home, locale)} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-12 px-8 bg-neutral-900 text-white hover:bg-black rounded-xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      {dict.home.finalCta.hireStaff} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={l(ROUTES.auth.register, locale)} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-12 px-8 border-2 border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-50 rounded-xl font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      {dict.home.finalCta.findJobs}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Line - Tightened */}
              <div className="mt-10 pt-8 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { label: dict.footer.backgroundVerified, icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> },
                   { label: dict.footer.appBenefits.directChat, icon: <Users className="w-3.5 h-3.5 text-blue-600" /> },
                   { label: dict.footer.appBenefits.safeHiring, icon: <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" /> }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-center gap-2">
                      <div className="p-1 bg-neutral-50 rounded-lg border border-neutral-100">
                        {item.icon}
                      </div>
                      <span className="text-[9px] font-black text-neutral-900 uppercase tracking-widest">{item.label}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Floating Security Badge - Scaled down */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-5 py-1.5 rounded-lg shadow-xl flex items-center gap-2 border border-white/10">
               <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
               <span className="text-[8px] font-black uppercase tracking-[0.15em] whitespace-nowrap">{dict.home.finalCta.securityBadge}</span>
            </div>
          </div>
        </div>
      </section>
      
      <StickyDownloadBanner />
    </div>
  );
}
