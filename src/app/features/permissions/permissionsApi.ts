import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { PermissionTags, PermissionsResponse } from "./types";

export const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  baseQuery: getBaseQuery("api/v1/permissions"),
  tagTypes: PermissionTags,
  endpoints: (builder) => ({
    getPermissions: builder.query<PermissionsResponse["permissions"], void>({
      query: () => "",
      providesTags: PermissionTags,
      transformResponse: (response: PermissionsResponse) =>
        response.permissions,
    }),
  }),
});

export const { useGetPermissionsQuery } = permissionsApi;
