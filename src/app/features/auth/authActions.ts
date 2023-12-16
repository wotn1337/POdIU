import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, getToken } from "app/api";
import {
  LoginResponse,
  LoginResponseWithEmail,
  LoginUserData,
  LogoutResponse,
} from "app/features/auth/types";

export const login = createAsyncThunk<LoginResponseWithEmail, LoginUserData>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await getToken();
      const response = await axiosInstance.post<
        LoginUserData,
        { data: LoginResponse }
      >("/spa/v1/login", {
        email,
        password,
      });
      sessionStorage.setItem("user", JSON.stringify({ email }));
      return { ...response.data, email };
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
