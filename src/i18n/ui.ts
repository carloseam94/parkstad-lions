import { Locale } from "../utils/types";

export const languages = {
  [Locale.EN]: 'en_US',
  [Locale.NL]: 'nl_NL',
};

export const defaultLocale = Locale.NL;

export const ui = {
  en: {
    "joinus": "Join us",
    "banner.legacy": "Join the Legacy!",
    "banner.bePartOf": "Be part of our",
    "banner.baseball": "Baseball",
    "banner.team": "team",
    "banner.experience": "Experience the thrill of baseball, camaraderie, and community spirit. Your journey starts here."
   
  },
  nl: {
    "joinus": "sluit je bij ons aan",
    "banner.legacy": "Sluit je aan bij de Erfenis!",
    "banner.bePartOf": "Maak deel uit van onze",
    "banner.baseball": "Honkbal",
    "banner.team": "team",
    "banner.experience": "Ervaar de spanning van honkbal, kameraadschap en gemeenschapszin. Je reis begint hier."
  },
} as const;
