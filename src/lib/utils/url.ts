/**
 * URL Utilities
 * Helper functions for URL manipulation
 */

/**
 * Build URL with query parameters
 */
export function buildUrl(base: string, params: Record<string, any>): string {
  const url = new URL(base, window?.location?.origin || 'http://localhost:3000');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
}

/**
 * Get query parameter from URL
 */
export function getQueryParam(param: string): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Get all query parameters as object
 */
export function getAllQueryParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

/**
 * Create canonical URL
 */
export function createCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujobsindia.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}

/**
 * Get the base URL for images from environment or config
 */
function getImageBaseUrl(): string {
  // Use NEXT_PUBLIC_IMAGE_BASE_URL from .env if available
  if (process.env.NEXT_PUBLIC_IMAGE_BASE_URL) {
    return process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  }

  if (typeof window !== 'undefined' && (window as any).__IMAGE_BASE_URL__) {
    return (window as any).__IMAGE_BASE_URL__;
  }
  
  // Default for production - direct storage access
  return 'https://ujobsindia.com/aayusha-backend/storage/app/public';
}

/**
 * Fix and format API image URLs with better error handling
 */
export function getApiImageUrl(url: string | null | undefined, fallback: string = '/images/default.png'): string {
  if (!url || url === 'image' || url === 'null' || url === 'undefined') return fallback;
  
  // If it's already a full valid URL, return it as-is
  if (url.startsWith('http')) {
    return url;
  }

  // Clean the incoming path
  let cleanPath = url.trim();
  
  // Remove leading slashes
  cleanPath = cleanPath.replace(/^\/+/, '');
  
  // Get the base URL
  const baseUrl = getImageBaseUrl();
  
  // If the path doesn't contain a folder structure (just a filename), 
  // we assume it's in the 'Images' folder (common for categories/work-types)
  if (!cleanPath.includes('/')) {
    return `${baseUrl}/Images/${cleanPath}`;
  }
  
  // If it already has a folder like 'WorkerImage/', just append it to baseUrl
  return `${baseUrl}/${cleanPath}`;
}

/**
 * Get optimized image URL with size parameters
 */
export function getOptimizedImageUrl(
  url: string | null | undefined, 
  options?: { 
    width?: number; 
    height?: number; 
    quality?: number;
    fallback?: string;
  }
): string {
  const baseUrl = getApiImageUrl(url, options?.fallback);
  
  // For future optimization: add query params for image resizing
  // Currently returns base URL, can be enhanced with CDN params
  const params = new URLSearchParams();
  if (options?.width) params.append('w', options.width.toString());
  if (options?.height) params.append('h', options.height.toString());
  if (options?.quality) params.append('q', options.quality.toString());
  
  // Return URL with params if any exist
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}

/**
 * Get placeholder/blur image (low quality placeholder)
 */
export function getImagePlaceholder(url: string | null | undefined): string {
  // Return a data URL for blur placeholder
  // In production, this could fetch a tiny version of the image
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==';
}

/**
 * Validate if image URL is accessible
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Check if URL is external
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
}
