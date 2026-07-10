/**
 * Input Component
 * Reusable form input - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import { cn } from '@/lib/utils/string';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseInputStyles =
      'w-full px-5 py-3 bg-white border rounded-2xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all disabled:bg-neutral-50 disabled:cursor-not-allowed shadow-subtle';

    const inputStyles = error
      ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500'
      : 'border-neutral-200 focus:border-brand-500';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 px-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            className={cn(
              baseInputStyles,
              inputStyles,
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              className
            )}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-xs font-medium text-red-600 px-1">{error}</p>}
        
        {helperText && !error && (
          <p className="mt-2 text-xs text-neutral-400 px-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
