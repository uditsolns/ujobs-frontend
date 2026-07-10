/**
 * Button Component
 * Reusable button with multiple variants - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import { cn } from '@/lib/utils/string';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'brand-outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variants = {
      primary:
        'bg-brand-500 text-white shadow-brand hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5',
      secondary:
        'bg-secondary-500 text-white shadow-soft hover:bg-secondary-600 hover:shadow-lg hover:-translate-y-0.5',
      outline:
        'border-2 border-neutral-200 text-neutral-700 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50',
      'brand-outline':
        'border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white hover:shadow-brand',
      ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
      danger:
        'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-sm font-bold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
