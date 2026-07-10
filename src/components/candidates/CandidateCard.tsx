/**
 * CandidateCard Component
 * Displays candidate/worker information in a compact, proper, and modern format.
 * Focus: High data density, sharp visibility for Skills, Shift, and Languages.
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Candidate } from '@/types/candidate';
import { getApiImageUrl } from '@/lib/utils/url';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { ROUTES, l } from '@/lib/constants/routes';
import { 
  MapPin, 
  Briefcase, 
  ShieldCheck,
  Star,
  History,
  Languages,
  ArrowRight,
  Wallet,
  Clock,
  Users,
  CheckCircle2,
  Zap,
  Code2
} from 'lucide-react';
import { capitalize } from '@/lib/utils/string';

interface CandidateCardProps {
  candidate: Candidate;
  dict?: any;
  variant?: 'default' | 'compact' | 'featured';
  onUnlock?: (candidateId: number) => void;
  showSkills?: boolean;
  showLanguages?: boolean;
  locale?: string;
}

export default function CandidateCard({ 
  candidate, 
  dict,
  variant = 'default', 
  onUnlock,
  showSkills = true,
  showLanguages = true,
  locale = 'en'
}: CandidateCardProps) {
  // Defensive dictionary handling
  const d = dict?.candidates || {};
  const b = dict?.appBanner || {};

  const profilePhotoUrl = candidate.profile_photo 
    ? getApiImageUrl(candidate.profile_photo) 
    : undefined;

  // Extract category for URL
  const firstWorkType = Array.isArray(candidate.work_types) && candidate.work_types.length > 0
    ? candidate.work_types[0]?.name 
    : (candidate as any).work_type_name || (candidate as any).work_type || 'Professional';

  const candidateUrl = l(
    ROUTES.candidates.detail(
      candidate.id,
      candidate.name || 'Professional',
      firstWorkType,
      candidate.city || (candidate as any).reporting_location || 'India'
    ),
    locale
  );

  // --- DATA EXTRACTION (NO CHANGES TO LOGIC, JUST ROBUSTNESS) ---
  const name = candidate.name || 'Professional';
  const displayLocation = (candidate as any).reporting_location || candidate.city || 'India';
  const experience = candidate.total_experience || (candidate as any).work_experience || '0';
  const salary = candidate.sal_expectation || 'Negotiable';
  const gender = candidate.gender || 'Any';
  
  const rawShift = (candidate as any).work_hours || (candidate as any).time_preference || '';
  const formattedShift = rawShift 
    ? (rawShift.toString().toLowerCase().includes('hour') ? rawShift : `${rawShift} Hours`)
    : '8 Hours';

  // --- GENUINE RATING LOGIC ---
  const rating = candidate.average_rating ? Number(candidate.average_rating).toFixed(1) : null;
  const ratingCount = candidate.total_ratings || 0;
  const isNew = ratingCount === 0;

  // Language extraction
  const languagesList = Array.isArray(candidate.languages_known) 
    ? candidate.languages_known 
    : (typeof candidate.languages_known === 'string' ? (candidate.languages_known as string).split(',').map(s => s.trim()) : []);
  const formattedLanguages = languagesList.length > 0 ? languagesList.join(', ') : 'Hindi, English';

  // Category extraction
  const getCategories = () => {
    const categories: string[] = [];
    if (Array.isArray(candidate.work_types)) {
      candidate.work_types.forEach(wt => {
        if (wt && typeof wt === 'object' && (wt as any).name) categories.push((wt as any).name);
        else if (typeof wt === 'string') categories.push(wt);
      });
    }
    if (categories.length === 0 && typeof candidate.work_types === 'string') {
      const parts = (candidate.work_types as string).split(',').map(s => s.trim()).filter(Boolean);
      categories.push(...parts);
    }
    if (categories.length === 0) {
      const fallbacks = [(candidate as any).work_type_name, (candidate as any).work_type, (candidate as any).worktype, (candidate as any).main_category, (candidate as any).category_name, (candidate as any).job_category, (candidate as any).designation];
      for (const val of fallbacks) { if (val && typeof val === 'string' && val.length > 2) { categories.push(val); break; } }
    }
    return categories.length > 0 ? categories : ['Professional'];
  };

  // Skill extraction - ADDED MORE FALLBACKS
  const getSkills = () => {
    const skills: string[] = [];
    if (Array.isArray(candidate.skills)) {
      candidate.skills.forEach(s => {
        const skillName = s.skill_name || s.name || (typeof s === 'string' ? s : undefined);
        if (skillName) skills.push(skillName);
      });
    }
    // Fallback to other_options or workflow_questions if common in backend
    if (skills.length === 0 && Array.isArray((candidate as any).worker_skills)) {
       (candidate as any).worker_skills.forEach((s: any) => {
          if (s.skill_name || s.name) skills.push(s.skill_name || s.name);
       });
    }
    return skills;
  };

  const categories = getCategories();
  const skills = getSkills();

  // --- MODERN COMPACT UI COMPONENTS ---

  const MiniBadge = ({ label, value, icon }: { label: string, value: string, icon: any }) => (
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
        {icon} {label}
      </div>
      <p className="text-sm font-semibold text-neutral-900 truncate">{value}</p>
    </div>
  );

  // Compact Variant (List View)
  if (variant === 'compact') {
    return (
      <Link href={candidateUrl}>
        <div className="bg-white border border-neutral-100 hover:border-brand-500 p-4 rounded-xl flex items-center gap-4 transition-all group shadow-sm hover:shadow-md">
          <Avatar name={name} image={profilePhotoUrl} size="sm" badge={candidate.is_verified ? 'verified' : undefined} className="rounded-lg" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-neutral-900 truncate">{capitalize(name)}</h3>
            <p className="text-xs text-neutral-500 truncate mt-0.5">{categories[0]} • {displayLocation}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    );
  }

  // Modern Featured & Default Card
  return (
    <Link href={candidateUrl} className="block group h-full">
      <div className="h-full flex flex-col bg-white border border-neutral-200 group-hover:border-brand-500 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg">
        {/* Main Content Area */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Header: Photo, Name, Rating */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Avatar 
                name={name} 
                image={profilePhotoUrl} 
                size="xl" 
                className="rounded-xl ring-2 ring-neutral-50 w-16 h-16 shadow-sm" 
              />
              {candidate.is_verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-neutral-900 truncate mb-1 group-hover:text-brand-600 transition-colors">
                {capitalize(name)}
              </h3>
              <div className="flex items-center gap-2 mb-1.5">
                 {isNew ? (
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded text-blue-700 border border-blue-100">
                       <Zap className="w-3 h-3 fill-current" />
                       <span className="text-xs font-medium">{dict?.candidates?.newProfessional || 'New'}</span>
                    </div>
                 ) : (
                    <>
                       <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-neutral-900">{rating}</span>
                       </div>
                       <span className="text-xs text-neutral-500">{ratingCount} {d.reviews}</span>
                    </>
                 )}
              </div>
              <div className="flex items-center gap-1.5 text-neutral-500">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs truncate">{displayLocation}</span>
              </div>
            </div>
          </div>

          {/* Expertises (Work Types) */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {categories.map((cat, idx) => (
              <span key={idx} className="bg-neutral-100 text-neutral-700 text-xs font-medium px-2.5 py-1 rounded-md border border-neutral-200">
                {cat}
              </span>
            ))}
          </div>

          {/* Data Grid: Shift, Experience, Sal, Gender */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100 mb-5">
             <MiniBadge label={d.workShift || 'Shift'} value={formattedShift} icon={<Clock className="w-3.5 h-3.5 text-blue-500" />} />
             <MiniBadge label={d.experience || 'Experience'} value={`${experience} ${d.years || 'Years'}`} icon={<History className="w-3.5 h-3.5 text-amber-500" />} />
             <MiniBadge label={d.salaryExp || 'Salary'} value={`₹${salary.replace(/[^\d-]/g, '') || salary}`} icon={<Wallet className="w-3.5 h-3.5 text-emerald-500" />} />
             <MiniBadge label={d.gender || 'Gender'} value={gender} icon={<Users className="w-3.5 h-3.5 text-purple-500" />} />
          </div>

          {/* Language & Skills */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <Languages className="w-3.5 h-3.5 text-brand-500" /> {d.languages || 'Languages'}
               </div>
               <p className="text-sm font-semibold text-neutral-900 pl-5.5">{formattedLanguages}</p>
            </div>

            {showSkills && skills.length > 0 && (
               <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                     <Zap className="w-3.5 h-3.5 text-brand-500" /> {d.technicalSkills || 'Skills'}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-5.5">
                     {skills.slice(0, 3).map((skill, idx) => (
                       <span key={idx} className="bg-white text-xs text-neutral-600 px-2 py-0.5 rounded border border-neutral-200">
                         {skill}
                       </span>
                     ))}
                     {skills.length > 3 && (
                        <span className="text-xs text-neutral-400">
                           +{skills.length - 3} {d.more || 'more'}
                        </span>
                     )}
                  </div>
               </div>
            )}
          </div>
        </div>

        {/* Footer Interaction Bar */}
        <div className="px-5 py-4 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between gap-3">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-500 border border-neutral-100">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-neutral-900 leading-tight">{d.verified || 'Compliance Checked'}</p>
                <p className="text-[10px] text-neutral-500">Safe & Trusted</p>
              </div>
           </div>
           <Button variant="primary" className="h-9 px-4 rounded-lg font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all">
              {d.viewProfile || 'View Profile'}
           </Button>
        </div>
      </div>
    </Link>
  );
}
