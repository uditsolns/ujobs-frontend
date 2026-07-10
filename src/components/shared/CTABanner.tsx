/**
 * CTA Banner Component
 * Call-to-action banners for conversions - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Icon, { IconName } from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { ArrowRight, Smartphone, Users, Briefcase } from 'lucide-react';

interface CTABannerProps {
  variant?: 'primary' | 'secondary' | 'employer' | 'candidate';
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  icon?: IconName;
  image?: string;
  stats?: { label: string; value: string }[];
  className?: string;
}

export default function CTABanner({
  variant = 'primary',
  title,
  description,
  primaryAction,
  secondaryAction,
  icon,
  stats,
  className = ''
}: CTABannerProps) {
  const isDark = variant === 'primary' || variant === 'employer';

  return (
    <div className={`relative overflow-hidden rounded-4xl ${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900 border border-neutral-100'} py-24 px-8 md:px-20 ${className}`}>
      {/* Background blobs */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 opacity-30 ${isDark ? 'bg-brand-500/20' : 'bg-brand-50'}`} />
      <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl -z-10 opacity-30 ${isDark ? 'bg-secondary-500/20' : 'bg-secondary-50'}`} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {icon && (
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-12 shadow-lg transition-transform hover:scale-110 hover:rotate-3 ${isDark ? 'bg-neutral-800 text-brand-400' : 'bg-brand-50 text-brand-600'}`}>
            <Icon name={icon} size="xl" />
          </div>
        )}

        <h2 className="text-4xl md:text-7xl font-display font-black mb-8 tracking-tight text-balance">
          {title}
        </h2>

        {description && (
          <p className={`text-xl md:text-2xl ${isDark ? 'text-neutral-400' : 'text-neutral-500'} mb-16 max-w-2xl mx-auto font-medium leading-relaxed`}>
            {description}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-display font-black mb-2 tracking-tight text-brand-500 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {primaryAction && (
            <Link href={primaryAction.href}>
              <Button size="lg" variant={isDark ? 'primary' : 'primary'} className="h-16 px-12 text-lg shadow-2xl group">
                {primaryAction.label}
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
          {secondaryAction && (
            <Link href={secondaryAction.href}>
              <Button size="lg" variant="ghost" className={`h-16 px-12 text-lg ${isDark ? 'text-white hover:bg-white/10' : 'text-neutral-600 hover:bg-neutral-50 border border-neutral-100'}`}>
                {secondaryAction.label}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Compact inline CTA
export function InlineCTA({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <Card variant="brand" padding="sm" className={`border-l-4 border-l-brand-500 ${className}`}>
      {children}
    </Card>
  );
}

// Floating CTA button
export function FloatingCTA({ label, href, icon, className = '' }: { label: string; href: string; icon?: IconName; className?: string }) {
  return (
    <Link
      href={href}
      className={`fixed bottom-8 right-8 z-[90] flex items-center gap-3 px-8 py-4 bg-brand-gradient text-white rounded-full shadow-brand hover:shadow-elevated hover:scale-105 transition-all animate-slide-up ${className}`}
    >
      {icon && <Icon name={icon} size="md" />}
      <span className="font-bold">{label}</span>
    </Link>
  );
}

// Pre-defined CTA configurations
export const employerCTA = {
  variant: 'employer' as const,
  title: 'Ready to Hire Top Talent?',
  description: 'Post your job and get applications from trusted candidates within 24 hours. No hidden costs.',
  primaryAction: {
    label: 'Post a Job',
    href: '/hire'
  },
  secondaryAction: {
    label: 'View Candidates',
    href: '/candidates'
  },
  icon: 'users' as const,
  stats: [
    { label: 'Active Candidates', value: '1M+' },
    { label: 'Avg. Hire Time', value: '24hrs' },
    { label: 'Success Rate', value: '95%' }
  ]
};

export const candidateCTA = {
  variant: 'candidate' as const,
  title: 'Find Your Dream Job Today!',
  description: 'Join over 1 million job seekers and discover thousands of genuine opportunities across India.',
  primaryAction: {
    label: 'Download App',
    href: 'https://play.google.com/store/apps/details?id=com.ujobsindia'
  },
  secondaryAction: {
    label: 'Browse Jobs',
    href: '/jobs'
  },
  icon: 'briefcase' as const,
  stats: [
    { label: 'Active Jobs', value: '50K+' },
    { label: 'Companies', value: '5K+' },
    { label: 'Success Stories', value: '100K+' }
  ]
};
