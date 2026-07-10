'use client';

/**
 * VibrantIcon Component
 * Custom visual element tailored for the Indian audience.
 * Combines Lucide icons with vibrant gradients and organic SVG shapes.
 */

import React from 'react';
import Icon, { IconName } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export type VibrantTheme = 'saffron' | 'emerald' | 'sky' | 'rose' | 'amber' | 'indigo' | 'gold' | 'magenta';

interface VibrantIconProps {
  name: IconName;
  theme?: VibrantTheme;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

const themeStyles: Record<VibrantTheme, { bg: string; icon: string; shadow: string; blob: string }> = {
  saffron: {
    bg: 'bg-gradient-to-br from-orange-400 to-red-500',
    icon: 'text-white',
    shadow: 'shadow-orange-200',
    blob: 'fill-orange-100',
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-400 to-teal-600',
    icon: 'text-white',
    shadow: 'shadow-emerald-200',
    blob: 'fill-emerald-100',
  },
  sky: {
    bg: 'bg-gradient-to-br from-sky-400 to-blue-600',
    icon: 'text-white',
    shadow: 'shadow-sky-200',
    blob: 'fill-sky-100',
  },
  rose: {
    bg: 'bg-gradient-to-br from-rose-400 to-pink-600',
    icon: 'text-white',
    shadow: 'shadow-rose-200',
    blob: 'fill-rose-100',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-300 to-orange-500',
    icon: 'text-white',
    shadow: 'shadow-amber-200',
    blob: 'fill-amber-100',
  },
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-400 to-purple-600',
    icon: 'text-white',
    shadow: 'shadow-indigo-200',
    blob: 'fill-indigo-100',
  },
  gold: {
    bg: 'bg-gradient-to-br from-yellow-300 to-amber-500',
    icon: 'text-white',
    shadow: 'shadow-yellow-200',
    blob: 'fill-yellow-100',
  },
  magenta: {
    bg: 'bg-gradient-to-br from-fuchsia-400 to-magenta-600',
    icon: 'text-white',
    shadow: 'shadow-fuchsia-200',
    blob: 'fill-fuchsia-100',
  },
};

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
};

const iconSizeMap = {
  sm: 18,
  md: 24,
  lg: 32,
  xl: 48,
};

export default function VibrantIcon({
  name,
  theme = 'saffron',
  size = 'md',
  className = '',
  glow = false,
}: VibrantIconProps) {
  const styles = themeStyles[theme];

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Background Organic Blob Shape */}
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('absolute inset-0 w-full h-full transform scale-125 transition-transform group-hover:rotate-12 duration-700', styles.blob)}
      >
        <path
          d="M44.7,-76.4C58.2,-69.2,69.8,-57.4,77.6,-43.8C85.4,-30.1,89.5,-15.1,88.4,-0.6C87.3,13.9,81.1,27.8,72.4,39.9C63.7,51.9,52.4,62.1,39.5,70.1C26.5,78.1,13.3,83.9,-0.8,85.2C-14.8,86.5,-29.6,83.4,-42.9,75.6C-56.2,67.8,-68.1,55.3,-76.4,41.1C-84.7,26.8,-89.5,10.9,-88.6,-4.8C-87.7,-20.5,-81.1,-36.1,-71,-49C-61,-61.8,-47.5,-71.9,-33.2,-78.7C-18.9,-85.5,-3.8,-89,10.6,-87.1C25,-85.2,31.2,-83.5,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Main Icon Container */}
      <div
        className={cn(
          'relative z-10 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3',
          styles.bg,
          glow && styles.shadow,
          glow && 'shadow-xl',
          sizeClasses[size]
        )}
      >
        <Icon name={name} size={iconSizeMap[size]} className={styles.icon} strokeWidth={2.5} />
      </div>

      {/* Subtle Accent Dots */}
      <div className={cn("absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-50", styles.bg)} />
      <div className={cn("absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-30", styles.bg)} />
    </div>
  );
}
