import { WithIdAndTitle } from "app/types";

export type Country = WithIdAndTitle;

export type GetCountriesResponse = {
  countries: Country[];
};
