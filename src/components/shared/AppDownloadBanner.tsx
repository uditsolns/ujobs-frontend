/**
 * App Download Banner Component
 * Call-to-action for app downloads with store badges - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import AppMockup from './AppMockup';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface AppDownloadBannerProps {
  dict: any;
  variant?: 'default' | 'compact' | 'fullwidth';
  showMockup?: boolean;
  androidUrl?: string;
  iosUrl?: string;
  className?: string;
}

export default function AppDownloadBanner({ 
  dict,
  variant = 'default', 
  showMockup = true, 
  androidUrl = 'https://play.google.com/store/apps/details?id=com.ujobsindia',
  iosUrl = 'https://apps.apple.com/in/app/ujobs-india/id6741137870',
  className = '' 
}: AppDownloadBannerProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-brand-gradient rounded-3xl p-8 shadow-brand ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Icon name="smartphone" size="xl" className="text-white" />
            </div>
            <div className="text-white">
              <h3 className="font-display font-bold text-2xl mb-1">{dict.footer.downloadApp}</h3>
              <p className="text-brand-50 font-medium opacity-90">{dict.footer.appDesc}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <AppStoreBadge store="ios" size="sm" href={iosUrl} dict={dict} />
            <AppStoreBadge store="android" size="sm" href={androidUrl} dict={dict} />
          </div>
        </div>
      </div>
    );
  }

  // Fullwidth and Default now share a more consistent, friendly look
  return (
    <div className={`bg-white rounded-4xl border border-neutral-100 shadow-elevated p-10 md:p-20 relative overflow-hidden ${className}`}>
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50/50 rounded-l-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-secondary-50/50 rounded-full blur-3xl -z-10" />

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Badge variant="brand" className="mb-6 bg-brand-500 text-white border-none px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">{dict.appBanner.mobileApp}</Badge>
          <h3 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tight text-neutral-900 leading-[1.1]" dangerouslySetInnerHTML={{ __html: dict.appBanner.title }} />
          <p className="text-lg md:text-xl text-neutral-500 mb-10 leading-relaxed font-medium max-w-xl">
            {dict.appBanner.description}
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {[
              dict.appBanner.features.directChat,
              dict.appBanner.features.documentAccess,
              dict.appBanner.features.jobAlerts,
              dict.appBanner.features.securePayments,
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-neutral-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                  <Icon name="checkCircle" size="sm" />
                </div>
                <span className="text-sm" dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <AppStoreBadge store="ios" href={iosUrl} dict={dict} />
            <AppStoreBadge store="android" href={androidUrl} dict={dict} />
          </div>
        </div>

        {showMockup && (
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-gradient rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <AppMockup className="max-w-md relative z-10 drop-shadow-2xl transform transition-transform group-hover:rotate-1 group-hover:scale-105 duration-700" />
          </div>
        )}
      </div>
    </div>
  );
}

// App Store Badge Component
interface AppStoreBadgeProps {
  dict: any;
  store: 'ios' | 'android';
  size?: 'sm' | 'md';
  href?: string;
  className?: string;
}

export function AppStoreBadge({ dict, store, size = 'md', href, className = '' }: AppStoreBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-6 py-3' : 'px-8 py-4';
  
  const commonClasses = `inline-flex items-center gap-3 rounded-2xl transition-all duration-300 shadow-soft hover:shadow-lg hover:-translate-y-1 ${sizeClasses} ${className}`;
  
  const badges = {
    ios: (
      <Link
        href={href || '#'}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        className={`${commonClasses} bg-neutral-900 text-white hover:bg-black`}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
        </svg>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-bold uppercase opacity-70 mb-1">{dict.appBanner.downloadOn}</span>
          <span className="text-sm font-black">{dict.appBanner.appStore}</span>
        </div>
      </Link>
    ),
    android: (
      <Link
        href={href || '#'}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        className={`${commonClasses} bg-white border border-neutral-100 text-neutral-900 hover:border-brand-500`}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
        </svg>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-bold uppercase opacity-70 mb-1">{dict.appBanner.getItOn}</span>
          <span className="text-sm font-black text-neutral-900">{dict.appBanner.googlePlay}</span>
        </div>
      </Link>
    ),
  };

  return badges[store];
}
