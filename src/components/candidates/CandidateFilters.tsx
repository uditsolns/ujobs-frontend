/**
 * CandidateFilters Component
 * Filters for candidate search - 100% API-driven
 */

import { useState } from 'react';
import type { WorkType } from '@/types';

interface CandidateFiltersProps {
  categories: WorkType[];
  locations: string[];
  onFilterChange: (filters: {
    category?: number;
    location?: string;
    experience?: string;
    verified?: boolean;
  }) => void;
  dict?: any;
}

export default function CandidateFilters({ categories, locations, onFilterChange, dict = {} }: CandidateFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedExperience, setSelectedExperience] = useState<string | undefined>();
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const experienceOptions = [
    { value: 'fresher', label: 'Fresher' },
    { value: '0-2', label: '0-2 years' },
    { value: '2-5', label: '2-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' },
  ];

  const handleApplyFilters = () => {
    onFilterChange({
      category: selectedCategory,
      location: selectedLocation,
      experience: selectedExperience,
      verified: verifiedOnly,
    });
  };

  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedLocation(undefined);
    setSelectedExperience(undefined);
    setVerifiedOnly(false);
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat: any, idx: number) => (
              <option key={`${cat.id}-${idx}`} value={cat.id}>
                {cat.name}
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
            onChange={(e) => setSelectedLocation(e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <select
            value={selectedExperience || ''}
            onChange={(e) => setSelectedExperience(e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Any Experience</option>
            {experienceOptions.map((exp) => (
              <option key={exp.value} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
        </div>

        {/* Verified Filter */}
        <div className="flex items-end">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
            />
            <span className="ml-2 text-sm text-gray-700">{dict.candidatesList.verifiedOnly || 'Compliance Checked'}</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
