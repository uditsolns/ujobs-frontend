'use client';

/**
 * CategoryJobsList Component
 * Interactive job listing with filters for category landing pages
 */

import { useState } from 'react';
import JobCard from '@/components/jobs/JobCard';
import { Users, ChevronRight, Briefcase, LayoutGrid, SlidersHorizontal, MapPin } from 'lucide-react';
import { Location, Job } from '@/types';
import JobsService from '@/services/jobs.service';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

interface CategoryJobsListProps {
  initialJobs: Job[];
  categoryName: string;
  categoryId: number;
  locations: Location[];
  locale: string;
  dict: any;
  initialTotal: number;
  initialTotalPages: number;
}

export default function CategoryJobsList({ 
  initialJobs, 
  categoryName,
  categoryId,
  locations, 
  locale, 
  dict,
  initialTotal,
  initialTotalPages
}: CategoryJobsListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState({
    location_id: '',
    gender: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalJobs, setTotalJobs] = useState(initialTotal);

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

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    fetchJobs(1, true, newFilters);
  };

  const fetchJobs = async (page: number, reset: boolean = false, activeFilters = filters) => {
    if (reset) setLoading(true);
    else setLoadingMore(true);

    try {
      const params: any = { 
        page, 
        per_page: 12,
        work_type_id: categoryId
      };

      if (activeFilters.location_id) params.location_id = activeFilters.location_id;
      if (activeFilters.gender) params.gender = activeFilters.gender;

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

      if (reset) {
        setJobs(newJobs);
      } else {
        setJobs(prev => [...prev, ...newJobs]);
      }
      
      setTotalJobs(total);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error filtering jobs:', error);
      if (reset) setJobs([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const clearFilters = () => {
    const defaultFilters = { location_id: '', gender: '' };
    setFilters(defaultFilters);
    setCurrentPage(1);
    fetchJobs(1, true, defaultFilters);
  };

  const hasActiveFilters = filters.location_id || filters.gender;

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 sticky top-32 h-fit z-20">
        <Card padding="md" variant="elevated" className="bg-white border-neutral-100 shadow-soft rounded-[2rem]">
          <div className="flex items-center justify-between mb-8 px-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">
                {jDict.filters}
              </h3>
            </div>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters} 
                className="text-[10px] font-black text-brand-600 hover:text-brand-700 uppercase tracking-widest border-b border-brand-200"
              >
                {jDict.reset}
              </button>
            )}
          </div>
          
          <div className="space-y-10">
            {/* Location Filter */}
            <div>
              <div className="flex items-center gap-2 mb-4 px-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Location</h4>
              </div>
              <select
                value={filters.location_id}
                onChange={(e) => handleFilterChange('location_id', e.target.value)}
                className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold text-neutral-700 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0/0 24 24\' stroke=\'%23a3a3a3\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
              >
                <option value="">{jDict.allLocations}</option>
                {locations.map((loc, index) => (
                  <option key={`loc-${loc.id}-${index}`} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <div className="flex items-center gap-2 mb-4 px-1">
                <Users className="w-3.5 h-3.5 text-neutral-400" />
                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Gender</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Male', 'Female'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => handleFilterChange('gender', filters.gender === gender ? '' : gender)}
                    className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                      filters.gender === gender 
                      ? 'bg-brand-600 border-brand-600 text-white shadow-brand' 
                      : 'bg-white border-neutral-100 text-neutral-500 hover:bg-neutral-50 hover:border-neutral-200'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="pt-8 border-t border-neutral-50">
                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4 px-1">Active Filters</div>
                <div className="flex flex-wrap gap-2">
                  {filters.location_id && (
                    <Badge variant="brand" className="bg-brand-50 text-brand-700 border-none text-[9px] font-black uppercase py-1">
                      {locations.find(l => String(l.id) === filters.location_id)?.name}
                    </Badge>
                  )}
                  {filters.gender && (
                    <Badge variant="secondary" className="bg-secondary-50 text-secondary-700 border-none text-[9px] font-black uppercase py-1">
                      {filters.gender}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-neutral-900 tracking-tight mb-2"
                dangerouslySetInnerHTML={{ __html: filters.location_id 
                  ? `${categoryName} Jobs in ${locations.find(l => String(l.id) === filters.location_id)?.name}`
                  : `${dict.landing.latestJobsInCategory.replace('{{category}}', categoryName)}`
                }} />
            <p className="text-neutral-500 font-bold text-sm uppercase tracking-widest">
              {loading ? 'Searching for best matches...' : `Showing ${totalJobs} verified opportunities`}
            </p>
          </div>
          
          <div className="bg-white px-5 py-2.5 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-3 self-start md:self-auto">
             <LayoutGrid className="w-4 h-4 text-brand-500" />
             <span className="text-neutral-400 font-black text-[10px] uppercase tracking-widest"
                   dangerouslySetInnerHTML={{ __html: jDict?.showingResults ? jDict.showingResults.replace('{count}', jobs.length.toString()) : `${jobs.length} results` }} />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white h-80 rounded-3xl animate-pulse border border-neutral-100 shadow-soft"></div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-6 mb-16">
              {jobs.map((job, index) => (
                <JobCard key={`${job.id}-${index}`} job={job} dict={dict} locale={locale} />
              ))}
            </div>

            {/* Load More */}
            {currentPage < totalPages && (
              <div className="flex flex-col items-center justify-center pt-8 border-t border-neutral-100">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-8">
                  Showing {jobs.length} of {totalJobs} Verified Openings
                </p>
                <Button
                  size="lg"
                  className="rounded-2xl px-12 h-16 bg-white text-brand-600 border-2 border-brand-100 hover:bg-brand-50 hover:border-brand-200 transition-all shadow-subtle group font-black uppercase tracking-widest text-xs"
                  onClick={() => {
                    const nextPage = currentPage + 1;
                    setCurrentPage(nextPage);
                    fetchJobs(nextPage, false);
                  }}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Load More {categoryName} Jobs
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {currentPage >= totalPages && (
              <div className="text-center pt-12">
                <div className="inline-flex items-center px-8 py-4 bg-neutral-50 rounded-full text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] border border-neutral-100">
                   ✨ You've seen all current openings for {categoryName}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white border border-neutral-100 rounded-[3rem] shadow-soft">
            <div className="w-20 h-20 bg-neutral-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-10 w-10 text-neutral-300" />
            </div>
            <h3 className="text-2xl font-display font-black text-neutral-900 mb-3 tracking-tight">
              No results found
            </h3>
            <p className="text-neutral-600 font-bold opacity-80 mb-10 max-w-md mx-auto">
              We couldn't find any {categoryName.toLowerCase()} jobs matching your specific filters.
            </p>
            <Button 
              onClick={clearFilters}
              className="h-14 px-10 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
