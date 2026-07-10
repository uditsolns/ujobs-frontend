import React from 'react';
import { PageLoader } from '@/components/ui/LoadingSpinner';

/**
 * Global loading state for the localized app segment
 */
export default function Loading() {
  return <PageLoader label="Loading Ujobs India..." />;
}
