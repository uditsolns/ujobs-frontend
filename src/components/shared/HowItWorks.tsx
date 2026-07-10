/**
 * How It Works Component
 * Step-by-step process visualization - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import Icon, { IconName } from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: IconName;
  color?: string;
}

interface HowItWorksProps {
  steps: Step[];
  variant?: 'horizontal' | 'vertical' | 'cards';
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function HowItWorks({ steps, variant = 'horizontal', title, subtitle, className = '' }: HowItWorksProps) {
  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">{title}</h2>}
          {subtitle && <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">{subtitle}</p>}
        </div>
      )}

      {variant === 'horizontal' && <HorizontalSteps steps={steps} />}
      {variant === 'vertical' && <VerticalSteps steps={steps} />}
      {variant === 'cards' && <CardSteps steps={steps} />}
    </div>
  );
}

function HorizontalSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      {/* Connection line */}
      <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-neutral-100 rounded-full" style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem' }} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
        {steps.map((step, index) => (
          <div key={index} className="text-center relative group">
            {/* Number Badge */}
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white text-lg font-black mb-6 ${step.color || 'bg-brand-500'} shadow-brand relative z-10 transform transition-transform group-hover:scale-110`}>
              {step.number}
            </div>
            
            {/* Icon Card */}
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 shadow-soft transition-all group-hover:shadow-elevated group-hover:-translate-y-1 ${step.color?.replace('bg-', 'bg-').replace('-500', '-50').replace('-600', '-50') || 'bg-brand-50'}`}>
              <Icon name={step.icon} size="xl" className={step.color?.replace('bg-', 'text-').replace('-600', '-500') || 'text-brand-500'} />
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
            <p className="text-neutral-500 text-sm font-medium leading-relaxed px-4">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerticalSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="max-w-2xl mx-auto space-y-12">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-8 group">
          {/* Number and line */}
          <div className="flex flex-col items-center">
            <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl ${step.color || 'bg-brand-500'} shadow-brand transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div className="w-1 flex-1 bg-neutral-100 rounded-full my-4" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 pb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-sm ${step.color?.replace('bg-', 'bg-').replace('-500', '-50').replace('-600', '-50') || 'bg-brand-50'}`}>
              <Icon name={step.icon} size="xl" className={step.color?.replace('bg-', 'text-').replace('-600', '-500') || 'text-brand-500'} />
            </div>
            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">{step.title}</h3>
            <p className="text-lg text-neutral-500 font-medium leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CardSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <Card key={index} variant="interactive" padding="md" className="relative pt-12">
          {/* Number badge */}
          <div className="absolute top-6 right-6 text-4xl font-display font-black text-neutral-100 group-hover:text-brand-100 transition-colors">
            0{step.number}
          </div>
          
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-sm transform transition-transform group-hover:scale-110 ${step.color?.replace('bg-', 'bg-').replace('-500', '-50').replace('-600', '-50') || 'bg-brand-50'}`}>
            <Icon name={step.icon} size="xl" className={step.color?.replace('bg-', 'text-').replace('-600', '-500') || 'text-brand-500'} />
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
          <p className="text-neutral-500 font-medium leading-relaxed">{step.description}</p>
        </Card>
      ))}
    </div>
  );
}

// Pre-defined step sets
export const jobSeekerSteps: Step[] = [
  {
    number: 1,
    title: 'Create Profile',
    description: 'Sign up and complete your profile with skills and experience',
    icon: 'userPlus',
    color: 'bg-brand-500'
  },
  {
    number: 2,
    title: 'Search Jobs',
    description: 'Browse thousands of trusted job listings in your area',
    icon: 'search',
    color: 'bg-secondary-500'
  },
  {
    number: 3,
    title: 'Apply Instantly',
    description: 'Apply to multiple jobs with just one tap',
    icon: 'zap',
    color: 'bg-accent'
  },
  {
    number: 4,
    title: 'Get Hired',
    description: 'Connect with employers and start your new job',
    icon: 'checkCircle',
    color: 'bg-success'
  },
];

export const employerSteps: Step[] = [
  {
    number: 1,
    title: 'Post Job',
    description: 'Create a job posting with requirements and details',
    icon: 'fileText',
    color: 'bg-brand-500'
  },
  {
    number: 2,
    title: 'Get Matches',
    description: 'Receive applications from qualified candidates',
    icon: 'users',
    color: 'bg-secondary-500'
  },
  {
    number: 3,
    title: 'Review Profiles',
    description: 'Check trusted profiles and shortlist candidates',
    icon: 'eye',
    color: 'bg-accent'
  },
  {
    number: 4,
    title: 'Hire Fast',
    description: 'Connect with selected candidates and hire quickly',
    icon: 'checkCircle',
    color: 'bg-success'
  },
];
