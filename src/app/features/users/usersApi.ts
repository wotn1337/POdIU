import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { METHOD, PaginationParams, WithMessage } from "app/types";
import {
  CreateUserData,
  CreateUserResponse,
  GetUsersResponse,
  UpdateUserData,
  UserTags,
} from "./types";

export const getUsersApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getUsers: builder.query<GetUsersResponse, PaginationParams>({
    query: ({ page, per_page }) =>
      `api/v1/users?page=${page}&per_page=${per_page}`,
    providesTags: UserTags,
  }),
  createUser: builder.mutation<CreateUserResponse, CreateUserData>({
    query: (body) => ({
      url: "api/v1/users/create",
      method: METHOD.POST,
      body,
    }),
    invalidatesTags: UserTags,
  }),
  updateUser: builder.mutation<CreateUserResponse, UpdateUserData>({
    query: ({ id, ...body }) => ({
      url: `api/v1/users/${id}`,
      method: METHOD.PATCH,
      body,
    }),
    invalidatesTags: UserTags,
  }),
  deleteUser: builder.mutation<WithMessage, number>({
    query: (id) => ({
      url: `api/v1/users/${id}/delete`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: UserTags,
  }),
});
