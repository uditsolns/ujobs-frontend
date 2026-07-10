'use client';

/**
 * Premium Hero Component - Conversion Focused
 * India-first hiring platform for verified home & office staff
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Clock,
  Star,
  CheckCircle2,
  Smartphone,
  Briefcase,
  Zap,
  Mail,
  Download
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ROUTES } from '@/lib/constants/routes';
import { getApiImageUrl } from '@/lib/utils/url';
import { matchCategory } from '@/lib/utils/fuzzySearch';

interface PremiumHeroProps {
  locale: string;
  dict: any;
  categories: any[];
  locations: any[];
  candidates?: any[];
}

export default function PremiumHero({ locale, dict, categories, locations, candidates = [] }: PremiumHeroProps) {
  const router = useRouter();
  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (jobQuery) params.set('q', jobQuery);
    if (locationQuery) params.set('location', locationQuery);
    const searchUrl = `/${locale}${ROUTES.jobs.list}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(searchUrl);
  };

  const selectJobSuggestion = (name: string) => {
    setJobQuery(name);
    setShowJobSuggestions(false);
    const params = new URLSearchParams();
    params.set('q', name);
    if (locationQuery) params.set('location', locationQuery);
    router.push(`/${locale}${ROUTES.jobs.list}?${params.toString()}`);
  };

  // Priority categories for hero spotlight
  const topPriorityNames = ['nurse', 'patient caretaker', 'maid', 'japa', 'medical attendant'];
  const priorityCategories = [...topPriorityNames, 'nanny', 'driver', 'cook', 'housekeeper'];
  
  // Use actual categories from database - prioritize key categories
  const displayCategories = categories.map((cat: any) => {
    const name = cat.name || cat.work_type_name;
    const slug = name.toLowerCase();
    const isTopPriority = topPriorityNames.some(p => slug.includes(p));
    const isPriority = priorityCategories.some(p => slug.includes(p));
    
    return {
      id: cat.id,
      name: name,
      image: getApiImageUrl(cat.image),
      count: cat.job_count || 0,
      slug: slug,
      isTopPriority,
      isPriority
    };
  }).sort((a, b) => {
    if (a.isTopPriority && !b.isTopPriority) return -1;
    if (!a.isTopPriority && b.isTopPriority) return 1;
    if (a.isPriority && !b.isPriority) return -1;
    if (!a.isPriority && b.isPriority) return 1;
    return b.count - a.count;
  });

  const heroCategories = displayCategories.filter(cat => cat.isPriority).slice(0, 5);
  const otherCategories = displayCategories.filter(cat => !cat.isPriority).slice(0, 10);

  const filteredLocations = locationQuery
    ? locations.filter(loc => loc.name.toLowerCase().includes(locationQuery.toLowerCase()))
    : locations;

  // Fuzzy match for job suggestions
  const jobSuggestions = jobQuery.trim() ? matchCategory(categories, jobQuery).slice(0, 8) : [];

  return (
    <section className="relative bg-white overflow-visible z-[60]">
      {/* Isolated Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      </div>
      
      {/* FIXED NAVBAR SPACE */}
      <div className="relative z-30 container-custom pt-32 pb-6 lg:pt-40 lg:pb-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE - Main Content (HIGH CONTRAST) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-100 rounded-full shadow-sm">
              <div className="flex -space-x-0.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-black text-neutral-900 uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: dict.hero.trustIndicator }} />
            </div>

            {/* Premium Headline */}
            <div className="space-y-4">
              <h1 className="text-display font-display text-neutral-900 leading-[1.05]">
                <span dangerouslySetInnerHTML={{ __html: dict.hero.h1_line1 }} /><br className="hidden sm:block" />{' '}
                <span className="bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent block mt-1" dangerouslySetInnerHTML={{ __html: dict.hero.h1_line2 }} />
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-800 font-bold leading-relaxed max-w-xl" dangerouslySetInnerHTML={{ __html: dict.hero.description }} />
            </div>
          </div>

          {/* RIGHT SIDE - Maximum Contrast Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-neutral-900 rounded-[3rem] p-8 lg:p-10 space-y-10 shadow-elevated relative overflow-hidden">
               {/* Mobile App Section - REFINED LAYOUT */}
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center text-white">
                        <Smartphone className="w-4 h-4" />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-neutral-900">{dict.hero.mobile_app_badge}</span>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-6 leading-tight tracking-tight text-neutral-900" dangerouslySetInnerHTML={{ __html: dict.hero.mobile_app_title }} />
                  
                  <div className="flex flex-row items-center gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                      <a 
                        href={ROUTES.download.android} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white hover:bg-black px-3 py-2 rounded-xl transition-all shadow-xl active:scale-95 group/btn"
                      >
                         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                         </svg>
                         <div className="text-left leading-none">
                           <div className="text-[6px] font-black uppercase opacity-60 mb-0.5">{dict.hero.google_play_sub}</div>
                           <div className="text-[10px] font-black uppercase tracking-tight">{dict.hero.google_play_main}</div>
                         </div>
                      </a>
                      <a 
                        href={ROUTES.download.ios} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 px-3 py-2 rounded-xl transition-all shadow-sm active:scale-95 group/btn"
                      >
                         <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                         </svg>
                         <div className="text-left leading-none">
                           <div className="text-[6px] font-black uppercase opacity-60 mb-0.5">{dict.hero.app_store_sub}</div>
                           <div className="text-[10px] font-black uppercase tracking-tight">{dict.hero.app_store_main}</div>
                         </div>
                      </a>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="bg-neutral-50 p-1 rounded-xl border border-neutral-100 shadow-inner flex flex-col items-center gap-0.5">
                        <QRCodeSVG value={ROUTES.download.android} size={48} />
                        <span className="text-[5px] font-black uppercase tracking-tighter text-neutral-400">Android</span>
                      </div>
                      <div className="bg-neutral-50 p-1 rounded-xl border border-neutral-100 shadow-inner flex flex-col items-center gap-0.5">
                        <QRCodeSVG value={ROUTES.download.ios} size={48} />
                        <span className="text-[5px] font-black uppercase tracking-tighter text-neutral-400">iOS</span>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* INTEGRATED TRUST BADGES */}
        <div className="mt-12 pt-8 border-t border-neutral-100">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-10">
            {[
              { label: dict.common.verifiedProfiles, desc: dict.common.oneHundredPercentVerified, icon: <ShieldCheck className="w-5 h-5" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: dict.common.millionUsers, desc: dict.common.trustedPlatform, icon: <Users className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: dict.common.bestRated, desc: dict.common.rating48, icon: <Star className="w-5 h-5" />, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: dict.common.secure, desc: dict.common.dataProtected, icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-brand-600', bg: 'bg-brand-50' }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white shadow-soft border border-neutral-100 hover:border-brand-200 transition-all duration-300">
                <div className={`w-9 h-9 ${badge.bg} ${badge.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {badge.icon}
                </div>
                <div>
                  <div className="text-[11px] font-black text-neutral-900 uppercase tracking-tight leading-none mb-1" dangerouslySetInnerHTML={{ __html: badge.label }} />
                  <div className="text-[10px] font-black text-neutral-700 uppercase tracking-widest leading-none" dangerouslySetInnerHTML={{ __html: badge.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Priority Categories Showcase moved above Search */}
        {heroCategories.length > 0 && (
          <div className="mt-12 pt-10 border-t border-neutral-100 relative z-20">
            <h3 className="text-[11px] font-black text-neutral-900 uppercase tracking-[0.2em] mb-8 text-center flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-neutral-200" />
              Explore Top Professional Categories
              <div className="h-px w-12 bg-neutral-200" />
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
              {heroCategories.map((cat: any, idx: number) => (
                <button
                  key={`hero-cat-${cat.id}-${idx}`}
                  onClick={() => router.push(`/${locale}/jobs?q=${cat.name}`)}
                  className={`group relative flex flex-col items-center bg-white rounded-[2.5rem] border border-neutral-200 transition-all duration-500 shadow-soft hover:shadow-elevated hover:-translate-y-2 p-5 lg:p-6 ${
                    cat.isTopPriority ? 'ring-2 ring-brand-500/10' : ''
                  }`}
                >
                  {cat.isTopPriority && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-brand-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      Top Choice
                    </div>
                  )}

                  <div className="w-full aspect-square mb-5 rounded-[2rem] bg-neutral-50 flex items-center justify-center overflow-hidden relative group-hover:bg-brand-50 transition-colors duration-500">
                    {cat.image && !cat.image.includes('undefined') ? (
                      <Image 
                        src={cat.image} 
                        alt={cat.name} 
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 relative z-10" 
                        quality={95}
                      />
                    ) : (
                      <Briefcase className="w-10 h-10 text-neutral-200 group-hover:text-brand-500 transition-colors relative z-10" />
                    )}
                  </div>

                  <div className="text-center relative z-10">
                    <h4 className="text-sm font-black text-neutral-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors uppercase tracking-tight">
                      {cat.name}
                    </h4>
                    <span className="text-[11px] font-black uppercase tracking-wide px-4 py-1 rounded-full bg-brand-600 text-white shadow-brand-sm">
                      {cat.count > 0 ? `${cat.count}+ Available` : 'Verified'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: Full Width Search Section */}
        <div className="mt-12 lg:mt-16 relative z-20">
          <div className="bg-white rounded-[2rem] lg:rounded-full shadow-elevated border-2 border-neutral-900 p-2 lg:p-2.5 max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
              <div className="flex-1 relative group">
                <MapPin className="absolute left-7 top-1/2 transform -translate-y-1/2 text-brand-600 w-5 h-5 group-focus-within:scale-110 transition-transform" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onFocus={() => setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  placeholder={dict.hero.placeholder_city}
                  className="w-full pl-16 pr-6 py-5 lg:py-6 bg-transparent rounded-full text-neutral-900 placeholder-neutral-500 focus:outline-none font-bold text-lg"
                />
                {showLocationSuggestions && filteredLocations.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-neutral-200 p-3 z-[80] max-h-80 overflow-y-auto">
                    {filteredLocations.map((city: any, idx: number) => (
                      <button
                        key={`hero-loc-${city.id}-${idx}`}
                        type="button"
                        onClick={() => {
                          setLocationQuery(city.name);
                          setShowLocationSuggestions(false);
                        }}
                        className="w-full text-left px-6 py-4 hover:bg-brand-50 rounded-2xl text-base font-bold text-neutral-800 transition-colors flex items-center gap-3"
                      >
                        <MapPin className="w-4 h-4 text-neutral-400" />
                        {city.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden lg:block w-px h-10 bg-neutral-200" />

              <div className="flex-[1.5] relative group">
                <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-brand-600 w-5 h-5 group-focus-within:scale-110 transition-transform" />
                <input
                  type="text"
                  value={jobQuery}
                  onChange={(e) => {
                    setJobQuery(e.target.value);
                    setShowJobSuggestions(true);
                  }}
                  onFocus={() => setShowJobSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowJobSuggestions(false), 200)}
                  placeholder={dict.hero.placeholder_search}
                  className="w-full pl-16 pr-6 py-5 lg:py-6 bg-transparent rounded-full text-neutral-900 placeholder-neutral-500 focus:outline-none font-bold text-lg"
                />
                
                {/* Job Suggestions Dropdown */}
                {showJobSuggestions && jobSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-neutral-200 p-3 z-[80] max-h-80 overflow-y-auto overflow-x-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-2">
                      {jobSuggestions.map((suggestion: any, idx) => (
                        <button
                          key={`${suggestion.id}-${idx}`}
                          type="button"
                          onClick={() => selectJobSuggestion(suggestion.name)}
                          className="w-full flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 text-left transition-colors group rounded-2xl"
                        >
                          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all flex-shrink-0 flex items-center justify-center">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-neutral-900 group-hover:text-brand-600 transition-colors truncate text-base">
                              {suggestion.name}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                size="md"
                className="lg:w-auto px-8 py-3.5 lg:py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl lg:rounded-full font-black text-sm uppercase tracking-widest shadow-brand hover:shadow-elevated transition-all flex items-center justify-center gap-2"
              >
                {dict.hero.find_now} <ArrowRight className="w-4.5 h-4.5" />
              </Button>
            </form>
          </div>

          {/* Enhanced Popular Tags Section */}
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
              <h3 className="text-[10px] font-black text-neutral-900 uppercase tracking-[0.3em] flex items-center gap-2">
                 {dict.hero.services_label}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {otherCategories.slice(0, 10).map((cat: any, idx: number) => (
                  <button
                    key={`hero-other-${cat.id}-${idx}`}
                    onClick={() => router.push(`/${locale}/jobs?q=${cat.name}`)}
                    className="px-4 py-2 rounded-full bg-white border border-neutral-300 hover:border-brand-600 hover:shadow-subtle text-xs font-bold text-neutral-800 transition-all hover:text-brand-600"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
              <h3 className="text-[10px] font-black text-neutral-900 uppercase tracking-[0.3em] flex items-center gap-2">
                 {dict.hero.cities_label}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { name: 'Mumbai', slug: 'mumbai' },
                  { name: 'Delhi NCR', slug: 'delhi' },
                  { name: 'Bangalore', slug: 'bangalore' },
                  { name: 'Hyderabad', slug: 'hyderabad' },
                  { name: 'Pune', slug: 'pune' },
                  { name: 'Chennai', slug: 'chennai' },
                  { name: 'Kolkata', slug: 'kolkata' },
                  { name: 'Ahmedabad', slug: 'ahmedabad' },
                  { name: 'Surat', slug: 'surat' },
                  { name: 'Jaipur', slug: 'jaipur' },
                  { name: 'Lucknow', slug: 'lucknow' }
                ].map((city) => (
                  <button
                    key={city.slug}
                    onClick={() => router.push(`/${locale}/jobs?location=${city.name}`)}
                    className="px-4 py-2 rounded-full bg-blue-100 border border-blue-200 hover:border-blue-500 text-xs font-black text-blue-900 transition-all hover:shadow-subtle flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Quick Categories */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-neutral-300 p-3 z-40 shadow-lg">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {heroCategories.map((cat: any, idx: number) => (
            <button
              key={`hero-mobile-cat-${cat.id}-${idx}`}
              onClick={() => router.push(`/${locale}/jobs?q=${cat.name}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap bg-blue-100 hover:bg-blue-200 text-blue-900 hover:text-blue-950 font-bold text-sm flex-shrink-0 border border-blue-200 transition-colors"
            >
              {cat.image && !cat.image.includes('undefined') ? (
                <div className="w-4 h-4 relative flex-shrink-0">
                  <Image src={cat.image} alt={cat.name} fill sizes="16px" className="object-contain" quality={90} />
                </div>
              ) : (
                <Briefcase className="w-4 h-4" />
              )}
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
