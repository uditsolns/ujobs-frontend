/**
 * Page Skeleton Loaders
 * Full page loading states for different page types
 */

import React from 'react';
import { ShimmerGrid, ShimmerJobCard, ShimmerCandidateCard, ShimmerCategoryCard } from './Shimmer';
import Shimmer from './Shimmer';

/**
 * Jobs Page Skeleton
 */
export const JobsPageSkeleton: React.FC = () => (
  <div className="bg-neutral-50 min-h-screen py-16 animate-fade-in">
    <div className="container-custom">
      {/* Search Section Skeleton */}
      <div className="mb-12">
        <Shimmer variant="card" height={80} className="shadow-soft" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar Skeleton */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-6">
            <Shimmer variant="rectangular" height={400} />
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1">
          <div className="mb-10">
            <Shimmer variant="text" width="60%" height={36} className="mb-2" />
            <Shimmer variant="text" width="40%" height={20} />
          </div>
          
          <ShimmerGrid count={6} variant="job" />

          {/* Pagination Skeleton */}
          <div className="flex justify-center gap-4 mt-16">
            <Shimmer variant="rectangular" width={100} height={44} />
            <Shimmer variant="rectangular" width={100} height={44} />
          </div>
        </main>
      </div>
    </div>
  </div>
);

/**
 * Candidates Page Skeleton
 */
export const CandidatesPageSkeleton: React.FC = () => (
  <div className="bg-neutral-50 min-h-screen py-16 animate-fade-in">
    <div className="container-custom">
      {/* Search Section Skeleton */}
      <div className="mb-12">
        <Shimmer variant="card" height={80} className="shadow-soft" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar Skeleton */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-6">
            <Shimmer variant="rectangular" height={500} />
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1">
          <div className="mb-10">
            <Shimmer variant="text" width="60%" height={36} className="mb-2" />
            <Shimmer variant="text" width="40%" height={20} />
          </div>
          
          <ShimmerGrid count={8} variant="candidate" />

          {/* Pagination Skeleton */}
          <div className="flex justify-center gap-4 mt-16">
            <Shimmer variant="rectangular" width={100} height={44} />
            <Shimmer variant="rectangular" width={100} height={44} />
          </div>
        </main>
      </div>
    </div>
  </div>
);

/**
 * Job Detail Page Skeleton
 */
export const JobDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50 pb-12 animate-fade-in">
    {/* Navigation Bar Skeleton */}
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="container-custom py-4 flex items-center justify-between">
        <Shimmer variant="rectangular" width={120} height={36} />
        <Shimmer variant="circular" width={36} height={36} />
      </div>
    </div>

    <div className="container-custom mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-neutral-100">
            <div className="flex items-center gap-6 mb-8">
              <Shimmer variant="rectangular" width={80} height={80} />
              <div className="flex-1 space-y-3">
                <Shimmer variant="text" width="60%" height={32} />
                <Shimmer variant="text" width="40%" height={20} />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Shimmer key={i} variant="text" height={40} />
              ))}
            </div>

            <Shimmer variant="text" lines={8} />
          </div>

          <div className="bg-white rounded-3xl p-8 border border-neutral-100">
            <Shimmer variant="text" width="40%" height={24} className="mb-6" />
            <Shimmer variant="text" lines={6} />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-100 sticky top-24">
            <Shimmer variant="rectangular" height={200} className="mb-4" />
            <Shimmer variant="rectangular" height={56} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Candidate Detail Page Skeleton
 */
export const CandidateDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50 pb-12 animate-fade-in">
    {/* Navigation Bar Skeleton */}
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="container-custom py-4 flex items-center justify-between">
        <Shimmer variant="rectangular" width={120} height={36} />
        <Shimmer variant="circular" width={36} height={36} />
      </div>
    </div>

    <div className="container-custom mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-neutral-100">
            <div className="flex items-start gap-8 mb-8">
              <Shimmer variant="circular" width={160} height={160} />
              <div className="flex-1 space-y-3">
                <Shimmer variant="text" width="60%" height={32} />
                <Shimmer variant="text" width="40%" height={20} />
                <div className="flex gap-2 mt-4">
                  <Shimmer variant="rectangular" width={80} height={28} />
                  <Shimmer variant="rectangular" width={100} height={28} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-100 mb-8">
              {[1, 2, 3].map((i) => (
                <Shimmer key={i} variant="text" height={40} />
              ))}
            </div>

            <Shimmer variant="text" width="40%" height={24} className="mb-4" />
            <div className="flex flex-wrap gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Shimmer key={i} variant="rectangular" width={100} height={36} />
              ))}
            </div>

            <Shimmer variant="text" lines={6} />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-100 sticky top-24">
            <Shimmer variant="rectangular" height={200} className="mb-4" />
            <Shimmer variant="rectangular" height={56} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Homepage Skeleton
 */
export const HomepageSkeleton: React.FC = () => (
  <div className="min-h-screen bg-neutral-50 animate-fade-in">
    {/* Hero Section Skeleton */}
    <div className="bg-gradient-to-br from-brand-600 to-brand-700 text-white py-20">
      <div className="container-custom text-center">
        <Shimmer variant="text" width="60%" height={48} className="mb-4 mx-auto bg-white/20" animated={false} />
        <Shimmer variant="text" width="40%" height={24} className="mb-8 mx-auto bg-white/20" animated={false} />
        <Shimmer variant="rectangular" width={300} height={56} className="mx-auto bg-white/20" animated={false} />
      </div>
    </div>

    {/* Stats Section Skeleton */}
    <div className="container-custom py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center">
            <Shimmer variant="text" width="60%" height={48} className="mb-2 mx-auto" />
            <Shimmer variant="text" width="40%" height={20} className="mx-auto" />
          </div>
        ))}
      </div>
    </div>

    {/* Categories Section Skeleton */}
    <div className="container-custom py-16">
      <Shimmer variant="text" width="40%" height={36} className="mb-8 mx-auto" />
      <ShimmerGrid count={12} variant="category" />
    </div>

    {/* Featured Jobs Skeleton */}
    <div className="container-custom py-16">
      <Shimmer variant="text" width="40%" height={36} className="mb-8 mx-auto" />
      <ShimmerGrid count={6} variant="job" />
    </div>
  </div>
);

/**
 * Generic Loading State
 */
export const GenericSkeleton: React.FC<{ type?: 'list' | 'detail' | 'grid' }> = ({ type = 'list' }) => {
  if (type === 'detail') {
    return <JobDetailSkeleton />;
  }

  if (type === 'grid') {
    return (
      <div className="container-custom py-16 animate-fade-in">
        <ShimmerGrid count={12} variant="category" />
      </div>
    );
  }

  return (
    <div className="container-custom py-16 animate-fade-in">
      <ShimmerGrid count={6} variant="job" />
    </div>
  );
};

export default {
  JobsPageSkeleton,
  CandidatesPageSkeleton,
  JobDetailSkeleton,
  CandidateDetailSkeleton,
  HomepageSkeleton,
  GenericSkeleton,
};
