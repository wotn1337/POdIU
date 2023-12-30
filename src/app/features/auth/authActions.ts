import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, getToken } from "app/api";
import {
  LoginResponse,
  LoginUserData,
  LogoutResponse,
} from "app/features/auth/types";
import { AxiosResponse } from "axios";

export const login = createAsyncThunk<LoginResponse, LoginUserData>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await getToken();
      const response = await axiosInstance.post<
        LoginUserData,
        AxiosResponse<LoginResponse>
      >("/spa/v1/login", {
        email,
        password,
      });
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<LogoutResponse>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<LogoutResponse>(
        "/spa/v1/logout"
      );
      sessionStorage.removeItem("user");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
