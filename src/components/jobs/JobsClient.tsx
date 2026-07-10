'use client';

/**
 * Jobs Client Component
 * Listing and filtering for jobs - Redesigned for Vibrant & Friendly theme
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import JobCard from '@/components/jobs/JobCard';
import EmptyState from '@/components/shared/EmptyState';
import { Filter, Search, MapPin, X, ChevronLeft, ChevronRight, Briefcase, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { WorkType, Location, Job } from '@/types';
import JobsService from '@/services/jobs.service';
import { ROUTES } from '@/lib/constants/routes';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

import { matchLocation, matchCategory } from '@/lib/utils/fuzzySearch';

interface JobsClientProps {
  initialJobs: Job[];
  categories: WorkType[];
  locations: Location[];
  locale: string;
  dict: any;
  initialTotal?: number;
  initialTotalPages?: number;
  initialPage?: number;
  initialQ?: string;
  initialLocation?: string;
  initialCategory?: string;
}

export default function JobsClient({ 
  initialJobs, 
  categories, 
  locations, 
  locale, 
  dict,
  initialTotal,
  initialTotalPages,
  initialPage,
  initialQ = '',
  initialLocation = '',
  initialCategory = ''
}: JobsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Use truthy values from either props or searchParams for reliable initial state
  const [searchQuery, setSearchQuery] = useState(String(searchParams.get('q') || initialQ || searchParams.get('category') || initialCategory || ''));
  const [locationQuery, setLocationQuery] = useState(String(searchParams.get('location') || initialLocation || ''));
  const [selectedCategory, setSelectedCategory] = useState(String(searchParams.get('category') || initialCategory || ''));

  // Fallback for missing dictionary entries to prevent crashes
  const jDict = dict?.jobsList || {
    searchPlaceholder: "Search for Driver, Nurse, Maid, Cook jobs...",
    locationPlaceholder: "Search City or Locality",
    searchButton: "Find Jobs",
    filters: "Filter",
    reset: "Reset",
    allLocations: "All Cities",
    categories: "Work Type",
    allCategories: "All Categories",
    categoryJobs: "Verified <span class=\"text-brand-600\">{category}</span> ready to work",
    discoverOpportunities: "Discover <span class=\"text-brand-600\">New Opportunities</span>",
    searching: "Searching for best matches...",
    foundJobs: "{count} verified jobs available",
    showingResults: "Showing <strong>{count}</strong> results",
    noJobsFound: "No Jobs Found",
    noJobsDesc: "Try adjusting your filters or search in a different location.",
    clearFilters: "Clear All Filters"
  };
  
  // Find initial location ID if name is provided
  const findLocationIdByName = (name: string) => {
    if (!name) return '';
    const match = locations.find(l => 
      (l.name || '').toLowerCase() === name.toLowerCase() || 
      (l.city || '').toLowerCase() === name.toLowerCase() ||
      (l.location_name || '').toLowerCase() === name.toLowerCase()
    );
    return match ? String(match.id) : '';
  };

  const [selectedLocation, setSelectedLocation] = useState(findLocationIdByName(locationQuery));
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const [totalJobs, setTotalJobs] = useState(initialTotal !== undefined ? initialTotal : initialJobs.length);

  // Use centralized fuzzy matching
  const filteredCities = locationQuery 
    ? matchLocation(locations, locationQuery)
    : [];

  const jobSuggestions = searchQuery.trim() 
    ? matchCategory(categories, searchQuery).slice(0, 8) 
    : [];

  // Robust synchronization effect
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const loc = searchParams.get('location') || '';
    const cat = searchParams.get('category') || '';
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;

    // Synchronize local state with URL
    // If q is present, use it. If not, fallback to category for the search box
    setSearchQuery(q || cat);
    setLocationQuery(loc);
    setSelectedCategory(cat);
    setCurrentPage(page);
    
    // Update location ID based on name to keep sidebar in sync
    const locId = findLocationIdByName(loc);
    setSelectedLocation(locId);

    // Fetch filtered data
    handleFilter(q, loc, cat, locId, page);
  }, [searchParams]);

  const handleFilter = async (query: string, location: string, category: string, locationId: string, page: number, append: boolean = false) => {
    // Only show loading if we're not appending (initial load or filter change)
    if (!append) setLoading(true);
    
    try {
      const params: any = { page, per_page: 12 };
      if (query) params.query = query;
      if (location) params.job_location = location;
      if (category) {
        const cat = categories.find(c => c.name === category);
        if (cat) params.work_type_id = cat.id;
      }
      if (locationId) params.location_id = locationId;

      const results = await JobsService.searchJobs(params) as any;
      
      let newJobs: Job[] = [];
      let total: number = 0;
      let pages: number = 1;

      if (results.status === 'success') {
        newJobs = results.data || [];
        total = results.total || results.meta?.total || newJobs.length;
        pages = results.last_page || results.meta?.last_page || 1;
      } else if (Array.isArray(results)) {
        newJobs = results;
        total = results.length;
        pages = 1;
      }

      if (append) {
        setJobs(prev => [...prev, ...newJobs]);
      } else {
        setJobs(newJobs);
        setTotalJobs(total);
        setTotalPages(pages);
      }
    } catch (error) {
      console.error('Error filtering jobs:', error);
      if (!append) setJobs([]);
    } finally {
      if (!append) setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCitySuggestions(false);
    setShowJobSuggestions(false);
    updateUrl(1);
  };

  const updateUrl = (page: number) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (locationQuery) params.set('location', locationQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (page > 1) params.set('page', page.toString());
    
    // Use scroll: false to prevent jump to top
    router.push(`/${locale}${ROUTES.jobs.list}?${params.toString()}`, { scroll: false });
  };

  const selectJobSuggestion = (name: string) => {
    setSearchQuery(name);
    setSelectedCategory(name);
    setShowJobSuggestions(false);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', name);
    params.delete('q');
    params.delete('page');
    router.push(`/${locale}${ROUTES.jobs.list}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    router.push(`/${locale}${ROUTES.jobs.list}`, { scroll: false });
  };

  const hasActiveFilters = searchQuery || locationQuery || selectedCategory || selectedLocation;

  return (
    <div className="bg-neutral-50 min-h-screen pt-32 pb-16">
      <div className="container-custom">
        
        {/* Modern Search Section */}
        <div className="mb-12">
          <Card padding="sm" variant="elevated" className="bg-white border-neutral-100 overflow-visible relative z-30">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
              <div className="flex-[1.5] relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowJobSuggestions(true);
                  }}
                  onFocus={() => setShowJobSuggestions(true)}
                  placeholder={jDict.searchPlaceholder}
                  className="bg-neutral-50 border-transparent shadow-none"
                  leftIcon={<Search className="w-5 h-5 text-neutral-400" />}
                />

                {/* Job Category Suggestions Dropdown */}
                {showJobSuggestions && jobSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-elevated z-[80] max-h-64 overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-2">
                    {jobSuggestions.map((cat, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-brand-50 rounded-xl font-bold text-neutral-700 text-sm transition-colors flex items-center group/item"
                        onClick={() => selectJobSuggestion(cat.name)}
                      >
                        <Briefcase className="w-4 h-4 mr-3 text-neutral-300 group-hover/item:text-brand-500" />
                        <div>
                          <div className="text-neutral-900 group-hover/item:text-brand-600 transition-colors">{cat.name}</div>
                          {cat.job_count > 0 && (
                            <div className="text-[10px] font-black text-brand-500 uppercase tracking-widest">{cat.job_count} Jobs</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {showJobSuggestions && (
                  <div 
                    className="fixed inset-0 z-[-1]" 
                    onClick={() => setShowJobSuggestions(false)}
                  />
                )}
              </div>
              <div className="flex-1 relative">
                <Input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onFocus={() => setShowCitySuggestions(true)}
                  placeholder={jDict.locationPlaceholder}
                  className="bg-neutral-50 border-transparent shadow-none"
                  leftIcon={<MapPin className="w-5 h-5 text-neutral-400" />}
                />
                
                {/* City Suggestions Dropdown */}
                {showCitySuggestions && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-elevated z-[80] max-h-64 overflow-y-auto">
                    {filteredCities.map((city: any, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="w-full text-left px-6 py-3 hover:bg-neutral-50 font-bold text-neutral-700 text-sm border-b border-neutral-50 last:border-none"
                        onClick={() => {
                          setLocationQuery(city.name || '');
                          setShowCitySuggestions(false);
                          // Trigger immediate filter for better UX
                          const params = new URLSearchParams(searchParams.toString());
                          params.set('location', city.name || '');
                          params.delete('page');
                          router.push(`/${locale}${ROUTES.jobs.list}?${params.toString()}`, { scroll: false });
                        }}
                      >
                        <MapPin className="inline w-4 h-4 mr-3 text-brand-500" />
                        {city.name}
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
              <Button type="submit" size="lg" className="rounded-2xl lg:px-12">
                {jDict.searchButton}
              </Button>
              {hasActiveFilters && (
                <Button type="button" variant="ghost" onClick={clearFilters} className="rounded-2xl text-neutral-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </Button>
              )}
            </form>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 sticky top-32 h-fit z-20">
            <Card padding="md" variant="elevated" className="bg-white border-neutral-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <h2 className="font-display font-bold text-neutral-900">{jDict.filters}</h2>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs font-bold text-brand-600 hover:text-brand-700 uppercase tracking-widest">
                    {jDict.reset}
                  </button>
                )}
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 px-1">Location</h3>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      // Reset to page 1 for new search
                      setCurrentPage(1);
                      handleFilter(searchQuery, locationQuery, selectedCategory, e.target.value, 1, false);
                    }}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm font-bold text-neutral-700 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                  >
                    <option value="">{jDict.allLocations}</option>
                    {locations.map((loc, index) => (
                      <option key={`${loc.id}-${index}`} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 px-1">{jDict.categories}</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete('category');
                        params.delete('page');
                        router.push(`/${locale}${ROUTES.jobs.list}?${params.toString()}`);
                      }}
                      className={`w-full flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        !selectedCategory 
                        ? 'bg-brand-500 text-white shadow-brand' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {jDict.allCategories}
                    </button>
                    {categories.slice(0, 20).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          const params = new URLSearchParams(searchParams.toString());
                          params.set('category', cat.name);
                          params.delete('page');
                          router.push(`/${locale}${ROUTES.jobs.list}?${params.toString()}`);
                        }}
                        className={`w-full flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          selectedCategory === cat.name 
                          ? 'bg-brand-500 text-white shadow-brand' 
                          : 'text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="pt-8 border-t border-neutral-50">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Active Filters</div>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && <Badge variant="brand" size="sm" className="bg-brand-100 text-brand-700 border-none">{searchQuery}</Badge>}
                      {selectedCategory && <Badge variant="secondary" size="sm" className="bg-secondary-50 text-secondary-700 border-none">{selectedCategory}</Badge>}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
              <div>
                <h1 className="text-3xl font-display font-black text-neutral-900 mb-2" dangerouslySetInnerHTML={{ __html: selectedCategory ? jDict.categoryJobs.replace('{category}', selectedCategory) : jDict.discoverOpportunities }} />
                <p className="text-neutral-500 font-medium italic" dangerouslySetInnerHTML={{ __html: loading ? jDict.searching : jDict.foundJobs.replace('{count}', totalJobs.toString()) }} />
              </div>
              
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl shadow-soft border border-neutral-50 text-sm font-bold text-neutral-500 transition-all hover:shadow-md">
                <LayoutGrid className="w-4 h-4 text-brand-500" />
                <span dangerouslySetInnerHTML={{ __html: jDict.showingResults.replace('{count}', jobs.length.toString()) }} />
              </div>
            </div>

            {loading && jobs.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white h-64 rounded-3xl animate-pulse border border-neutral-100 shadow-soft"></div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {jobs.map((job, index) => (
                    <JobCard key={`${job.id}-${index}`} job={job} dict={dict} locale={locale} />
                  ))}
                </div>

                {/* Lazy Load / Load More */}
                {currentPage < totalPages && (
                  <div className="flex flex-col items-center justify-center pt-8 border-t border-neutral-100">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
                      Showing {jobs.length} of {totalJobs} Verified Openings
                    </p>
                    <Button
                      size="lg"
                      className="rounded-2xl px-12 h-14 bg-white text-brand-600 border-2 border-brand-100 hover:bg-brand-50 hover:border-brand-200 transition-all shadow-subtle group"
                      onClick={() => {
                        const nextPage = currentPage + 1;
                        setCurrentPage(nextPage);
                        handleFilter(searchQuery, locationQuery, selectedCategory, selectedLocation, nextPage, true);
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Load More Jobs
                          <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
                
                {currentPage >= totalPages && jobs.length > 0 && (
                  <div className="text-center pt-12">
                    <div className="inline-flex items-center px-6 py-3 bg-neutral-100 rounded-full text-neutral-500 text-xs font-black uppercase tracking-widest">
                       🎉 You've reached the end of the list
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                icon="search"
                dict={dict}
                title={jDict.noJobsFound}
                description={jDict.noJobsDesc}
                action={{
                  label: jDict.clearFilters,
                  onClick: clearFilters
                }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
