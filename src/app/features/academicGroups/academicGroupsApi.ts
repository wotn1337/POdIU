import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { AcademicGroup, GetAcademicGroupsResponse } from "./types";

export const getAcademicGroupsApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getAcademicGroups: builder.query<AcademicGroup[], void>({
    query: () => "",
    transformResponse: (response: GetAcademicGroupsResponse) =>
      response.academic_groups,
  }),
});
