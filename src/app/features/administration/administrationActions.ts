import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "app/api";
import {
  CreateRoleData,
  CreateRoleResponse,
  CreateUserData,
  CreateUserResponse,
  PermissionsResponse,
  RolesResponse,
  User,
} from "./types";
import { WithMessage } from "app/types";

type Response = {
  users: User[];
};

export const getUsers = createAsyncThunk<User[]>(
  "administration/getUsers",
  async () => {
    const response = await axiosInstance.get<Response>("/api/v1/users");
    return response.data.users;
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
    const response = await axiosInstance.get<RolesResponse>("/api/v1/roles");
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
