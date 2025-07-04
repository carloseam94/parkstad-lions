export enum Locale {
  EN = 'en',
  NL = 'nl',
}

export type TrainingCard = {
  name: string;
  ageGroup: string;
  image: string;
  trainingDays: string;
  description: string[];
  coaches: { name: string; phone: string;}[];
}