import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { Country, GetCountriesResponse } from "./types";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: getBaseQuery("api/v1/countries"),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => "",
      transformResponse: (response: GetCountriesResponse) => response.countries,
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
