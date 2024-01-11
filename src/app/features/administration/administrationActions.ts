import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "app/api";
import { PaginationParams, WithMessage } from "app/types";
import {
  CreateRoleData,
  CreateRoleResponse,
  CreateUserData,
  CreateUserResponse,
  GetUserResponse,
  PermissionsResponse,
  RolesResponse,
} from "./types";

export const getUsers = createAsyncThunk<GetUserResponse, PaginationParams>(
  "administration/getUsers",
  async ({ page, per_page }) => {
    const response = await axiosInstance.get<GetUserResponse>(
      `/api/v1/users?page=${page}&per_page=${per_page}`
    );
    return response.data;
  }
);

export const createUser = createAsyncThunk<CreateUserResponse, CreateUserData>(
  "administration/createUser",
  async (data) => {
    const response = await axiosInstance.post<CreateUserResponse>(
      "/api/v1/users/create",
      data
    );
    return response.data;
  }
);

export const editUser = createAsyncThunk<CreateUserResponse, CreateUserData>(
  "administration/editUser",
  async ({ id, ...data }) => {
    const response = await axiosInstance.patch<CreateUserResponse>(
      `/api/v1/users/${id}`,
      data
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk<WithMessage, number>(
  "administration/deleteUser",
  async (id) => {
    const response = await axiosInstance.delete<CreateUserResponse>(
      `/api/v1/users/${id}/delete`
    );
    return response.data;
  }
);

export const getPermissions = createAsyncThunk<PermissionsResponse>(
  "administration/gerPermissions",
  async () => {
    const response = await axiosInstance.get<PermissionsResponse>(
      "/api/v1/permissions"
    );
    return response.data;
  }
);

export const createRole = createAsyncThunk<CreateRoleResponse, CreateRoleData>(
  "administration/createRole",
  async (data) => {
    const response = await axiosInstance.post<CreateRoleResponse>(
      "/api/v1/roles/create",
      data
    );
    return response.data;
  }
);

export const getRoles = createAsyncThunk<RolesResponse>(
  "administration/getRoles",
  async () => {
    const response = await axiosInstance.get<RolesResponse>(`/api/v1/roles`);
    return response.data;
  }
);

export const deleteRole = createAsyncThunk<WithMessage, number>(
  "administration/deleteRole",
  async (id) => {
    const response = await axiosInstance.delete<WithMessage>(
      `/api/v1/roles/${id}/delete`
    );
    return response.data;
  }
);
