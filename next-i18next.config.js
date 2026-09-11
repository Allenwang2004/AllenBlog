module.exports = {
  i18n: {
    locales: ['en', 'zh-TW'],
    defaultLocale: 'en',
    // Always open in English. Without this Next redirects on the browser's
    // Accept-Language header, so a zh-TW browser never sees the default.
    localeDetection: false,
  },
};
