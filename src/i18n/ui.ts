import { Locale } from "../utils/types";

export const languages = {
  [Locale.EN]: 'en_US',
  [Locale.NL]: 'nl_NL',
};

export const defaultLocale = Locale.NL;

export const ui = {
  en: {
    "aboutus": "About us",
    "trainings": "Trainings",
    "location": "Location",
    "contactus": "Contact us",
    "gallery": "Gallery",
    "joinus": "Join us!",
    "banner.legacy": "Join the Legacy!",
    "banner.bePartOf": "Be part of our",
    "banner.baseball": "Baseball",
    "banner.team": "team",
    "banner.experience": "Experience the thrill of baseball, camaraderie, and community spirit. Your journey starts here.",
    "aboutus.title": "Who are we?",
    "aboutus.description": "Parkstad Lions is the baseball and softball club for Parkstad and the surrounding Dutch and German region. Everybody, young and old, boys and girls with all nationalities is welcome to join practice on our fields in Heerlen.",
   
  },
  nl: {
    "aboutus": "Over ons",
    "trainings": "Trainingen",
    "location": "Locatie",
    "contactus": "Neem contact met ons op",
    "gallery": "Galerij",
    "joinus": "Sluit je bij ons aan!",
    "banner.legacy": "Sluit je aan bij de Erfenis!",
    "banner.bePartOf": "Maak deel uit van onze",
    "banner.baseball": "Honkbal",
    "banner.team": "team",
    "banner.experience": "Ervaar de spanning van honkbal, kameraadschap en gemeenschapszin. Je reis begint hier.",
    "aboutus.title": "Wie zijn wij?",
    "aboutus.description": "Parkstad Lions is de honkbal en softbalvereniging van Parkstad en de omliggende Nederlandse en Duitse regio. Iedereen, jong en oud, jongens en meisjes van alle nationaliteiten, is welkom om te trainen op onze velden in Heerlen.",
  },
} as const;
