import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { Country, GetCountriesResponse } from "./types";

export const getCountriesApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getCountries: builder.query<Country[], void>({
    query: () => "api/v1/countries",
    transformResponse: (response: GetCountriesResponse) => response.countries,
  }),
});
