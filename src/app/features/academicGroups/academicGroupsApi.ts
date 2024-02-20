import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { AcademicGroup, GetAcademicGroupsResponse } from "./types";

export const academicGroupsApi = createApi({
  reducerPath: "academicGroupsApi",
  baseQuery: getBaseQuery("api/v1/academic-groups"),
  endpoints: (builder) => ({
    getAcademicGroups: builder.query<AcademicGroup[], void>({
      query: () => "",
      transformResponse: (response: GetAcademicGroupsResponse) =>
        response.academic_groups,
    }),
  }),
});

export const { useGetAcademicGroupsQuery } = academicGroupsApi;
