'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft, ShieldCheck, Sparkles, Download, CheckCircle2, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES, l } from '@/lib/constants/routes';

function DownloadOnlyView({ locale }: { locale: string }) {
  const router = useRouter();
  const [dict, setDict] = useState<any>(null);

  // Fetch dictionary
  useEffect(() => {
    import('@/i18n').then(m => m.getDictionary(locale as any)).then(setDict);
  }, [locale]);

  if (!dict) return <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
  </div>;

  const appStoreUrl = ROUTES.download.android;
  const iosStoreUrl = ROUTES.download.ios;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 pt-28 pb-12">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-gradient opacity-5 -z-10" />
      
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-elevated border border-neutral-100 overflow-hidden">
        <div className="grid md:grid-cols-2">
          
          {/* Left Side: Illustration / Trust Hook */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-brand-800 via-brand-900 to-indigo-950 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Multiple subtle colored glowing orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <Image src="/logo.png" alt="Ujobs" width={120} height={40} className="brightness-0 invert" />
              </div>
              
              <Badge className="bg-white/10 text-brand-300 border border-white/10 px-3.5 py-1.5 font-bold text-[10px] uppercase tracking-wider mb-6 rounded-full shadow-sm">
                Mobile-Only Platform
              </Badge>
              
              <h2 className="text-3xl lg:text-4xl font-display font-black mb-6 leading-tight tracking-tight">
                Secure & <span className="text-brand-300 italic">Direct</span> Staffing
              </h2>
              
              <p className="text-neutral-300 text-sm leading-relaxed mb-8">
                To guarantee safety, data protection, and seamless verification, Ujobs India functions exclusively through our safe hiring app.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-white/10">
                {[
                  "Aadhaar & ID Verified Staff Profiles",
                  "Direct Calls - No Agencies, No Commission",
                  "Interactive Chat & Real-Time Matching",
                  "Secure Application Status Tracking"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-bold">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-[10px] text-brand-300 font-black uppercase tracking-widest relative z-10 flex items-center gap-2">
               <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
               Trusted by 10K+ families
            </div>
          </div>
          
          {/* Right Side: Action Card */}
          <div className="p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
            <div className="mb-8">
              <Badge variant="brand" className="mb-4 bg-brand-5 bg-brand-50 text-brand-700 border-none px-4 py-1 font-bold">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Download App
              </Badge>
              <h1 className="text-3xl font-display font-black text-neutral-900 mb-3 tracking-tight">
                Get the Ujobs India App
              </h1>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed">
                Login, registration, and profile creation are exclusive to our mobile app. Download it now to hire verified help or apply to jobs instantly.
              </p>
            </div>
            
            {/* Store Download Buttons */}
            <div className="space-y-4">
              <Link href={appStoreUrl} target="_blank" className="block">
                <div className="group flex items-center gap-4 px-6 py-4 bg-neutral-900 text-white rounded-2xl hover:bg-black transition-all shadow-md hover:shadow-xl hover:shadow-brand-900/10 active:scale-[0.98]">
                  <svg className="w-8 h-8 text-brand-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left leading-none">
                    <div className="text-[10px] font-black uppercase mb-1 text-neutral-400 tracking-wider">Get it on</div>
                    <div className="text-base font-black text-white">Google Play</div>
                  </div>
                </div>
              </Link>
              
              <Link href={iosStoreUrl} target="_blank" className="block">
                <div className="group flex items-center gap-4 px-6 py-4 bg-white text-neutral-900 border border-neutral-200 rounded-2xl hover:border-brand-500 hover:bg-neutral-50 transition-all shadow-sm hover:shadow-lg active:scale-[0.98]">
                  <svg className="w-8 h-8 fill-current text-neutral-900 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left leading-none">
                    <div className="text-[10px] font-black uppercase mb-1 text-neutral-400 tracking-wider">Download on the</div>
                    <div className="text-base font-black text-neutral-900">App Store</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Go Back Home */}
            <div className="mt-8 text-center">
              <Link href={l('/', locale)} className="inline-flex items-center gap-2 text-sm font-black text-neutral-400 hover:text-brand-600 transition-colors uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DownloadOnlyView locale={locale} />
    </Suspense>
  );
}
