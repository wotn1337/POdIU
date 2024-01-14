import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "app/api";
import { ErrorsResponse, WithMessage } from "app/types";
import { AxiosError, AxiosResponse } from "axios";
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
>(
  "dormitories/getDormitories",
  async ({ per_page, page, filters, sorters }) => {
    const filterParams = Object.entries(filters)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}[]=${v}`).join("&");
        }
        return `${key}=${value}`;
      });
    const sorterParams = Object.entries(sorters)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        return `sort_by[column]=${key}&sort_by[direction]=${value?.replace(
          "end",
          ""
        )}`;
      });
    const response = await axiosInstance.get<
      GetDormitoriesParams,
      AxiosResponse<GetDormitoriesResponse>
    >(
      `/api/v1/dormitories?page=${page}&per_page=${per_page}&${filterParams.join(
        "&"
      )}&${sorterParams.join("&")}`
    );
    return response.data;
  }
);

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

export const createRoom = createAsyncThunk<
  CreateRoomResponse,
  CreateRoomData,
  { rejectValue: ErrorsResponse | undefined }
>("dormitories/createRoom", async ({ dorm, ...data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<
      CreateRoomData,
      AxiosResponse<CreateRoomResponse>
    >(`/api/v1/dormitories/${dorm}/dorm-rooms`, data);
    return response.data;
  } catch (e) {
    const error = e as AxiosError<ErrorsResponse>;
    return rejectWithValue(error.response?.data);
  }
});

export const updateRoom = createAsyncThunk<
  CreateRoomResponse,
  UpdateRoomData,
  { rejectValue: ErrorsResponse | undefined }
>(
  "dormitories/updateRoom",
  async ({ id, dorm, oldDorm, ...data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<
        UpdateRoomData,
        AxiosResponse<CreateRoomResponse>
      >(`/api/v1/dormitories/dorm-rooms/${id}`, {
        dormitory_id: dorm,
        ...data,
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError<ErrorsResponse>;
      return rejectWithValue(error.response?.data);
    }
  }
);
