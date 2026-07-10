import React from 'react';
import { JobsPageSkeleton } from '@/components/ui/PageSkeletons';

/**
 * Loading state for Category × City Landing Page
 * Uses the JobsPageSkeleton for consistent layout during fetch
 */
export default function Loading() {
  return <JobsPageSkeleton />;
}
