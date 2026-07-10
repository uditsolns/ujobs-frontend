/**
 * Header Component
 * Main navigation header
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Smartphone, UserSearch, Briefcase, Info, Phone, Languages, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ROUTES, l } from '@/lib/constants/routes';
import Button from '@/components/ui/Button';
import { clsx } from 'clsx';
import { i18n, Locale } from '@/i18n';

import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Extract locale from pathname (e.g., /en/jobs -> en)
  const locale = (pathname?.split('/')[1] || 'en') as Locale;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname?.split('/') || [];
    segments[1] = newLocale;
    router.push(segments.join('/') || `/${newLocale}`);
    setLangOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Jobs', href: ROUTES.jobs.list, icon: Briefcase },
    { name: 'Candidates', href: '/candidates', icon: UserSearch },
    { name: 'Employers', href: ROUTES.employer.home, icon: UserSearch },
    { name: 'About', href: ROUTES.about, icon: Info },
    { name: 'Contact', href: ROUTES.contact, icon: Phone },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.includes(path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 py-4 pointer-events-auto">
      <header 
        className={clsx(
          "w-full max-w-7xl transition-all duration-500",
          isScrolled 
            ? "bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2rem] py-2 px-6" 
            : "bg-white border border-slate-100 rounded-3xl py-4 px-8 shadow-xl shadow-slate-200/40"
        )}
      >
        <nav className="mx-auto" aria-label="Top">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href={l(ROUTES.home, locale)} className="flex items-center space-x-3 group py-1">
                <div className="relative w-32 md:w-40 h-10 md:h-12 transform transition-transform group-hover:scale-105">
                  <Image 
                    src="/logo.png" 
                    alt="Ujobs India" 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:bg-slate-50 border border-slate-100 rounded-2xl p-1 lg:space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={l(item.href, locale)}
                  className={clsx(
                    "px-4 py-2.5 text-sm font-extrabold rounded-xl transition-all duration-300",
                    isActive(item.href)
                      ? "text-white bg-brand-600 shadow-lg shadow-brand-500/20"
                      : "text-slate-700 hover:text-brand-600 hover:bg-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-extrabold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-xl transition-all"
                >
                  <Languages className="w-4 h-4 mr-1 text-brand-600" />
                  <span className="uppercase">{locale}</span>
                  <ChevronDown className={clsx("w-3 h-3 transition-transform", langOpen && "rotate-180")} />
                </button>

                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-[90]" onClick={() => setLangOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-neutral-100 rounded-2xl shadow-2xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="py-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={clsx(
                              "w-full text-left px-4 py-2 text-sm font-bold hover:bg-brand-50 transition-colors",
                              locale === lang.code ? "text-brand-600 bg-brand-50/50" : "text-slate-900"
                            )}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Link href={l(ROUTES.download.home, locale)}>
                <Button variant="ghost" size="sm" className="hidden lg:flex font-bold uppercase tracking-widest text-[10px] text-secondary-900 hover:text-brand-500">
                  <Smartphone className="mr-2 h-4 w-4" />
                  App
                </Button>
              </Link>
              <Link href={l(ROUTES.jobs.list, locale)}>
                <Button size="md" className="rounded-xl px-8 bg-secondary-500 hover:bg-secondary-600 text-white font-bold transition-all duration-300 shadow-xl shadow-secondary-500/20">
                  Find Work
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl p-3 text-slate-900 hover:bg-brand-50 hover:text-brand-600 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pb-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={l(item.href, locale)}
                    className={clsx(
                      "flex items-center px-5 py-4 text-base font-black rounded-2xl transition-all",
                      isActive(item.href)
                        ? "text-white bg-brand-600"
                        : "text-slate-900 hover:bg-brand-50 hover:text-brand-600"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-4 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <Link href={l(ROUTES.download.home, locale)} onClick={() => setMobileMenuOpen(false)}>
                  <Button fullWidth variant="outline" size="lg" className="rounded-2xl border-2 font-bold">
                    App
                  </Button>
                </Link>
                <Link href={l(ROUTES.jobs.list, locale)} onClick={() => setMobileMenuOpen(false)}>
                  <Button fullWidth size="lg" className="rounded-2xl font-bold bg-slate-900">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
