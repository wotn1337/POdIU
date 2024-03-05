import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { message } from "antd";
import { Cookies } from "react-cookie";
import { isObject } from "utils";
import { logout } from "../auth/authSlice";

export const getBaseQuery = () => {
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");

      const c = new Cookies();
      const token = c.get("XSRF-TOKEN");
      headers.set("X-Xsrf-Token", token);

      return headers;
    },
  });

  return async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {}
  ) => {
    const { data, error } = await baseQuery(args, api, extraOptions);
    if (error) {
      if (error.status === 401) {
        const csrf = await baseQuery("/sanctum/csrf-cookie", api, extraOptions);
        if (csrf.data) {
          return await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      }
      return { error: { status: error.status, data: error.data } };
    }

    if (isObject(data) && data?.message && typeof data?.message === "string") {
      message.success(data.message);
    }

    return { data };
  };
};
