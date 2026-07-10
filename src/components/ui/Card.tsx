/**
 * Card Component
 * Reusable card container - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import { cn } from '@/lib/utils/string';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive' | 'brand';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-2xl overflow-hidden';

    const variants = {
      default: 'border border-neutral-100 shadow-soft',
      elevated: 'border border-neutral-100/50 shadow-elevated',
      bordered: 'border border-neutral-200',
      brand: 'border border-brand-100 bg-brand-50/30',
      interactive:
        'border border-neutral-100 shadow-soft hover:shadow-soft hover:border-brand-500/30 transition-all duration-300 cursor-pointer',
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4 sm:p-5',
      lg: 'p-5 sm:p-6',
      xl: 'p-6 sm:p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
