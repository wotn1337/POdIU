import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { METHOD } from "app/types";
import { LoginResponse, LoginUserData, LogoutResponse } from "./types";

export const getAuthApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
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
});
