import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { METHOD, WithMessage } from "app/types";
import {
  CreateRoleData,
  RoleTags,
  RolesResponse,
  CreateRoleResponse,
  UpdateRoleData,
} from "./types";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: getBaseQuery("api/v1/roles"),
  tagTypes: RoleTags,
  endpoints: (builder) => ({
    getRoles: builder.query<RolesResponse["roles"], void>({
      query: () => "",
      providesTags: RoleTags,
      transformResponse: (response: RolesResponse) => response.roles,
    }),
    createRole: builder.mutation<CreateRoleResponse, CreateRoleData>({
      query: (body) => ({
        url: "/create",
        method: METHOD.POST,
        body,
      }),
      invalidatesTags: RoleTags,
    }),
    updateRole: builder.mutation<CreateRoleResponse, UpdateRoleData>({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: METHOD.PATCH,
        body,
      }),
      invalidatesTags: RoleTags,
    }),
    deleteRole: builder.mutation<WithMessage, number>({
      query: (id) => ({
        url: `/${id}/delete`,
        method: METHOD.DELETE,
      }),
      invalidatesTags: RoleTags,
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
