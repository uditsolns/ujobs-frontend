'use client';

/**
 * Hero Section - Vibrant Redesign
 * A world-class hero for Ujobs India redesigned for a Vibrant & Friendly theme
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Play, Search, Star, Sparkles, Heart, MapPin, Briefcase, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlayStoreStats from './PlayStoreStats';
import VibrantIcon from '@/components/ui/VibrantIcon';
import type { Banner, WorkType } from '@/types';
import CategoriesService from '@/services/categories.service';
import Image from 'next/image';
import { getApiImageUrl } from '@/lib/utils/url';
import { ROUTES } from '@/lib/constants/routes';
import { matchCategory } from '@/lib/utils/fuzzySearch';

interface HeroSliderProps {
  banners: Banner[];
  stats?: any;
  locale: string;
}

export default function HeroSlider({ banners, stats, locale }: HeroSliderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categories, setCategories] = React.useState<WorkType[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // Fetch categories for autofill
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoriesService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories for hero search:', error);
      }
    };
    fetchCategories();
  }, []);

  // Use centralized fuzzy matching
  const suggestions = searchQuery.trim() ? matchCategory(categories, searchQuery) : [];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      router.push(`/${locale}${ROUTES.jobs.list}?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/${locale}${ROUTES.jobs.list}`);
    }
  };

  const selectSuggestion = (name: string) => {
    setSearchQuery(name);
    setShowSuggestions(false);
    router.push(`/${locale}${ROUTES.jobs.list}?category=${encodeURIComponent(name)}`);
  };

  // Use first banner for images if available
  const activeBanner = banners && banners.length > 0 ? banners[0] : null;
  
  const totalWorkers = stats?.total_candidates ? `${stats.total_candidates.toLocaleString()}+` : '10,000+';
  
  const content = {
    title: 'Hire Trusted Nurses, Caretakers, Maids & Drivers',
    description: `Connect with ${totalWorkers} vetted healthcare, domestic, and professional drivers across India. Your trusted partner for reliable home and office help.`,
    subtitle: 'India\'s Premier Platform for Trusted Help'
  };

  return (
    <div className="relative min-h-[90vh] flex items-center bg-white pt-32 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-50 rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-secondary-50 rounded-full blur-3xl -z-10 opacity-60" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Friendly Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Badge variant="brand" size="lg" className="px-6 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {content.subtitle}
              </Badge>
            </motion.div>

            {/* Vibrant Display Headline */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-display font-display text-neutral-900">
                Hire <span className="gradient-text">Trusted</span> <br />
                Home & Office Help.
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-500 max-w-2xl leading-relaxed mb-12 font-medium"
            >
              Get vetted professionals for your home. We specialize in <span className="text-brand-600 font-bold">24/7 Patient Care</span>, <span className="text-brand-600 font-bold">Newborn Baby Care</span>, and <span className="text-brand-600 font-bold">Experienced Personal Drivers</span> across major Indian cities.
            </motion.p>

            {/* Quick Category Tags - Vibrant Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                { label: 'Home Nurses', color: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-500 hover:text-white' },
                { label: 'Baby Sitters', color: 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-500 hover:text-white' },
                { label: 'Patient Care', color: 'bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-500 hover:text-white' },
                { label: 'Cooks & Maids', color: 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-500 hover:text-white' },
                { label: 'Private Drivers', color: 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-500 hover:text-white' }
              ].map((tag) => (
                <button 
                  key={tag.label} 
                  onClick={() => router.push(`/${locale}${ROUTES.jobs.list}?category=${encodeURIComponent(tag.label)}`)}
                  className={`px-4 py-2 ${tag.color} text-xs font-bold uppercase tracking-wider rounded-xl border transition-all duration-300 shadow-sm active:scale-95`}
                >
                  {tag.label}
                </button>
              ))}
            </motion.div>

            {/* Friendly Search Bar with Autofill */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full relative z-40"
            >
              <form 
                onSubmit={handleSearch} 
                className="flex flex-col sm:flex-row bg-white rounded-3xl p-2 shadow-elevated border border-neutral-100 group focus-within:ring-4 focus-within:ring-brand-500/10 transition-all"
              >
                <div className="flex-1 relative flex items-center">
                  <div className="absolute left-6 text-brand-500">
                    <Search className="h-5 w-5" strokeWidth={3} />
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Find nurses, maids, or drivers..." 
                    className="w-full pl-16 pr-6 py-5 bg-transparent text-neutral-900 placeholder-neutral-400 border-0 focus:ring-0 focus:outline-none font-semibold text-lg"
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 p-2 text-neutral-300 hover:text-neutral-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <Button type="submit" size="lg" className="rounded-2xl h-full py-5">
                  Search Now
                </Button>
              </form>

              {/* Fuzzy Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-neutral-100 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-2">
                    {suggestions.map((cat, idx) => (
                      <button
                        key={`${cat.id}-${idx}`}
                        type="button"
                        onClick={() => selectSuggestion(cat.name)}
                        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 text-left transition-colors group rounded-2xl"
                      >
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">
                            {cat.name}
                          </div>
                          {cat.job_count > 0 && (
                            <div className="text-[10px] font-black text-brand-500 uppercase tracking-widest">
                              {cat.job_count} Verified Jobs
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {showSuggestions && (
                <div 
                  className="fixed inset-0 z-[-1]" 
                  onClick={() => setShowSuggestions(false)}
                />
              )}
            </motion.div>

            {/* Trust Markers */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-8 mt-12"
            >
              <div className="flex items-center gap-3 px-5 py-2.5 bg-success-50 rounded-full border border-success-100 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-success-600" />
                <span className="text-sm font-bold text-success-700">100% Trusted Profiles</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 bg-brand-50 rounded-full border border-brand-100 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-bold text-brand-700">A unit of Ayushya Healthcare</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-brand-gradient rounded-[40px] blur-2xl opacity-20 animate-pulse" />
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-secondary-50" />
                
                {/* Visual Service Grid - Vibrant Indian Icons */}
                <div className="relative h-full w-full p-8 grid grid-cols-2 grid-rows-2 gap-4">
                  {[
                    { label: 'Home Nursing', theme: 'emerald', icon: 'stethoscope', desc: 'ICU & General Care' },
                    { label: 'Domestic Maids', theme: 'saffron', icon: 'utensils', desc: 'Cooks & Cleaning' },
                    { label: 'Patient Care', theme: 'sky', icon: 'heart', desc: 'Elderly Support' },
                    { label: 'Pro Drivers', theme: 'indigo', icon: 'car', desc: 'Personal & Office' }
                  ].map((service, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white rounded-3xl p-5 shadow-lg border border-neutral-100 flex flex-col items-center justify-center text-center group transition-all"
                    >
                      <VibrantIcon 
                        name={service.icon as any} 
                        theme={service.theme as any} 
                        size="md" 
                        className="mb-4"
                        glow
                      />
                      <div className="font-bold text-neutral-900 text-sm mb-1">{service.label}</div>
                      <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">{service.desc}</div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Floating trust card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-3xl p-6 border-2 border-brand-100 flex flex-col items-center text-center w-48 z-20">
                   <div className="w-12 h-12 rounded-full bg-success-500 flex items-center justify-center text-white mb-3 shadow-lg">
                      <ShieldCheck className="w-6 h-6" />
                   </div>
                   <div className="font-black text-lg text-neutral-900 leading-tight mb-1 italic">Trusted Profile</div>
                   <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Pancard Checked</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Briefcase fallback if lucide fails (rare)
function BriefcaseFallback(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
