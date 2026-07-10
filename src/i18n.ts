export const i18n = {
  defaultLocale: 'en',
  locales: [
    'en',
    'hi',
    'mr',
    'ta',
    'te',
    'bn',
    'kn',
    'gu',
    'pa',
    'ne',
    'ml',
    'or',
  ],
} as const;

export type Locale = (typeof i18n)['locales'][number];

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  hi: () => import('./dictionaries/hi.json').then((module) => module.default),
  mr: () => import('./dictionaries/mr.json').then((module) => module.default),
  ta: () => import('./dictionaries/ta.json').then((module) => module.default),
  te: () => import('./dictionaries/te.json').then((module) => module.default),
  bn: () => import('./dictionaries/bn.json').then((module) => module.default),
  kn: () => import('./dictionaries/kn.json').then((module) => module.default),
  gu: () => import('./dictionaries/gu.json').then((module) => module.default),
  pa: () => import('./dictionaries/pa.json').then((module) => module.default),
  ne: () => import('./dictionaries/ne.json').then((module) => module.default),
  ml: () => import('./dictionaries/ml.json').then((module) => module.default),
  or: () => import('./dictionaries/or.json').then((module) => module.default),
} as const;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const dictionaryLoader = dictionaries[locale as keyof typeof dictionaries];
  if (!dictionaryLoader) {
    console.error(`Dictionary not found for locale: ${locale}, falling back to 'en'`);
    return dictionaries.en();
  }
  return dictionaryLoader() as Promise<Dictionary>;
};
