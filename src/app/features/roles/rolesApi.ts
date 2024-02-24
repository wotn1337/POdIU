import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { METHOD, WithMessage } from "app/types";
import {
  CreateRoleData,
  CreateRoleResponse,
  RoleTags,
  RolesResponse,
  UpdateRoleData,
} from "./types";

export const getRolesApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getRoles: builder.query<RolesResponse["roles"], void>({
    query: () => "api/v1/roles",
    providesTags: RoleTags,
    transformResponse: (response: RolesResponse) => response.roles,
  }),
  createRole: builder.mutation<CreateRoleResponse, CreateRoleData>({
    query: (body) => ({
      url: "api/v1/roles/create",
      method: METHOD.POST,
      body,
    }),
    invalidatesTags: RoleTags,
  }),
  updateRole: builder.mutation<CreateRoleResponse, UpdateRoleData>({
    query: ({ id, ...body }) => ({
      url: `api/v1/roles/${id}`,
      method: METHOD.PATCH,
      body,
    }),
    invalidatesTags: RoleTags,
  }),
  deleteRole: builder.mutation<WithMessage, number>({
    query: (id) => ({
      url: `api/v1/roles/${id}/delete`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: RoleTags,
  }),
});
