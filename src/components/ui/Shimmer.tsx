/**
 * Shimmer Loading Effect Component
 * Provides beautiful shimmer/skeleton loading states
 */

import React from 'react';
import { cn } from '@/lib/utils/string';

export interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'circular' | 'rectangular' | 'avatar' | 'thumbnail';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animated?: boolean;
}

const Shimmer = React.forwardRef<HTMLDivElement, ShimmerProps>(
  ({ className, variant = 'text', width, height, lines = 1, animated = true, ...props }, ref) => {
    const baseStyles = cn(
      'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%]',
      animated && 'animate-shimmer'
    );

    const variants = {
      text: 'h-4 rounded-md',
      card: 'h-64 rounded-2xl',
      circular: 'rounded-full',
      rectangular: 'rounded-xl',
      avatar: 'rounded-full',
      thumbnail: 'aspect-video rounded-lg',
    };

    const style = {
      width: width,
      height: height || (variant === 'circular' || variant === 'avatar' ? width : undefined),
    };

    // For multi-line text shimmer
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                baseStyles,
                variants.text,
                index === lines - 1 && 'w-3/4' // Last line is shorter
              )}
              style={index === 0 ? style : undefined}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        style={style}
        {...props}
      />
    );
  }
);

Shimmer.displayName = 'Shimmer';

/**
 * Pre-built Shimmer Components for Common Use Cases
 */

export const ShimmerJobCard = ({ className }: { className?: string }) => (
  <div className={cn('bg-white rounded-2xl p-6 border border-neutral-100', className)}>
    <div className="flex items-start gap-4 mb-4">
      <Shimmer variant="rectangular" width={56} height={56} />
      <div className="flex-1 space-y-3">
        <Shimmer variant="text" width="60%" height={24} />
        <Shimmer variant="text" width="40%" height={16} />
      </div>
    </div>
    <Shimmer variant="text" lines={3} className="mb-4" />
    <div className="flex gap-2">
      <Shimmer variant="rectangular" width={80} height={32} />
      <Shimmer variant="rectangular" width={100} height={32} />
      <Shimmer variant="rectangular" width={90} height={32} />
    </div>
  </div>
);

export const ShimmerCandidateCard = ({ className }: { className?: string }) => (
  <div className={cn('bg-white rounded-2xl p-6 border border-neutral-100', className)}>
    <div className="flex flex-col items-center text-center mb-4">
      <Shimmer variant="circular" width={80} height={80} className="mb-3" />
      <Shimmer variant="text" width="70%" height={20} className="mb-2" />
      <Shimmer variant="text" width="50%" height={16} />
    </div>
    <div className="space-y-2">
      <Shimmer variant="text" width="100%" />
      <Shimmer variant="text" width="90%" />
    </div>
    <div className="mt-4 flex gap-2 justify-center">
      <Shimmer variant="rectangular" width={60} height={24} />
      <Shimmer variant="rectangular" width={60} height={24} />
    </div>
  </div>
);

export const ShimmerCategoryCard = ({ className }: { className?: string }) => (
  <div className={cn('bg-white rounded-xl p-4 border border-neutral-100', className)}>
    <div className="flex items-center gap-3">
      <Shimmer variant="circular" width={48} height={48} />
      <div className="flex-1">
        <Shimmer variant="text" width="80%" height={18} className="mb-2" />
        <Shimmer variant="text" width="40%" height={14} />
      </div>
    </div>
  </div>
);

export const ShimmerGrid = ({ 
  count = 6, 
  variant = 'job',
  className 
}: { 
  count?: number; 
  variant?: 'job' | 'candidate' | 'category';
  className?: string;
}) => {
  const Component = variant === 'job' 
    ? ShimmerJobCard 
    : variant === 'candidate' 
    ? ShimmerCandidateCard 
    : ShimmerCategoryCard;

  return (
    <div className={cn(
      'grid gap-6',
      variant === 'job' && 'grid-cols-1 md:grid-cols-2',
      variant === 'candidate' && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      variant === 'category' && 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
      className
    )}>
      {Array.from({ length: count }).map((_, index) => (
        <Component key={index} />
      ))}
    </div>
  );
};

export default Shimmer;
