/**
 * Feature Card Component
 * Display features with icons and descriptions - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import Icon, { IconName } from '@/components/ui/Icon';
import Card from '@/components/ui/Card';

interface Feature {
  icon: IconName;
  title: string;
  description: string;
  color?: string;
}

interface FeatureCardProps {
  feature: Feature;
  variant?: 'default' | 'hover' | 'minimal';
  className?: string;
}

export function FeatureCard({ feature, variant = 'default', className = '' }: FeatureCardProps) {
  if (variant === 'minimal') {
    return (
      <div className={`flex items-start gap-5 ${className}`}>
        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${feature.color || 'bg-brand-50 text-brand-600'}`}>
          <Icon name={feature.icon} size="md" />
        </div>
        <div>
          <h3 className="font-bold text-neutral-900 mb-1">{feature.title}</h3>
          <p className="text-sm text-neutral-500 font-medium leading-relaxed">{feature.description}</p>
        </div>
      </div>
    );
  }

  return (
    <Card 
      variant={variant === 'hover' ? 'interactive' : 'default'} 
      padding="md" 
      className={`h-full group ${className}`}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${feature.color || 'bg-brand-50 text-brand-600'}`}>
        <Icon name={feature.icon} size="xl" />
      </div>
      <h3 className="text-xl font-display font-bold text-neutral-900 mb-3 group-hover:text-brand-600 transition-colors">{feature.title}</h3>
      <p className="text-neutral-500 font-medium leading-relaxed">{feature.description}</p>
    </Card>
  );
}

interface FeatureGridProps {
  features: Feature[];
  variant?: 'default' | 'hover' | 'minimal';
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function FeatureGrid({ features, variant = 'default', columns = 3, className = '' }: FeatureGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 sm:gap-8 ${className}`}>
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} variant={variant} />
      ))}
    </div>
  );
}

// Pre-defined feature sets
export const jobSeekerFeatures: Feature[] = [
  {
    icon: 'search',
    title: 'Easy Job Search',
    description: 'Find jobs that match your skills and location in seconds',
    color: 'bg-brand-50 text-brand-500'
  },
  {
    icon: 'zap',
    title: 'Quick Apply',
    description: 'Apply to multiple jobs with just one tap',
    color: 'bg-brand-50 text-brand-500'
  },
  {
    icon: 'bell',
    title: 'Instant Alerts',
    description: 'Get notified when new jobs match your preferences',
    color: 'bg-secondary-50 text-secondary-600'
  },
  {
    icon: 'shieldCheck',
    title: 'Trusted Jobs',
    description: 'All job postings are reviewed for authenticity',
    color: 'bg-success-50 text-success-600'
  },
  {
    icon: 'users',
    title: 'Direct Contact',
    description: 'Connect directly with employers via the app',
    color: 'bg-accent-light/10 text-accent'
  },
  {
    icon: 'award',
    title: 'Profile Boost',
    description: 'Complete your profile to stand out to employers',
    color: 'bg-brand-50 text-brand-500'
  },
];

export const employerFeatures: Feature[] = [
  {
    icon: 'users2',
    title: 'Large Talent Pool',
    description: 'Access to over 1M+ registered job seekers',
    color: 'bg-brand-50 text-brand-500'
  },
  {
    icon: 'target',
    title: 'Smart Matching',
    description: 'AI-powered candidate recommendations',
    color: 'bg-secondary-50 text-secondary-600'
  },
  {
    icon: 'clock',
    title: 'Fast Hiring',
    description: 'Hire qualified candidates within 24 hours',
    color: 'bg-success-50 text-success-600'
  },
  {
    icon: 'shieldCheck',
    title: 'Compliance Checked',
    description: 'All candidates undergo profile screening and compliance checks',
    color: 'bg-brand-50 text-brand-500'
  },
  {
    icon: 'dollar',
    title: 'Cost Effective',
    description: 'Affordable pricing for businesses of all sizes',
    color: 'bg-accent-light/10 text-accent'
  },
  {
    icon: 'headphones',
    title: '24/7 Support',
    description: 'Dedicated support team to help you',
    color: 'bg-brand-50 text-brand-500'
  },
];
