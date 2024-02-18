import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { METHOD } from "app/types";
import { LoginResponse, LoginUserData, LogoutResponse } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: getBaseQuery(""),
  endpoints: (builder) => ({
    getCsrf: builder.query<void, void>({
      query: () => "sanctum/csrf-cookie",
    }),
    login: builder.mutation<LoginResponse, LoginUserData>({
      query: (body) => ({
        url: "spa/v1/login",
        method: METHOD.POST,
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => "spa/v1/logout",
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useLazyGetCsrfQuery } =
  authApi;
