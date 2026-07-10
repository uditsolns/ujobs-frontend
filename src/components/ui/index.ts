/**
 * UI Components Index
 * Re-exports all UI components
 */

export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Badge } from './Badge';
export { default as Skeleton } from './Skeleton';
export { default as Pagination } from './Pagination';
export { default as OptimizedImage } from './OptimizedImage';
export { default as Shimmer, ShimmerGrid, ShimmerJobCard, ShimmerCandidateCard, ShimmerCategoryCard } from './Shimmer';
export { default as LoadingSpinner, PageLoader, ContentLoader, ButtonLoader } from './LoadingSpinner';
export { default as ErrorBoundary, ImageErrorFallback, DataErrorFallback } from './ErrorBoundary';
export { JobsPageSkeleton, CandidatesPageSkeleton, JobDetailSkeleton, CandidateDetailSkeleton, HomepageSkeleton, GenericSkeleton } from './PageSkeletons';

export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
export type { InputProps } from './Input';
export type { BadgeProps } from './Badge';
export type { SkeletonProps } from './Skeleton';
export type { OptimizedImageProps } from './OptimizedImage';
export type { ShimmerProps } from './Shimmer';
export type { LoadingSpinnerProps } from './LoadingSpinner';
