'use client';

/**
 * Testimonial Component
 * User testimonials and success stories
 */

import React from 'react';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import { stripHtml } from '@/lib/utils/string';

interface Testimonial {
  name: string;
  role: string;
  company?: string;
  image?: string;
  rating: number;
  text: string;
  location?: string;
  verified?: boolean;
  date?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function TestimonialCard({ testimonial, variant = 'default', className = '' }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (variant === 'compact') {
    return (
      <div className={`p-5 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all group ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-sm border border-brand-100">
              {initials}
            </div>
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 bg-brand-500 text-white rounded-full p-0.5 shadow-sm">
                <Icon name="check" size="sm" className="w-2.5 h-2.5" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-neutral-900 text-sm truncate flex items-center gap-1">
              {testimonial.name}
            </div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold truncate">{testimonial.role}</div>
          </div>
          <div className="flex text-amber-400">
            <Icon name="star" size="sm" className="fill-current" />
            <span className="text-xs font-bold ml-1 text-neutral-700">{testimonial.rating}.0</span>
          </div>
        </div>
        <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed italic">"{stripHtml(testimonial.text)}"</p>
      </div>
    );
  }

  return (
    <div className={`p-8 bg-white rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-brand-500/[0.05] hover:border-brand-200 transition-all duration-500 relative group flex flex-col h-full ${className}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 p-8 text-neutral-50 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity">
        <Icon name="quote" size="xl" className="w-24 h-24" />
      </div>

      {/* Rating & Verified Badge */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size="sm"
              className={i < testimonial.rating ? 'fill-current' : 'text-neutral-200'}
            />
          ))}
        </div>
        {testimonial.verified && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Trusted User
          </div>
        )}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-neutral-700 mb-8 leading-relaxed text-lg font-medium italic relative z-10 flex-grow">
        "{stripHtml(testimonial.text)}"
      </blockquote>

      {/* User Info */}
      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-neutral-50">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/20 transform group-hover:rotate-3 transition-transform">
            {initials}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-black text-neutral-900 text-lg leading-tight">{testimonial.name}</div>
          <div className="text-sm text-neutral-500 font-medium">
            {testimonial.role}
            {testimonial.company && (
              <span className="text-brand-600"> @ {testimonial.company}</span>
            )}
          </div>
          {testimonial.location && (
            <div className="text-[10px] text-neutral-400 flex items-center mt-1 uppercase tracking-widest font-bold">
              <Icon name="mapPin" size="sm" className="mr-1 w-3 h-3" />
              {testimonial.location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  variant?: 'default' | 'compact' | 'marquee';
  columns?: 2 | 3;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export default function TestimonialGrid({ 
  testimonials, 
  variant = 'default', 
  columns = 3, 
  className = '',
  speed = 'normal'
}: TestimonialGridProps) {
  if (variant === 'marquee') {
    const speedMap = {
      slow: 'duration-[60s]',
      normal: 'duration-[40s]',
      fast: 'duration-[20s]'
    };

    return (
      <div className={`relative w-full overflow-hidden py-10 ${className}`}>
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={index} className="w-[350px] px-3">
              <TestimonialCard testimonial={testimonial} variant="compact" />
            </div>
          ))}
        </div>
        {/* Gradients to fade out edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee {
            animation: marquee linear infinite;
            animation-duration: ${speed === 'slow' ? '60s' : speed === 'fast' ? '20s' : '40s'};
          }
        `}</style>
      </div>
    );
  }

  const gridCols = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${gridCols} gap-8 ${className}`}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} variant={variant === 'compact' ? 'compact' : 'default'} />
      ))}
    </div>
  );
}

// Sample testimonials - Enhanced for real-case scenarios
export const sampleTestimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    role: 'Delivery Partner',
    rating: 5,
    text: 'I was looking for a job for 2 months. Within 3 days of joining Ujobs India, I got a job as a delivery partner in Mumbai. The daily payment system is very helpful.',
    location: 'Mumbai, Maharashtra',
    verified: true,
    date: '2 weeks ago'
  },
  {
    name: 'Priya Sharma',
    role: 'Talent Acquisition',
    company: 'Logistics Pro',
    rating: 5,
    text: 'Hiring for warehouse staff used to take weeks. With Ujobs, we get trusted candidates within hours. The quality of applicants is much higher than other platforms.',
    location: 'Bangalore, Karnataka',
    verified: true,
    date: '1 month ago'
  },
  {
    name: 'Vikram Singh',
    role: 'Security Supervisor',
    rating: 5,
    text: 'Found a job near my home in Delhi. The app helped me create a professional profile even though I don\'t have a resume. Very easy to use!',
    location: 'New Delhi',
    verified: true,
    date: '3 days ago'
  },
  {
    name: 'Sneha Patel',
    role: 'Telecalling Executive',
    rating: 4,
    text: 'I like how the app shows jobs only in my preferred language. I found a great role in Ahmedabad with a good salary and supportive team.',
    location: 'Ahmedabad, Gujarat',
    verified: true,
    date: '1 week ago'
  },
  {
    name: 'Anil Deshmukh',
    role: 'Warehouse Manager',
    company: 'QuickShip India',
    rating: 5,
    text: 'The dashboard for employers is very intuitive. We managed to hire 15 people for our new facility in just 10 days using Ujobs India.',
    location: 'Pune, Maharashtra',
    verified: true,
    date: '2 months ago'
  },
  {
    name: 'Kavita Reddy',
    role: 'Office Assistant',
    rating: 5,
    text: 'As a fresher, it was hard to find genuine jobs. Ujobs checked the employer, which made me feel safe. Now I have a stable job with PF benefits.',
    location: 'Hyderabad, Telangana',
    verified: true,
    date: '5 days ago'
  },
];

