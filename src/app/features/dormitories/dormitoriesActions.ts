import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "app/api";
import { WithMessage } from "app/types";
import { AxiosResponse } from "axios";
import {
  CreateDormitory,
  CreateDormitoryResponse,
  CreateRoomData,
  CreateRoomResponse,
  GetDormRoomsParams,
  GetDormRoomsResponse,
  GetDormitoriesParams,
  GetDormitoriesResponse,
  UpdateDorm,
  UpdateRoomData,
} from "./types";

export const getDormitories = createAsyncThunk<
  GetDormitoriesResponse,
  GetDormitoriesParams
>("dormitories/getDormitories", async ({ per_page, page }) => {
  const response = await axiosInstance.get<
    GetDormitoriesParams,
    AxiosResponse<GetDormitoriesResponse>
  >(`/api/v1/dormitories?page=${page}&per_page=${per_page}`);
  return response.data;
});

export const deleteDormitory = createAsyncThunk<WithMessage, number>(
  "dormitories/deleteDormitory",
  async (id) => {
    const response = await axiosInstance.delete<WithMessage>(
      `/api/v1/dormitories/${id}/delete`
    );
    return response.data;
  }
);

export const updateDormitory = createAsyncThunk<
  CreateDormitoryResponse,
  UpdateDorm
>("dormitories/updateDormitory", async ({ id, ...data }) => {
  const response = await axiosInstance.patch<
    UpdateDorm,
    AxiosResponse<CreateDormitoryResponse>
  >(`/api/v1/dormitories/${id}`, data);
  return response.data;
});

export const createDormitory = createAsyncThunk<
  CreateDormitoryResponse,
  CreateDormitory
>("dormitories/createDormitory", async (data) => {
  const response = await axiosInstance.post<
    CreateDormitory,
    AxiosResponse<CreateDormitoryResponse>
  >(`/api/v1/dormitories/create`, data);
  return response.data;
});

export const getDormRooms = createAsyncThunk<
  GetDormRoomsResponse,
  GetDormRoomsParams
>("dormitories/getDormRooms", async ({ dormId, ...params }) => {
  const queryParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${key}=${typeof value === "boolean" ? Number(value) : value}`
    );
  const response = await axiosInstance.get<
    GetDormRoomsParams,
    AxiosResponse<GetDormRoomsResponse>
  >(`/api/v1/dormitories/${dormId}/dorm-rooms?${queryParams.join("&")}`);
  return response.data;
});

export const deleteRoom = createAsyncThunk<WithMessage, number>(
  "dormitories/deleteRoom",
  async (id) => {
    const response = await axiosInstance.delete<WithMessage>(
      `/api/v1/dormitories/dorm-rooms/${id}/delete`
    );
    return response.data;
  }
);

export const createRoom = createAsyncThunk<CreateRoomResponse, CreateRoomData>(
  "dormitories/createRoom",
  async ({ dorm, ...data }) => {
    const response = await axiosInstance.post<
      CreateRoomData,
      AxiosResponse<CreateRoomResponse>
    >(`/api/v1/dormitories/${dorm}/dorm-rooms`, data);
    return response.data;
  }
);

export const updateRoom = createAsyncThunk<CreateRoomResponse, UpdateRoomData>(
  "dormitories/updateRoom",
  async ({ id, dorm, oldDorm, ...data }) => {
    const response = await axiosInstance.patch<
      UpdateRoomData,
      AxiosResponse<CreateRoomResponse>
    >(`/api/v1/dormitories/dorm-rooms/${id}`, { dormitory_id: dorm, ...data });
    return response.data;
  }
);
