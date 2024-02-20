import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { Gender, GetGendersResponse } from "./types";

export const gendersApi = createApi({
  reducerPath: "gendersApi",
  baseQuery: getBaseQuery("api/v1/genders"),
  endpoints: (builder) => ({
    getGenders: builder.query<Gender[], void>({
      query: () => "",
      transformResponse: (response: GetGendersResponse) => response.genders,
    }),
  }),
});

export const { useGetGendersQuery } = gendersApi;
