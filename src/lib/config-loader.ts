/**
 * Runtime Configuration Loader
 * Loads configuration from public/config.json at runtime
 */

import { siteConfig } from '@/config/site';

export interface AppConfig {
  api: {
    baseURL: string;
    timeout: number;
    retryAttempts: number;
  };
  app: {
    name: string;
    tagline: string;
    defaultLanguage: string;
    supportedLanguages: string[];
    itemsPerPage: number;
    imageBaseURL: string;
    storageBaseURL: string;
  };
  features: {
    showCandidates: boolean;
    enableAuth: boolean;
    showRatings: boolean;
    enableChat: boolean;
    showSalary: boolean;
    showDocuments: boolean;
    enableNotifications: boolean;
  };
  seo: {
    revalidate: {
      homepage: number;
      jobDetail: number;
      candidateDetail: number;
      seoPages: number;
    };
    enableMultilingualSEO: boolean;
    defaultMetaImage: string;
  };
  analytics: {
    googleAnalyticsId: string;
    facebookPixelId: string;
    enableTracking: boolean;
  };
  appStore: {
    android: string;
    ios: string;
    appName: string;
    enableDeepLinks: boolean;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  auth: {
    enableSocialLogin: boolean;
    sessionTimeout: number;
    tokenStorageKey: string;
  };
}

let cachedConfig: AppConfig | null = null;

/**
 * Fetches the configuration from public/config.json
 * Can be used in Server Components (filesystem) or Client Components (fetch)
 */
export async function getConfig(): Promise<AppConfig> {
  if (cachedConfig) return cachedConfig;

  try {
    // If running on server
    if (typeof window === 'undefined') {
      const fs = await import('fs/promises');
      const path = await import('path');
      const configPath = path.join(process.cwd(), 'public', 'config.json');
      const fileContent = await fs.readFile(configPath, 'utf-8');
      cachedConfig = JSON.parse(fileContent);
    } else {
      // If running on client
      const response = await fetch('/config.json');
      if (!response.ok) throw new Error('Failed to fetch config');
      cachedConfig = await response.json();
    }
  } catch (error) {
    console.error('Failed to load runtime config:', error);
  }

  return cachedConfig || ({} as AppConfig);
}

/**
 * Synchronous version for use in client components where useEffect isn't ideal
 * Note: This might return null if not loaded yet
 */
export function useConfig() {
  return cachedConfig;
}
