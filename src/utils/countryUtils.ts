import { COUNTRIES, Country } from "../data/countries";

export const getCountryByIso = (isoCode: string): Country | undefined =>
  COUNTRIES.find(c => c.isoCode === isoCode);

export const getCountryByDialCode = (dialCode: string): Country | undefined =>
  COUNTRIES.find(c => c.dialCode === dialCode);

export const getDefaultCountry = (): Country =>
  COUNTRIES.find(c => c.isoCode === 'IN')!;
