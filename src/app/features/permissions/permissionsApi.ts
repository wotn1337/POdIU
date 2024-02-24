import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { PermissionTags, PermissionsResponse } from "./types";

export const getPermissionsApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getPermissions: builder.query<PermissionsResponse["permissions"], void>({
    query: () => "api/v1/dormitories",
    providesTags: PermissionTags,
    transformResponse: (response: PermissionsResponse) => response.permissions,
  }),
});
