'use client';

/**
 * Play Store Stats Component
 * Display app metrics and database insights - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, ShieldCheck, CheckCircle, Users, TrendingUp, Award, Heart } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface PlayStoreStatsProps {
  stats?: any;
}

export default function PlayStoreStats({ stats }: PlayStoreStatsProps) {
  // Real-world accurate placeholders based on Play Store page
  const rating = "4.6";
  const downloads = "5,000+";
  const reviews = "100+";
  
  // Real database numbers from API stats
  const totalVerifiedExperts = stats?.total_candidates?.toLocaleString() || '10,000';

  return (
    <Card variant="elevated" padding="lg" className="w-full max-w-[600px] border-neutral-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Play Store Branding */}
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-neutral-50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-gradient flex items-center justify-center rounded-2xl shadow-brand">
              <Heart className="w-8 h-8 text-white fill-white/20" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-black text-neutral-900 tracking-tight leading-none">Ujobs India</h3>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-2">Verified Hiring App</p>
            </div>
          </div>
          <Badge variant="success" size="sm" className="hidden sm:flex">Top Rated</Badge>
        </div>

        {/* Play Store Visual Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-neutral-900 mb-2">
              <Star className="h-5 w-5 fill-brand-500 text-brand-500" />
              <span className="text-3xl font-black tracking-tight">{rating}</span>
            </div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-tight">{reviews} Reviews</p>
          </div>
          
          <div className="text-center border-x border-neutral-50 px-4">
            <div className="flex items-center justify-center gap-2 text-neutral-900 mb-2">
              <Download className="h-5 w-5 text-brand-500" strokeWidth={3} />
              <span className="text-3xl font-black tracking-tight">{downloads}</span>
            </div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-tight">Downloads</p>
          </div>

          <div className="text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-end gap-2 text-neutral-900 mb-2">
              <Award className="h-5 w-5 text-brand-500" strokeWidth={3} />
              <span className="text-3xl font-black tracking-tight">3+</span>
            </div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-tight">PEGI Rating</p>
          </div>
        </div>

        {/* Database Real-time Insights Bar */}
        <div className="pt-10 border-t border-neutral-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 w-12 border-2 border-white rounded-full bg-neutral-100 overflow-hidden shadow-sm ring-2 ring-neutral-50">
                  <img src={`https://i.pravatar.cc/100?u=expert${i}`} alt="Expert" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="h-12 w-12 border-2 border-white rounded-full bg-brand-gradient flex items-center justify-center text-xs font-black text-white shadow-brand ring-2 ring-brand-50">
                +{totalVerifiedExperts}
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm font-bold text-neutral-900 uppercase tracking-wider">{totalVerifiedExperts}+ Verified Pros</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mt-1">Available in 100+ Cities</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
