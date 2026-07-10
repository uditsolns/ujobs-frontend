'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Smartphone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ChevronRight, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Download,
  QrCode,
  Globe,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants/routes';
import { JOB_CATEGORIES } from '@/lib/constants/categories';
import { PRIORITY_CITIES } from '@/lib/constants/cities';

interface FooterProps {
  locale: Locale;
  dict: any;
  categories?: any[];
  locations?: any[];
}

export const Footer = ({ locale, dict, categories = [], locations = [] }: FooterProps) => {
  const [showAllCities, setShowAllCities] = useState(false);
  const [showAllHiring, setShowAllHiring] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const l = (path: string) => `/${locale}${path.startsWith('/') ? path : `/${path}`}`;

  // SEO Data Mapping - DYNAMIC PERMUTATIONS
  const seoPermutations = useMemo(() => {
    const cats = categories.length > 0 ? categories : JOB_CATEGORIES;
    const cities = locations.length > 0 ? locations : PRIORITY_CITIES;
    
    const getName = (item: any) => item.name || item.work_type_name || 'Professional';
    
    // Create variety by shifting arrays
    // Use the maximum length to ensure all items are represented at least once
    const baseCount = Math.max(cats.length, cities.length);
    const startHiring = [];
    const popularJobs = [];
    const specializations = [];
    
    for (let i = 0; i < baseCount; i++) {
      const cat = cats[i % cats.length];
      const city = cities[i % cities.length];
      const cat2 = cats[(i + 7) % cats.length];
      const city2 = cities[(i + 4) % cities.length];
      const cat3 = cats[(i + 13) % cats.length];
      const city3 = cities[(i + 9) % cities.length];
      
      startHiring.push({
        label: `Hire ${getName(cat)} in ${city.name}`,
        href: l(ROUTES.category?.city?.(getName(cat), city.name) || `/jobs?q=${encodeURIComponent(getName(cat))}&location=${encodeURIComponent(city.name)}`)
      });
      
      popularJobs.push({
        label: `${getName(cat2)} Jobs in ${city2.name}`,
        href: l(ROUTES.category?.city?.(getName(cat2), city2.name) || `/jobs?q=${encodeURIComponent(getName(cat2))}&location=${encodeURIComponent(city2.name)}`)
      });
      
      specializations.push({
        label: `Trusted ${getName(cat3)} in ${city3.name}`,
        href: l(ROUTES.category?.city?.(getName(cat3), city3.name) || `/jobs?q=${encodeURIComponent(getName(cat3))}&location=${encodeURIComponent(city3.name)}`)
      });
    }
    
    return { 
      startHiring: {
        visible: showAllHiring ? startHiring : startHiring.slice(0, 18),
        total: startHiring.length
      },
      popularJobs: {
        visible: showAllCities ? popularJobs : popularJobs.slice(0, 18),
        total: popularJobs.length
      },
      specializations: {
        visible: showAllCategories ? specializations : specializations.slice(0, 18),
        total: specializations.length
      }
    };
  }, [categories, locations, locale, showAllHiring, showAllCities, showAllCategories]);

  return (
    <footer className="bg-white text-neutral-900 border-t border-neutral-200">
      {/* 1. Value Proposition Bar (HIGH CONTRAST) */}
      <div className="bg-neutral-100 border-b border-neutral-200 py-4">
        <div className="container-custom flex flex-wrap justify-center gap-x-16 gap-y-3">
           <div className="flex items-center gap-2 text-[10px] font-black text-neutral-700 uppercase tracking-[0.2em]">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              {dict.footer.backgroundVerified}
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-neutral-700 uppercase tracking-[0.2em]">
              <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
              {dict.footer.ratedApp}
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-neutral-700 uppercase tracking-[0.2em]">
              <Globe className="w-4 h-4 text-brand-600" />
              {dict.footer.activeCities.replace('{count}', (locations.length > 50 ? locations.length : '50').toString())}
           </div>
        </div>
      </div>

      <div className="container-custom pt-16 pb-10">
        {/* 2. Main Footer Link Infrastructure (3-COLUMN LAYOUT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          
          {/* Column 1: Popular Categories */}
          <div className="space-y-8">
            <h3 className="text-xs font-black text-neutral-900 uppercase tracking-[0.2em] flex items-center gap-4">
               {dict.footer.popularCategories} <span className="flex-1 h-px bg-neutral-200"></span>
            </h3>
            <div className="flex flex-col gap-y-3">
              {seoPermutations.popularJobs.visible.map((item, i) => (
                <Link 
                  key={`pop-${i}`} 
                  href={item.href} 
                  className="text-[11px] font-bold text-neutral-700 hover:text-brand-600 transition-colors flex items-center gap-2"
                >
                  <ChevronRight className="w-2.5 h-2.5 text-blue-500/50" />
                  {item.label}
                </Link>
              ))}
            </div>
            {seoPermutations.popularJobs.total > 18 && (
              <button 
                onClick={() => setShowAllCities(!showAllCities)}
                className="text-[9px] font-black text-brand-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all pt-2"
              >
                {showAllCities ? 'Show Less' : `View All ${seoPermutations.popularJobs.total}`}
                {showAllCities ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
          </div>

          {/* Column 2: Specializations */}
          <div className="space-y-8">
            <h3 className="text-xs font-black text-neutral-900 uppercase tracking-[0.2em] flex items-center gap-4">
               {dict.footer.specializations} <span className="flex-1 h-px bg-neutral-200"></span>
            </h3>
            <div className="flex flex-col gap-y-3">
              {seoPermutations.specializations.visible.map((item, i) => (
                <Link 
                  key={`spec-${i}`} 
                  href={item.href} 
                  className="text-[11px] font-bold text-neutral-700 hover:text-brand-600 transition-colors flex items-center gap-2"
                >
                  <ChevronRight className="w-2.5 h-2.5 text-emerald-500/50" />
                  {item.label}
                </Link>
              ))}
            </div>
            {seoPermutations.specializations.total > 18 && (
              <button 
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-[9px] font-black text-brand-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all pt-2"
              >
                {showAllCategories ? 'Show Less' : `View All ${seoPermutations.specializations.total}`}
                {showAllCategories ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
          </div>

          {/* Column 3: Company & Brand */}
          <div className="space-y-8">
            <h3 className="text-xs font-black text-neutral-900 uppercase tracking-[0.2em] flex items-center gap-4">
               {dict.footer.corporate} <span className="flex-1 h-px bg-neutral-200"></span>
            </h3>
            <div className="space-y-6">
              <Link href={l(ROUTES.home)} className="block">
                <Image src="/logo.png" alt="Ujobs India" width={140} height={40} className="object-contain" />
              </Link>
              <p className="text-[11px] font-bold text-neutral-500 leading-relaxed italic">
                {dict.footer.brandNarrative}
              </p>
              <ul className="space-y-3 text-[11px] font-black text-neutral-700">
                 <li><Link href={l('/about')} className="hover:text-brand-600 transition-colors flex items-center gap-2"><ChevronRight className="w-2.5 h-2.5" />{dict.footer.aboutUjobs}</Link></li>
                 <li><Link href={l('/contact')} className="hover:text-brand-600 transition-colors flex items-center gap-2"><ChevronRight className="w-2.5 h-2.5" />{dict.footer.contactUs}</Link></li>
                 <li><Link href={l('/blog')} className="hover:text-brand-600 transition-colors flex items-center gap-2"><ChevronRight className="w-2.5 h-2.5" />{dict.footer.blog}</Link></li>
                 <li><Link href={l('/careers')} className="hover:text-brand-600 transition-colors flex items-center gap-2"><ChevronRight className="w-2.5 h-2.5" />{dict.footer.careers}</Link></li>
                 <li><Link href={l('/media-coverage')} className="hover:text-brand-600 transition-colors flex items-center gap-2"><ChevronRight className="w-2.5 h-2.5" />{dict.footer.mediaCoverage || 'Media Coverage'}</Link></li>
              </ul>
              <div className="flex gap-3 pt-4">
                 {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                   <a key={i} href="#" className="w-8 h-8 rounded-lg bg-neutral-50 text-neutral-600 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all shadow-sm border border-neutral-200">
                     <Icon className="w-3.5 h-3.5" />
                   </a>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. App Ecosystem & Corporate Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-12 border-t border-neutral-200">
           {/* Mobile App Ecosystem - MAXIMUM CONTRAST VERSION */}
           <div className="lg:col-span-12 bg-white border-2 border-neutral-900 rounded-[32px] p-8 md:p-10 text-neutral-900 relative overflow-hidden shadow-elevated group">
              <div className="relative z-10 flex flex-col xl:flex-row gap-12 items-center">
                 <div className="flex-1 text-center xl:text-left w-full">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white mb-6">
                       <Smartphone className="w-3.5 h-3.5" /> {dict.footer.officialApp}
                    </div>
                    <h4 className="text-4xl md:text-5xl font-display font-black mb-6 leading-[1.1] tracking-tight text-neutral-900">
                       Find your dream job <span className="bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent italic">made simple.</span>
                    </h4>
                    <p className="text-neutral-500 text-sm font-bold mb-10 max-w-xl mx-auto xl:mx-0 leading-relaxed uppercase tracking-wider">{dict.footer.appDesc}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-8 items-center justify-center xl:justify-start">
                      <div className="flex flex-col gap-3 w-full sm:w-auto">
                         <a href={ROUTES.download.android} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-neutral-900 border-2 border-neutral-900 rounded-2xl hover:bg-neutral-50 transition-all shadow-sm active:scale-95 group/btn min-w-[200px]">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                               <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            <div className="text-left leading-none">
                               <div className="text-[10px] font-black uppercase mb-0.5 text-neutral-500 tracking-wider">{dict.appBanner.getItOn}</div>
                               <div className="text-[14px] font-black text-neutral-900">{dict.appBanner.googlePlay}</div>
                            </div>
                         </a>
                         <a href={ROUTES.download.ios} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-neutral-900 border-2 border-neutral-900 rounded-2xl hover:bg-neutral-50 transition-all shadow-sm active:scale-95 group/btn min-w-[200px]">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                               <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                            </svg>
                            <div className="text-left leading-none">
                               <div className="text-[10px] font-black uppercase mb-0.5 text-neutral-500 tracking-wider">{dict.appBanner.downloadOn}</div>
                               <div className="text-[14px] font-black text-neutral-900">{dict.appBanner.appStore}</div>
                            </div>
                         </a>
                      </div>

                      <div className="flex gap-6">
                        <div className="bg-neutral-50 p-1.5 rounded-2xl border-2 border-neutral-100 shadow-sm flex flex-col items-center gap-1.5">
                          <QRCodeSVG value={ROUTES.download.android} size={64} />
                          <span className="text-[8px] font-black uppercase tracking-tighter text-neutral-400">Android</span>
                        </div>
                        <div className="bg-neutral-50 p-1.5 rounded-2xl border-2 border-neutral-100 shadow-sm flex flex-col items-center gap-1.5">
                          <QRCodeSVG value={ROUTES.download.ios} size={64} />
                          <span className="text-[8px] font-black uppercase tracking-tighter text-neutral-400">iOS</span>
                        </div>
                      </div>
                    </div>
                 </div>

                 <div className="hidden xl:flex flex-col gap-4 p-8 bg-neutral-900 rounded-[32px] text-white min-w-[280px] shadow-2xl relative">
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-brand-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
                       <Zap className="w-6 h-6 text-white fill-current" />
                    </div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-2">App Exclusive Benefits</h5>
                    <div className="space-y-4">
                       {[
                          { title: dict.footer.appBenefits.directChat, icon: <Mail className="w-4 h-4" />, color: 'text-brand-400' },
                          { title: dict.footer.appBenefits.smartAlerts, icon: <Zap className="w-4 h-4" />, color: 'text-amber-400' },
                          { title: dict.footer.appBenefits.safeHiring, icon: <ShieldCheck className="w-4 h-4" />, color: 'text-emerald-400' }
                       ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 group/item">
                             <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-white group-hover/item:text-black transition-all ${item.color}`}>
                                {item.icon}
                             </div>
                             <div className="text-xs font-black text-white leading-none uppercase tracking-tight">{item.title}</div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 4. Corporate Footer Bottom (HIGH CONTRAST) */}
        <div className="pt-12 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="space-y-3 text-center md:text-left">
              <div className="text-[11px] font-black text-neutral-800">
                 {dict.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
              </div>
              <div className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">
                 {dict.footer.redefining}
              </div>
           </div>
           
           <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-black text-neutral-800 uppercase tracking-widest">
              <Link href={l(ROUTES.legal.terms)} className="hover:text-brand-600 transition-colors">{dict.footer.terms}</Link>
              <Link href={l(ROUTES.legal.privacy)} className="hover:text-brand-600 transition-colors">{dict.footer.privacy}</Link>
              <Link href={l('/compliance')} className="hover:text-brand-600 transition-colors">{dict.footer.regulatoryCompliance}</Link>
              <Link href={l('/vulnerability')} className="hover:text-brand-600 transition-colors">{dict.footer.security}</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};
