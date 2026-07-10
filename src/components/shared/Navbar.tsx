'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Smartphone, ShieldCheck } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Locale } from '@/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Button from '../ui/Button';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants/routes';

import { useAuth } from '@/contexts/AuthContext';

export const Navbar = ({ locale, dict }: { locale: Locale, dict: any }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper for localized links
  const l = (path: string) => `/${locale}${path.startsWith('/') ? path : `/${path}`}`;

  const navLinks = [
    { name: dict.common.findJobs, href: ROUTES.jobs.list },
    { name: dict.common.hireCandidates, href: ROUTES.candidates.list },
    { name: dict.common.downloadApp, href: ROUTES.download.home },
  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
      scrolled ? "bg-white/98 backdrop-blur-xl shadow-brand py-3" : "bg-white/50 backdrop-blur-md py-6"
    )}>
      <nav className="container-custom">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={l(ROUTES.home)} className="flex-shrink-0 flex items-center group py-1">
              <div className={clsx(
                "relative w-32 md:w-40 h-10 md:h-12 flex items-center justify-center transform transition-all group-hover:scale-105"
              )}>
                <Image 
                  src="/logo.png" 
                  alt="Ujobs India" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            
            <div className="hidden lg:ml-12 lg:flex lg:items-center lg:space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={l(link.href)} 
                  className={clsx(
                    "px-5 py-2 text-sm font-bold rounded-full transition-all",
                    "text-slate-900 hover:text-brand-500 hover:bg-brand-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center space-x-8">
            <LanguageSwitcher currentLocale={locale} dict={dict} />
          </div>

          <div className="flex items-center lg:hidden gap-4">
            <LanguageSwitcher currentLocale={locale} dict={dict} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-500 bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="lg:hidden bg-white rounded-3xl shadow-elevated border border-brand-100 mt-4 overflow-hidden py-8 px-6 absolute left-4 right-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={l(link.href)} 
                    className="block px-6 py-4 text-center text-sm font-bold text-slate-900 hover:text-brand-500 hover:bg-brand-50 rounded-2xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
