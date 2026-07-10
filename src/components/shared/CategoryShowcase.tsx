'use client';

/**
 * Category Showcase Component
 * Display job categories with icons and counts - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import Link from 'next/link';
import Icon, { getCategoryIcon } from '@/components/ui/Icon';
import VibrantIcon, { VibrantTheme } from '@/components/ui/VibrantIcon';
import Card from '@/components/ui/Card';
import { ROUTES, l } from '@/lib/constants/routes';

interface Category {
  id: number;
  name: string;
  slug: string;
  count?: number;
  icon?: string;
  image?: string | null;
}

interface CategoryShowcaseProps {
  categories: Category[];
  variant?: 'grid' | 'carousel' | 'list';
  showCount?: boolean;
  limit?: number;
  locale?: string;
  className?: string;
  onCategoryClick?: (categoryName: string) => void;
}

const themeRotation: VibrantTheme[] = ['saffron', 'emerald', 'sky', 'rose', 'amber', 'indigo', 'gold', 'magenta'];

export default function CategoryShowcase({
  categories,
  variant = 'grid',
  showCount = true,
  limit,
  locale = 'en',
  className = '',
  onCategoryClick
}: CategoryShowcaseProps) {
  // Use categories as provided, they should already have correct image URLs from page.tsx
  const displayCategories = limit ? categories.slice(0, limit) : categories;

  const handleClick = (e: React.MouseEvent, category: Category) => {
    if (onCategoryClick) {
      e.preventDefault();
      onCategoryClick(category.name);
    }
  };

  const getCategoryLink = (category: Category) => {
    // Standardize slug generation to match ROUTES.category.detail
    // The slug should be the name converted to lowercase with dashes
    const categorySlug = category.slug || category.name.toLowerCase().replace(/ /g, '-');
    return l(ROUTES.category.detail(categorySlug), locale);
  };

  if (variant === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {displayCategories.map((category, idx) => {
          const hasValidImage = category.image && 
            category.image !== '/images/default.png' && 
            !category.image.includes('undefined') && 
            !category.image.includes('default');

          return (
            <Link
              key={`${category.id}-${idx}`}
              href={getCategoryLink(category)}
              onClick={(e) => handleClick(e, category)}
              className="block group"
            >
              <Card 
                variant="interactive" 
                padding="md" 
                className="flex items-center justify-between border-2 border-neutral-100 shadow-lg hover:shadow-xl hover:shadow-brand-500/10 rounded-2xl group-hover:border-brand-400 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  {hasValidImage && (
                    <div className="w-20 h-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                      <div className="w-full h-full rounded-xl overflow-hidden shadow-md border-2 border-neutral-100 group-hover:border-brand-300 transition-all">
                        <img 
                          src={category.image as string} 
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-neutral-900 text-lg group-hover:text-brand-600 transition-colors block mb-1">
                      {category.name}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {category.count && category.count > 0 
                        ? `${category.count} active listings` 
                        : 'Trusted professionals available'}
                    </span>
                  </div>
                </div>
                {showCount && (
                  <span className="text-sm font-bold text-neutral-400 bg-brand-50 px-5 py-2.5 rounded-full group-hover:bg-brand-100 group-hover:text-brand-600 transition-all border border-brand-100">
                    {category.count && category.count > 0 ? `${category.count}+` : 'Premium'}
                  </span>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 ${className}`}>
      {displayCategories.map((category, idx) => {
        const hasValidImage = category.image && 
          category.image !== '/images/default.png' && 
          !category.image.includes('undefined') && 
          !category.image.includes('default');

        return (
          <Link
            key={`${category.id}-${idx}`}
            href={getCategoryLink(category)}
            onClick={(e) => handleClick(e, category)}
            className="group"
          >
            <Card 
              variant="interactive" 
              padding="sm" 
              className="text-center h-full flex flex-col items-center justify-between border-2 border-neutral-100 bg-white group-hover:border-brand-400 shadow-lg hover:shadow-xl hover:shadow-brand-500/10 rounded-3xl p-6 transition-all duration-500 group-hover:-translate-y-1 transform min-h-[180px]"
            >
              {/* Category Image */}
              {hasValidImage && (
                <div className="mb-4 transition-all group-hover:scale-110 duration-500">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-neutral-100 group-hover:border-brand-300 transition-all">
                    <img 
                      src={category.image as string} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              )}
              
              {/* Category Name */}
              <h3 className="font-bold text-neutral-900 text-base mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors px-1 leading-tight">
                {category.name}
              </h3>
              
              {/* Count Badge */}
              {showCount && (
                <div className="mt-auto w-full">
                  <p className="text-xs font-black text-brand-600 uppercase tracking-wider bg-brand-50 px-4 py-2 rounded-full border border-brand-100 group-hover:bg-brand-100 transition-colors">
                    {category.count && category.count > 0 ? `${category.count}+ Available` : 'Premium'}
                  </p>
                </div>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

// Popular categories data based on Play Store categories
export const popularCategories = [
  { id: 1, name: 'Nurses & Patient Care', slug: 'nurses-patient-care', count: 5000 },
  { id: 2, name: 'Patient Caretakers', slug: 'patient-caretakers', count: 3500 },
  { id: 3, name: 'Domestic Maids & Cooks', slug: 'domestic-maids-cooks', count: 4200 },
  { id: 4, name: 'Professional Drivers', slug: 'professional-drivers', count: 6000 },
  { id: 5, name: 'Housekeeping Staff', slug: 'housekeeping-staff', count: 3000 },
  { id: 6, name: 'Nannies & Babysitters', slug: 'nannies-babysitters', count: 2800 },
  { id: 7, name: 'Elderly Care', slug: 'elderly-care', count: 2500 },
  { id: 8, name: 'Private Drivers', slug: 'private-drivers', count: 2200 },
  { id: 9, name: 'Home Nurses', slug: 'home-nurses', count: 3200 },
  { id: 10, name: 'Office Assistants', slug: 'office-assistants', count: 4000 },
  { id: 11, name: 'Delivery Partners', slug: 'delivery-partners', count: 3800 },
  { id: 12, name: 'Security Guards', slug: 'security-guards', count: 2600 },
];
