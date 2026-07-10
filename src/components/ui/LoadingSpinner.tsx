/**
 * Loading Spinner Component
 * Various loading indicators for different contexts
 */

import React from 'react';
import { cn } from '@/lib/utils/string';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'brand' | 'dots' | 'pulse' | 'spinner' | 'sparkle';
  className?: string;
  label?: string;
}

const sizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  label,
}) => {
  const sizeClass = sizes[size];

  // Default spinner with Loader2 icon
  if (variant === 'default' || variant === 'spinner') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
        <Loader2 className={cn(sizeClass, 'animate-spin text-brand-500')} />
        {label && <span className="text-sm text-neutral-600 font-medium">{label}</span>}
      </div>
    );
  }

  // Brand colored spinning loader
  if (variant === 'brand') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
        <RefreshCw className={cn(sizeClass, 'animate-spin text-brand-600')} />
        {label && <span className="text-sm text-brand-600 font-bold">{label}</span>}
      </div>
    );
  }

  // Sparkle animation
  if (variant === 'sparkle') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
        <Sparkles className={cn(sizeClass, 'animate-pulse text-amber-500')} />
        {label && <span className="text-sm text-neutral-600 font-medium">{label}</span>}
      </div>
    );
  }

  // Pulsing dots
  if (variant === 'pulse') {
    const dotSize = size === 'xs' || size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4';
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
        <div className="flex gap-2">
          <div className={cn(dotSize, 'rounded-full bg-brand-500 animate-pulse')} style={{ animationDelay: '0ms' }} />
          <div className={cn(dotSize, 'rounded-full bg-brand-500 animate-pulse')} style={{ animationDelay: '150ms' }} />
          <div className={cn(dotSize, 'rounded-full bg-brand-500 animate-pulse')} style={{ animationDelay: '300ms' }} />
        </div>
        {label && <span className="text-sm text-neutral-600 font-medium">{label}</span>}
      </div>
    );
  }

  // Three bouncing dots
  if (variant === 'dots') {
    const dotSize = size === 'xs' || size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4';
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
        <div className="flex gap-1">
          <div className={cn(dotSize, 'rounded-full bg-brand-500 animate-bounce')} style={{ animationDelay: '0ms' }} />
          <div className={cn(dotSize, 'rounded-full bg-brand-500 animate-bounce')} style={{ animationDelay: '150ms' }} />
          <div className={cn(dotSize, 'rounded-full bg-brand-500 animate-bounce')} style={{ animationDelay: '300ms' }} />
        </div>
        {label && <span className="text-sm text-neutral-600 font-medium">{label}</span>}
      </div>
    );
  }

  return null;
};

/**
 * Full Page Loading Overlay
 */
export const PageLoader: React.FC<{ label?: string }> = ({ label = 'Loading...' }) => (
  <div className="fixed inset-0 z-[150] flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-neutral-200 border-t-brand-500 animate-spin" />
        <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-r-brand-300 animate-spin" style={{ animationDuration: '1.5s' }} />
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-neutral-900 mb-1">{label}</p>
        <div className="flex gap-1 justify-center">
          <span className="h-1 w-1 rounded-full bg-brand-500 animate-pulse" />
          <span className="h-1 w-1 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="h-1 w-1 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Inline Content Loader
 */
export const ContentLoader: React.FC<{ label?: string; className?: string }> = ({ label, className }) => (
  <div className={cn('flex items-center justify-center py-12', className)}>
    <LoadingSpinner size="lg" variant="brand" label={label || 'Loading content...'} />
  </div>
);

/**
 * Button Loading State
 */
export const ButtonLoader: React.FC = () => (
  <Loader2 className="h-4 w-4 animate-spin" />
);

export default LoadingSpinner;
