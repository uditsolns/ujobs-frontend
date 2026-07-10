/**
 * Client-side Config Hook
 * Loads configuration from public/config.json for client components
 */

'use client';

import { useState, useEffect } from 'react';
import type { AppConfig } from '@/config/runtime';

// Default fallback config
const defaultConfig: AppConfig = {
  api: {
    baseURL: 'https://ujobsindia.com/aayusha-backend/public/api/v1',
    timeout: 30000,
    retryAttempts: 3,
  },
  app: {
    name: 'Ujobs India',
    tagline: "India's Fastest Hiring Platform",
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'kn', 'gu', 'pa', 'ne', 'ml', 'or'],
    itemsPerPage: 20,
    imageBaseURL: 'https://ujobsindia.com/storage',
    storageBaseURL: 'https://ujobsindia.com/storage',
  },
  features: {
    showCandidates: true,
    enableAuth: true,
    showRatings: true,
    enableChat: false,
    showSalary: true,
    showDocuments: true,
    enableNotifications: true,
  },
  seo: {
    revalidate: {
      homepage: 3600,
      jobDetail: 1800,
      candidateDetail: 1800,
      seoPages: 86400,
    },
    enableMultilingualSEO: true,
    defaultMetaImage: '/images/og-default.jpg',
  },
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    facebookPixelId: '',
    enableTracking: false,
  },
  appStore: {
    android: 'https://play.google.com/store/apps/details?id=com.ujobsindia',
    ios: 'https://apps.apple.com/in/app/ujobs-india/id6741137870',
    appName: 'Ujobs India',
    enableDeepLinks: true,
  },
  contact: {
    email: 'support@ujobsindia.com',
    phone: '+91-XXXXXXXXXX',
    whatsapp: '+91-XXXXXXXXXX',
    address: 'India',
  },
  social: {
    facebook: 'https://facebook.com/ujobsindia',
    twitter: 'https://twitter.com/ujobsindia',
    instagram: 'https://instagram.com/ujobsindia',
    linkedin: 'https://linkedin.com/company/ujobsindia',
    youtube: 'https://youtube.com/@ujobsindia',
  },
  auth: {
    enableSocialLogin: false,
    sessionTimeout: 86400,
    tokenStorageKey: 'ujobs_token',
  },
};

let cachedClientConfig: AppConfig | null = null;

/**
 * Hook to load and use configuration in client components
 */
export function useConfig() {
  const [config, setConfig] = useState<AppConfig>(cachedClientConfig || defaultConfig);
  const [isLoading, setIsLoading] = useState(!cachedClientConfig);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cachedClientConfig) {
      setConfig(cachedClientConfig);
      setIsLoading(false);
      return;
    }

    const loadConfig = async () => {
      try {
        const response = await fetch('/config.json');
        if (!response.ok) {
          throw new Error('Failed to load config');
        }
        const data = await response.json();
        cachedClientConfig = data;
        setConfig(data);
        setError(null);
      } catch (err) {
        console.error('Error loading config, using defaults:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setConfig(defaultConfig);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  return { config, isLoading, error };
}

/**
 * Synchronous config getter for client components
 * Returns cached config or default config
 */
export function getClientConfig(): AppConfig {
  return cachedClientConfig || defaultConfig;
}

/**
 * Get app download URL based on user agent (client-side only)
 */
export function getAppDownloadUrl(): string {
  const config = cachedClientConfig || defaultConfig;
  
  if (typeof navigator === 'undefined') {
    return config.appStore.android; // Server-side fallback
  }
  
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  if (isAndroid) return config.appStore.android;
  if (isIOS) return config.appStore.ios;
  return config.appStore.android; // Default to Android
}
