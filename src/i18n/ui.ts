import { Locale } from "../utils/types";

export const languages = {
  [Locale.EN]: 'en_US',
  [Locale.NL]: 'nl_NL',
};

export const defaultLocale = Locale.NL;

export const ui = {
  en: {
    "banner.legacy": "Join the Legacy!",
   
  },
  nl: {
    "banner.legacy": "Sluit je aan bij de Erfenis!",
  },
} as const;
