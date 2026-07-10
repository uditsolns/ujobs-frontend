/**
 * JobFilters Component
 * Dynamic job filtering - all options from API
 * No hardcoded filters
 */

'use client';

import React from 'react';
import { X } from 'lucide-react';
import type { WorkType, Location } from '@/types';
import Button from '@/components/ui/Button';

interface JobFiltersProps {
  categories: WorkType[];
  locations: Location[];
  selectedCategory?: number;
  selectedLocation?: number;
  onCategoryChange: (categoryId: number | undefined) => void;
  onLocationChange: (locationId: number | undefined) => void;
  onClearFilters: () => void;
}

export default function JobFilters({
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  onCategoryChange,
  onLocationChange,
  onClearFilters,
}: JobFiltersProps) {
  const hasActiveFilters = selectedCategory || selectedLocation;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-brand-600"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={selectedCategory || ''}
          onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        >
          <option value="">All Categories</option>
          {categories
            .filter((cat) => cat.status === 'Active')
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          value={selectedLocation || ''}
          onChange={(e) => onLocationChange(e.target.value ? Number(e.target.value) : undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        >
          <option value="">All Locations</option>
          {locations
            .filter((loc) => loc.status === 'Active')
            .map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
        </select>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                {categories.find((c) => c.id === selectedCategory)?.name || 'Category'}
                <button
                  onClick={() => onCategoryChange(undefined)}
                  className="ml-1.5 hover:text-brand-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedLocation && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                {locations.find((l) => l.id === selectedLocation)?.name || 'Location'}
                <button
                  onClick={() => onLocationChange(undefined)}
                  className="ml-1.5 hover:text-brand-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
