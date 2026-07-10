'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n, Locale } from '@/i18n';
import { Languages, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

export const LanguageSwitcher = ({ currentLocale, dict }: { currentLocale: Locale, dict?: any }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const redirectedPathname = (locale: string) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'ne', name: 'नेपाली' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
  ];

  const currentLanguage = languages.find(l => l.code === currentLocale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-slate-900 hover:text-brand-600 px-3 py-2 text-sm font-bold transition-all bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200"
      >
        <Languages className="w-4 h-4 text-brand-500" />
        <span>{currentLanguage?.name}</span>
        <ChevronDown className={clsx("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-3 w-48 max-h-[70vh] overflow-y-auto rounded-2xl shadow-elevated bg-white border border-brand-100 z-20 py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="px-3 py-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50 mb-1">
               {dict?.common?.selectLanguage || 'Select Language'}
            </div>
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={redirectedPathname(lang.code)}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center justify-between px-4 py-3 text-sm transition-all",
                  currentLocale === lang.code 
                    ? "bg-brand-50 text-brand-700 font-black border-r-4 border-brand-500" 
                    : "text-neutral-800 font-bold hover:bg-neutral-50 hover:pl-5"
                )}
              >
                <span>{lang.name}</span>
                {currentLocale === lang.code && (
                   <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
