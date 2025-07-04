import { Locale } from '../utils/types';
import { ui, defaultLocale } from './ui';

export function getLocaleFromUrl(url: URL) {
  const [, locale] = url.pathname.split('/');
  if (Object.values(Locale).includes(locale as Locale)) return locale as Locale;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: keyof typeof ui[typeof defaultLocale]) {
    return ui[locale][key] || ui[defaultLocale][key];
  }
}