/**
 * Language Configuration
 * Defines all supported languages with metadata
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
  region: string;
}

export const LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    region: 'India',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'North India',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'Maharashtra',
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'Tamil Nadu',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'Andhra Pradesh, Telangana',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'West Bengal',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'Karnataka',
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'Gujarat',
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'Punjab',
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    dir: 'ltr',
    flag: '🇳🇵',
    region: 'Nepal, North India',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'Kerala',
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'Odisha',
  },
];

export const DEFAULT_LANGUAGE = 'en';

export function getLanguage(code: string): Language | undefined {
  return LANGUAGES.find((lang) => lang.code === code);
}

export function isValidLanguage(code: string): boolean {
  return LANGUAGES.some((lang) => lang.code === code);
}

export function getLanguageName(code: string): string {
  const lang = getLanguage(code);
  return lang?.nativeName || lang?.name || code;
}
