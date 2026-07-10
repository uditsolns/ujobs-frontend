/**
 * Background Patterns Component
 * Decorative background patterns and gradients
 */

import React from 'react';

interface BackgroundPatternProps {
  variant?: 'dots' | 'grid' | 'waves' | 'gradient' | 'mesh';
  className?: string;
  opacity?: number;
}

export default function BackgroundPattern({ variant = 'dots', className = '', opacity = 0.1 }: BackgroundPatternProps) {
  const patterns = {
    dots: (
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="currentColor" opacity={opacity} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    
    grid: (
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity={opacity} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    ),
    
    waves: (
      <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="currentColor"
          opacity={opacity}
        />
      </svg>
    ),
    
    gradient: (
      <div className="w-full h-full bg-gradient-to-br from-brand-50 via-secondary-50 to-brand-50/30" style={{ opacity }} />
    ),
    
    mesh: (
      <div className="w-full h-full" style={{ opacity }}>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-400/20 to-secondary-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-200/20 to-secondary-200/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-100/20 to-secondary-100/20 blur-3xl" />
      </div>
    ),
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {patterns[variant]}
    </div>
  );
}

// Floating Shapes Background
export function FloatingShapes({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
}

// Hero Gradient Background
export function HeroGradient({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000" />
    </div>
  );
}
