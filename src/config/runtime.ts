/**
 * Runtime Configuration Loader
 * Loads config.json at runtime - no rebuild required for changes
 */

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
 * Load configuration from public/config.json
 * Caches result for performance
 */
export async function loadConfig(): Promise<AppConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    if (typeof window === 'undefined') {
      // Server-side: read from filesystem
      const fs = await import('fs/promises');
      const path = await import('path');
      const configPath = path.join(process.cwd(), 'public', 'config.json');
      const fileContent = await fs.readFile(configPath, 'utf-8');
      cachedConfig = JSON.parse(fileContent);
    } else {
      // Client-side: use fetch
      const response = await fetch('/config.json');
      if (!response.ok) {
        throw new Error('Failed to load config');
      }
      cachedConfig = await response.json();
    }
    return cachedConfig!;
  } catch (error) {
    console.error('Error loading config:', error);
    // Return default config as fallback
    return getDefaultConfig();
  }
}

/**
 * Get config synchronously (use only after initial load)
 */
export function getConfig(): AppConfig {
  if (!cachedConfig) {
    throw new Error('Config not loaded. Call loadConfig() first.');
  }
  return cachedConfig;
}

/**
 * Reload configuration (clears cache)
 */
export async function reloadConfig(): Promise<AppConfig> {
  cachedConfig = null;
  return loadConfig();
}

/**
 * Default configuration (fallback)
 */
function getDefaultConfig(): AppConfig {
  return {
    api: {
      baseURL: 'https://ujobsindia.com/aayusha-backend/public/api/v1',
      timeout: 30000,
      retryAttempts: 3,
    },
    app: {
      name: 'Ujobs India',
      tagline: "India's Trusted Job Platform",
      defaultLanguage: 'en',
      supportedLanguages: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'kn', 'gu', 'pa', 'ne', 'ml', 'or'],
      itemsPerPage: 20,
      imageBaseURL: 'https://ujobsindia.com/aayusha-backend/storage',
      storageBaseURL: 'https://ujobsindia.com/aayusha-backend/public/storage',
    },
    features: {
      showCandidates: true,
      enableAuth: true,
      showRatings: true,
      enableChat: false,
      showSalary: true,
      showDocuments: false,
      enableNotifications: false,
    },
    seo: {
      revalidate: {
        homepage: 300,
        jobDetail: 600,
        candidateDetail: 600,
        seoPages: 3600,
      },
      enableMultilingualSEO: true,
      defaultMetaImage: '/images/og-image.jpg',
    },
    analytics: {
      googleAnalyticsId: '',
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
      address: 'Mumbai, Maharashtra, India',
    },
    social: {
      facebook: 'https://facebook.com/ujobsindia',
      twitter: 'https://twitter.com/ujobsindia',
      instagram: 'https://instagram.com/ujobsindia',
      linkedin: 'https://linkedin.com/company/ujobsindia',
      youtube: '',
    },
    auth: {
      enableSocialLogin: false,
      sessionTimeout: 86400000,
      tokenStorageKey: 'ujobs_auth_token',
    },
  };
}

/**
 * Get image URL with base path
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  
  const config = cachedConfig || getDefaultConfig();
  return `${config.app.storageBaseURL}/${path}`;
}

/**
 * Get app download URL based on user agent
 */
export function getAppDownloadUrl(): string {
  const config = cachedConfig || getDefaultConfig();
  const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  if (isAndroid) return config.appStore.android;
  if (isIOS) return config.appStore.ios;
  return config.appStore.android; // Default to Android
}
