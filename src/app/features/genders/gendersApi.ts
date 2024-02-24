import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { Gender, GetGendersResponse } from "./types";

export const getGendersApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getGenders: builder.query<Gender[], void>({
    query: () => "api/v1/genders",
    transformResponse: (response: GetGendersResponse) => response.genders,
  }),
});
