/**
 * Utility Functions
 * Reusable helper functions
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with clsx
 * Handles conditional classes and removes duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalizes first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes each word in a string
 */
export function capitalizeWords(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Converts string to slug format
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncates string to specified length
 */
export function truncate(str: string, length: number): string {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Strips HTML tags from a string
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  // Basic regex for stripping tags - works for simple cases on server/client
  return html.replace(/<[^>]*>?/gm, '');
}

/**
 * Formats a number with Indian numbering system
 */
export function formatIndianNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Sleep function for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely parse JSON
 */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

/**
 * Check if code is running on client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if code is running on server side
 */
export const isServer = !isClient;

/**
 * Encodes a numeric ID to a non-obvious string
 */
const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const OFFSET = 12345;

export function encodeId(num: number | string): string {
  let n = typeof num === 'string' ? parseInt(num, 10) : num;
  if (isNaN(n)) return String(num);
  
  n = n + OFFSET;
  let id = '';
  while (n > 0) {
    id = CHARSET[n % 62] + id;
    n = Math.floor(n / 62);
  }
  return id;
}

/**
 * Decodes an obfuscated string ID back to a numeric ID
 */
export function decodeId(id: string): number {
  if (!id) return 0;
  
  // Extract the first segment if it's a hyphenated slug (e.g. "gK5-priya-sharma" -> "gK5")
  const actualId = id.includes('-') ? id.split('-')[0] : id;

  if (actualId.length < 2) return parseInt(actualId, 10);
  
  // If it's purely numeric, it's probably already decoded or old URL
  if (/^\d+$/.test(actualId)) return parseInt(actualId, 10);

  let num = 0;
  for (let i = 0; i < actualId.length; i++) {
    const index = CHARSET.indexOf(actualId[i]);
    if (index === -1) return parseInt(actualId, 10); // Fallback
    num = num * 62 + index;
  }
  
  const decoded = num - OFFSET;
  return decoded > 0 ? decoded : parseInt(actualId, 10);
}

/**
 * Get base URL based on environment
 */
export function getBaseUrl(): string {
  if (isServer) {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }
  return window.location.origin;
}
