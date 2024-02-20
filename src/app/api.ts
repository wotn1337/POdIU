import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { Cookies } from "react-cookie";

export const getBaseQuery = (url: string) =>
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + url,
    credentials: "include",
    prepareHeaders: (headers) => {
      const c = new Cookies();
      const token = c.get("XSRF-TOKEN");
      headers.set("X-Xsrf-Token", token);
      return headers;
    },
  });

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
  },
});
