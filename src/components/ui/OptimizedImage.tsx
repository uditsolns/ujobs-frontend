'use client';

/**
 * Optimized Image Component
 * Enhanced Next.js Image with blur placeholder, loading states, and error handling
 */

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/string';
import { Loader2, ImageOff } from 'lucide-react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  priority?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  showLoader?: boolean;
  fallbackSrc?: string;
  onLoadingComplete?: () => void;
  onError?: () => void;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  auto: '',
};

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  aspectRatio = 'auto',
  priority = false,
  quality = 85,
  objectFit = 'cover',
  showLoader = true,
  fallbackSrc = '/images/placeholder.png',
  onLoadingComplete,
  onError,
}: OptimizedImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleLoadingComplete = () => {
    setLoading(false);
    onLoadingComplete?.();
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setError(false);
      setLoading(true);
    } else {
      onError?.();
    }
  };

  const containerClasses = cn(
    'relative overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200',
    aspectRatioClasses[aspectRatio],
    className
  );

  const imageClasses = cn(
    'transition-all duration-500 ease-out',
    loading ? 'scale-110 blur-lg opacity-0' : 'scale-100 blur-0 opacity-100',
    objectFit === 'cover' && 'object-cover',
    objectFit === 'contain' && 'object-contain',
    objectFit === 'fill' && 'object-fill',
    objectFit === 'none' && 'object-none',
    objectFit === 'scale-down' && 'object-scale-down'
  );

  if (error && !fallbackSrc) {
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
          <ImageOff className="h-8 w-8 mb-2" />
          <span className="text-xs font-medium">Failed to load</span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Loading Spinner */}
      {loading && showLoader && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-br from-neutral-100 to-neutral-200">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 text-brand-500 animate-spin" />
            <div className="h-1 w-16 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      )}

      {/* Shimmer Effect Background */}
      {loading && (
        <div className="absolute inset-0 z-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      )}

      {/* Actual Image */}
      {fill ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className={imageClasses}
          quality={quality}
          priority={priority}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          quality={quality}
          priority={priority}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
