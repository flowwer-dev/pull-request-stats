const i18n = require('i18n-js');
const locales = require('./locales');

const LOCALE = 'en-US';

i18n.translations = locales;
i18n.locale = LOCALE;
i18n.defaultLocale = LOCALE;
i18n.fallbacks = true;

module.exports = i18n;
