import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { PermissionTags, PermissionsResponse } from "./types";

export const getPermissionsApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getPermissions: builder.query<PermissionsResponse["permissions"], void>({
    query: () => "api/v1/permissions",
    providesTags: PermissionTags,
    transformResponse: (response: PermissionsResponse) => response.permissions,
  }),
});
