/**
 * next-i18next Configuration
 */

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'kn', 'gu', 'pa', 'ne', 'ml', 'or'],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
