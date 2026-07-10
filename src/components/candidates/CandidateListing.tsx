'use client';

/**
 * CandidateListing Component
 * Reusable listing for candidates with advanced filtering and Infinite Scroll
 * Used in /candidates and /hire pages
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Candidate, CandidateSearchParams, WorkType } from '@/types/candidate';
import type { Location } from '@/types';
import CandidatesService from '@/services/candidates.service';
import CandidateCard from '@/components/candidates/CandidateCard';
import EmptyState from '@/components/shared/EmptyState';
import Input from '@/components/ui/Input';
import { matchLocation, matchCategory } from '@/lib/utils/fuzzySearch';
import { 
  Search, 
  Users, 
  X, 
  MapPin, 
  Briefcase,
  SlidersHorizontal,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Loader2
} from 'lucide-react';

interface CandidateListingProps {
  locale: string;
  dict: any;
  initialCandidates: Candidate[];
  initialTotal: number;
  initialTotalPages: number;
  categories: WorkType[];
  locations: Location[];
  title?: string;
  description?: string;
  showHero?: boolean;
}

export default function CandidateListing({
  locale,
  dict,
  initialCandidates,
  initialTotal,
  initialTotalPages,
  categories,
  locations,
  title,
  description,
  showHero = true
}: CandidateListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCandidates, setTotalCandidates] = useState(initialTotal);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter state
  const [filters, setFilters] = useState<CandidateSearchParams>({
    city: searchParams.get('city') || undefined,
    work_type: searchParams.get('category') || searchParams.get('work_type') || undefined,
    gender: (searchParams.get('gender') as any) || undefined,
    experience: searchParams.get('experience') || undefined,
    min_profile_completion: 70,
  });

  const [cityInput, setCityInput] = useState(filters.city || '');
  const [categoryInput, setCategoryInput] = useState(filters.work_type || '');

  // Use centralized fuzzy matching
  const filteredCities = cityInput 
    ? matchLocation(locations, cityInput)
    : [];

  const filteredCategories = categoryInput
    ? matchCategory(categories as any, categoryInput).slice(0, 8)
    : [];

  // Synchronize local state with URL params
  useEffect(() => {
    const city = searchParams.get('city') || undefined;
    const category = searchParams.get('category') || searchParams.get('work_type') || undefined;
    const gender = (searchParams.get('gender') as any) || undefined;
    const experience = searchParams.get('experience') || undefined;
    
    setFilters({
      city,
      work_type: category,
      gender,
      experience,
      min_profile_completion: 70
    });
    
    setCityInput(city || '');
    setCategoryInput(category || '');
  }, [searchParams]);

  // Handle filter changes (Reset list and start from page 1)
  const handleFilterChange = (key: keyof CandidateSearchParams, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value || undefined,
    };
    
    setFilters(newFilters);
    setCandidates([]);
    setCurrentPage(1);
    
    // Update URL params for SEO/Shareability
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key === 'work_type' ? 'category' : key, value);
    } else {
      params.delete(key === 'work_type' ? 'category' : key);
    }
    router.push(`?${params.toString()}`, { scroll: false });

    // Immediate fetch for new filters
    fetchCandidates(1, true, newFilters);
  };

  // Infinite Scroll Observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && currentPage < totalPages && !loading && !loadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCandidates(nextPage, false, filters);
    }
  }, [currentPage, totalPages, loading, loadingMore, filters]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { 
      threshold: 0.1,
      rootMargin: '200px' // Load before reaching the very bottom
    });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const fetchCandidates = async (page: number, isNewSearch: boolean, currentFilters: CandidateSearchParams) => {
    if (isNewSearch) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await CandidatesService.searchCandidates({
        page: page,
        per_page: 12,
        ...currentFilters,
      });
      
      if (isNewSearch) {
        setCandidates(response.data);
      } else {
        setCandidates(prev => [...prev, ...response.data]);
      }
      
      setTotalPages(response.last_page);
      setTotalCandidates(response.total || response.data.length);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
      if (isNewSearch) setCandidates([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleCitySearch = () => {
    setShowCitySuggestions(false);
    handleFilterChange('city', cityInput);
  };

  const handleCategorySearch = () => {
    setShowCategorySuggestions(false);
    handleFilterChange('work_type', categoryInput);
  };

  const clearFilters = () => {
    const defaultFilters = { min_profile_completion: 70 };
    setFilters(defaultFilters);
    setCityInput('');
    setCategoryInput('');
    setCandidates([]);
    setCurrentPage(1);
    router.push(window.location.pathname, { scroll: false });
    fetchCandidates(1, true, defaultFilters);
  };

  const hasActiveFilters = filters.city || filters.work_type || filters.gender || filters.experience;

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Filters Sidebar - Static Position */}
        <aside className="lg:col-span-3">
          <div className="sticky top-28 bg-white border border-neutral-100 shadow-soft rounded-[32px] overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin">
            {/* Filter Header */}
            <div className="px-6 py-5 bg-neutral-50/50 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
                  <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                </div>
                <h3 className="text-sm font-display font-black text-neutral-900 uppercase tracking-tight">
                  {dict.candidatesList.searchFilters}
                </h3>
              </div>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-[10px] font-black text-neutral-400 hover:text-brand-600 transition-colors uppercase tracking-[0.1em] border-b border-dashed border-neutral-200 hover:border-brand-600 pb-0.5"
                >
                  {dict.candidatesList.resetFilters || 'Reset'}
                </button>
              )}
            </div>

            <div className="p-6 space-y-10">
              {/* Category Filter - UPDATED to Input with Suggestions */}
              <div className="space-y-3 relative group">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{dict.candidatesList.workCategory}</label>
                  <Briefcase className="w-3 h-3 text-neutral-300 group-focus-within:text-brand-500 transition-colors" />
                </div>
                <div className="relative">
                  <Input
                    placeholder={dict.candidatesList.allSpecializations}
                    value={categoryInput}
                    onChange={(e) => {
                      setCategoryInput(e.target.value);
                      setShowCategorySuggestions(true);
                    }}
                    onFocus={() => setShowCategorySuggestions(true)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCategorySearch()}
                    className="pr-12 bg-neutral-50 border-neutral-100 focus:bg-white focus:ring-4 focus:ring-brand-500/5 rounded-2xl h-12 text-sm font-bold transition-all shadow-inner"
                  />
                  <button 
                    onClick={handleCategorySearch}
                    className="absolute right-1.5 top-1.5 w-9 h-9 bg-brand-500 text-white rounded-xl flex items-center justify-center hover:bg-brand-600 transition-all shadow-brand active:scale-95"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {showCategorySuggestions && filteredCategories.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-elevated z-[80] max-h-60 overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-2">
                    {filteredCategories.map((cat, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="w-full text-left px-4 py-2.5 hover:bg-brand-50 rounded-xl font-bold text-neutral-700 text-xs transition-colors flex items-center group/item"
                        onClick={() => {
                          setCategoryInput(cat.name);
                          handleFilterChange('work_type', cat.name);
                          setShowCategorySuggestions(false);
                        }}
                      >
                        <Briefcase className="w-3.5 h-3.5 mr-2.5 text-neutral-300 group-hover/item:text-brand-500" />
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
                {showCategorySuggestions && (
                  <div 
                    className="fixed inset-0 z-[-1]" 
                    onClick={() => setShowCategorySuggestions(false)}
                  />
                )}
              </div>

              {/* Location Filter */}
              <div className="space-y-3 relative group">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{dict.common.location}</label>
                  <MapPin className="w-3 h-3 text-neutral-300 group-focus-within:text-brand-500 transition-colors" />
                </div>
                <div className="relative">
                  <Input
                    placeholder={dict.candidatesList.locationPlaceholder}
                    value={cityInput}
                    onChange={(e) => {
                      setCityInput(e.target.value);
                      setShowCitySuggestions(true);
                    }}
                    onFocus={() => setShowCitySuggestions(true)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
                    className="pr-12 bg-neutral-50 border-neutral-100 focus:bg-white focus:ring-4 focus:ring-brand-500/5 rounded-2xl h-12 text-sm font-bold transition-all shadow-inner"
                  />
                  <button 
                    onClick={handleCitySearch}
                    className="absolute right-1.5 top-1.5 w-9 h-9 bg-brand-500 text-white rounded-xl flex items-center justify-center hover:bg-brand-600 transition-all shadow-brand active:scale-95"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {showCitySuggestions && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-elevated z-[80] max-h-60 overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-2">
                    {(filteredCities as any[]).map((city, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="w-full text-left px-4 py-2.5 hover:bg-brand-50 rounded-xl font-bold text-neutral-700 text-xs transition-colors flex items-center group/item"
                        onClick={() => {
                          const cityName = city.name || city.location_name || city;
                          setCityInput(cityName);
                          handleFilterChange('city', cityName);
                          setShowCitySuggestions(false);
                        }}
                      >
                        <MapPin className="w-3.5 h-3.5 mr-2.5 text-neutral-300 group-hover/item:text-brand-500" />
                        {city.name || city.location_name || city}
                      </button>
                    ))}
                  </div>
                )}
                {showCitySuggestions && (
                  <div 
                    className="fixed inset-0 z-[-1]" 
                    onClick={() => setShowCitySuggestions(false)}
                  />
                )}
              </div>

              {/* Gender Toggle */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">{dict.candidatesList.genderPref}</label>
                <div className="grid grid-cols-3 gap-1.5 bg-neutral-100/30 p-1.5 rounded-2xl border border-neutral-100 shadow-inner">
                  {['all', 'male', 'female'].map((g) => (
                    <button
                      key={g}
                      onClick={() => handleFilterChange('gender', g === 'all' ? undefined : g)}
                      className={`py-2 rounded-xl text-[10px] font-black transition-all capitalize tracking-wider ${
                        (g === 'all' && !filters.gender) || filters.gender === g
                          ? 'bg-white text-brand-600 shadow-soft border border-neutral-100 scale-105'
                          : 'text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      {dict.candidatesList.genderOptions[g]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">{dict.candidatesList.experienceLevel}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: dict.candidatesList.allLevels, value: undefined },
                    { label: dict.candidatesList.expOptions[0], value: '0-1' },
                    { label: dict.candidatesList.expOptions[1], value: '2-5' },
                    { label: dict.candidatesList.expOptions[2], value: '5+' },
                  ].map((exp) => (
                    <button
                      key={exp.label}
                      onClick={() => handleFilterChange('experience', exp.value)}
                      className={`text-center px-3 py-2.5 rounded-xl text-[10px] font-black transition-all border ${
                        filters.experience === exp.value
                          ? 'bg-brand-50 border-brand-200 text-brand-700 shadow-subtle'
                          : 'bg-white border-neutral-100 text-neutral-500 hover:bg-neutral-50 hover:border-neutral-200'
                      }`}
                    >
                      {exp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verification Info */}
              <div className="pt-4 border-t border-neutral-50">
                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50 relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-900 text-[10px] font-black uppercase tracking-widest">{dict.candidatesList.verifiedOnly}</span>
                      </div>
                      <p className="text-emerald-700/70 text-[9px] font-bold leading-relaxed">
                        Manually screened profiles for guaranteed identity and trust.
                      </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Candidates List - Infinite Scroll */}
        <div className="lg:col-span-9 space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:p-5 rounded-2xl border border-neutral-100 shadow-soft">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100 shadow-subtle">
                  <Users className="w-6 h-6" />
               </div>
               <div>
                  <h2 className="text-lg md:text-xl font-display font-black text-neutral-900 tracking-tight leading-none"
                      dangerouslySetInnerHTML={{ __html: loading && candidates.length === 0 ? dict.candidatesList.analyzingProfiles : dict.candidatesList.bestMatches.replace('{count}', totalCandidates.toLocaleString()) }} />
                  <div className="flex items-center gap-2 mt-1">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em]">{dict.candidatesList.verifiedIndia}</p>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="px-4 py-2 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center gap-3">
                  <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">{dict.candidatesList.sort}:</span>
                  <select className="bg-transparent text-[10px] font-black text-neutral-700 focus:outline-none cursor-pointer">
                     <option>Latest Active</option>
                     <option>High Experience</option>
                     <option>Highest Rated</option>
                  </select>
               </div>
            </div>
          </div>

          {/* Content Grid */}
          {loading && candidates.length === 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-[32px] bg-white border border-neutral-100 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-50 to-transparent -translate-x-full animate-shimmer" />
                </div>
              ))}
            </div>
          ) : candidates.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {candidates.map((candidate, idx) => (
                  <CandidateCard
                    key={`${candidate.id}-${idx}`}
                    candidate={candidate}
                    locale={locale}
                    dict={dict}
                  />
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
                 {loadingMore && (
                    <div className="flex flex-col items-center gap-3">
                       <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                       <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Discovering More Talent...</span>
                    </div>
                 )}
                 {!loadingMore && currentPage >= totalPages && totalCandidates > 0 && (
                    <div className="px-6 py-3 bg-neutral-50 rounded-2xl border border-neutral-100 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                       You've reached the end of the list
                    </div>
                 )}
              </div>
            </>
          ) : (
            <div className="py-12 bg-white rounded-[32px] border border-neutral-100 shadow-soft">
              <EmptyState
                icon="search"
                title={dict.candidatesList.noProfessionalsFound}
                description={dict.candidatesList.noProfessionalsDesc}
                action={{
                  label: dict.candidatesList.resetFilters,
                  onClick: clearFilters
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
