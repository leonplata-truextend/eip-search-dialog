export type IntlResources = { [key: string]: { [key: string]: string } };

export type Localize = (s: string) => string;

export const localizeFallback: Localize = () => '';
