/**
 * JobCard Component
 * Displays job information in a card format - Best-in-Class Redesign
 * Focus: No Truncation, Sharp Typography, Prominent Category
 */

import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  ArrowRight, 
  Calendar, 
  Users,
  Wallet,
  Zap,
  History
} from 'lucide-react';
import type { Job } from '@/types';
import { ROUTES, l } from '@/lib/constants/routes';
import { formatRelativeTime } from '@/lib/utils/date';
import { capitalize, stripHtml } from '@/lib/utils/string';
import { getApiImageUrl } from '@/lib/utils/url';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface JobCardProps {
  job: Job;
  dict?: any;
  variant?: 'default' | 'compact';
  locale?: string;
}

export default function JobCard({ job, dict, variant = 'default', locale = 'en' }: JobCardProps) {
  // Safely extract data with fallbacks
  const j = dict?.jobs || {};
  const c = dict?.common || {};
  
  const jobTitle = job.job_title || job.name || (j.opening || 'Job Opening');
  const jobDescription = job.job_description || job.description || job.requirement || '';
  const location = job.location?.name || job.location?.city || job.location?.location_name || (job as any).location_name || 'India';
  const category = job.work_type?.name || job.category || 'General';
  const salary = job.salary || job.pay || 'Negotiable';
  const experience = job.experience || (job as any).required_experience || 'Not specified';
  const employmentType = job.employment_type || (job as any).job_type || 'Full Time';
  const companyLogo = job.user?.company_logo || job.company_logo;
  const categoryImage = job.work_type?.image;
  const postedDate = job.posted_at || (job as any).posted_date || job.created_at;
  const jobStatus = job.status || 'Open';

  // If postedDate is already a relative string (contains "ago" or "now"), use it directly
  const displayTime = typeof postedDate === 'string' && (postedDate.includes('ago') || postedDate.includes('now'))
    ? postedDate
    : (postedDate ? (formatRelativeTime(postedDate) || 'Recently') : 'Recently');

  const genderPref = job.gender_preference || 'Any Gender';
  const workingHrs = job.working_hrs || '';
  const shiftTiming = job.shift_timing || (job as any).time_duration || 'Shift N/A';
  
  const payType = salary.toLowerCase().includes('week') ? 'Weekly' : 
                  salary.toLowerCase().includes('day') ? 'Daily' : 'Monthly';

  if (jobStatus !== 'Open' && jobStatus !== 'Active' && jobStatus !== '1') return null;

  return (
    <Link href={l(ROUTES.jobs.detail(job.id, jobTitle, location), locale)}>
      <Card variant="interactive" padding="none" className="h-full flex flex-col group hover:border-blue-400 shadow-sm hover:shadow-lg transition-all duration-300 bg-white rounded-2xl overflow-hidden border border-slate-200">
        <div className="p-5 flex-1 flex flex-col">
          {/* Header with Icon and Category */}
          <div className="flex items-start gap-3 mb-4">
            {/* Icon */}
            <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 ring-2 ring-slate-100">
              {job.work_type?.image ? (
                <Image src={getApiImageUrl(job.work_type.image)} alt={category} fill className="object-cover" sizes="64px" />
              ) : job.user?.profile_photo ? (
                <Image src={getApiImageUrl(job.user.profile_photo)} alt="Company" fill className="object-cover" sizes="64px" />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-slate-300" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {/* Category Badge - PROMINENT */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center px-3 py-1   font-bold rounded-md uppercase">
                  {capitalize(jobTitle)}
                </span>
            
              </div>

              {/* Job Title */}
              {/* <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                 {capitalize(jobTitle)}
              </h3> */}

              {/* Location & Type */}
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-slate-600">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="font-medium">{location}</span>
                </div>
                    <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-semibold rounded">
                  {j.available || 'Available'}
                </span>
              </div>
            </div>
          </div>

          {/* Salary Box - More Prominent */}
          <div className="mb-4 p-3 bg-gradient-to-br from-emerald-50 via-emerald-50 to-emerald-100/50 rounded-xl border-2 border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Wallet className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-emerald-700 font-semibold mb-0.5">{payType} {j.salary || 'Salary'}</p>
                  <p className="text-xs font-bold text-slate-900">₹{salary.replace(/[^\d-]/g, '') || salary}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid - Better Styled Boxes */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Shift Timing */}
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl border border-blue-200">
              <div className="flex flex-col items-center text-center">
                <Clock className="h-5 w-5 text-blue-600 mb-2" />
                <p className="text-[10px] text-blue-700 font-semibold uppercase mb-1">Shift</p>
                <p className="text-xs font-bold text-slate-900 leading-tight">{shiftTiming}</p>
              </div>
            </div>

            {/* Gender */}
            <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl border border-purple-200">
              <div className="flex flex-col items-center text-center">
                <Users className="h-5 w-5 text-purple-600 mb-2" />
                <p className="text-[10px] text-purple-700 font-semibold uppercase mb-1">Gender</p>
                <p className="text-xs font-bold text-slate-900 leading-tight">{genderPref}</p>
              </div>
            </div>

            {/* Experience */}
            <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-xl border border-amber-200">
              <div className="flex flex-col items-center text-center">
                <History className="h-5 w-5 text-amber-600 mb-2" />
                <p className="text-[10px] text-amber-700 font-semibold uppercase mb-1">Experience</p>
                <p className="text-xs font-bold text-slate-900 leading-tight">{experience}</p>
              </div>
            </div>
          </div>

          {/* Requirements - Better Styled */}
          <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200 mb-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-blue-100 rounded">
                <Zap className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-slate-700">Job Requirements</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
              {stripHtml(jobDescription) || 'Professional requirements based on industry standards for this category.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>
              {displayTime}
            </span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-blue-500/20 active:scale-95">
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
