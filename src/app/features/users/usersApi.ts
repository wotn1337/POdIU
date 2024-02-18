import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import {
  CreateUserData,
  CreateUserResponse,
  GetUsersResponse,
  UpdateUserData,
  UserTags,
} from "./types";
import { METHOD, PaginationParams, WithMessage } from "app/types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: getBaseQuery("api/v1/users"),
  tagTypes: UserTags,
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, PaginationParams>({
      query: ({ page, per_page }) => `?page=${page}&per_page=${per_page}`,
      providesTags: UserTags,
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserData>({
      query: (body) => ({
        url: "/create",
        method: METHOD.POST,
        body,
      }),
      invalidatesTags: UserTags,
    }),
    updateUser: builder.mutation<CreateUserResponse, UpdateUserData>({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: METHOD.PATCH,
        body,
      }),
      invalidatesTags: UserTags,
    }),
    deleteUser: builder.mutation<WithMessage, number>({
      query: (id) => ({
        url: `/${id}/delete`,
        method: METHOD.DELETE,
      }),
      invalidatesTags: UserTags,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi;
