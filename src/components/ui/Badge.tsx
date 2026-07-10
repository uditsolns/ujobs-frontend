/**
 * Badge Component
 * Small status indicator - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import { cn } from '@/lib/utils/string';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold rounded-full whitespace-nowrap';

    const variants = {
      default: 'bg-neutral-100 text-neutral-600',
      success: 'bg-success-100 text-success-700',
      warning: 'bg-brand-50 text-brand-700',
      error: 'bg-red-100 text-red-700',
      info: 'bg-brand-100 text-brand-700',
      brand: 'bg-brand-100 text-brand-700',
      secondary: 'bg-slate-100 text-slate-700',
      outline: 'bg-transparent border border-neutral-200 text-neutral-600',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-[10px] uppercase tracking-wider',
      md: 'px-3 py-1 text-xs uppercase tracking-wider',
      lg: 'px-4 py-1.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
