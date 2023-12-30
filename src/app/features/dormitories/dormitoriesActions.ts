import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "app/api";
import { WithMessage } from "app/types";
import { AxiosResponse } from "axios";
import {
  CreateDormitory,
  CreateDormitoryResponse,
  GetDormRoomsParams,
  GetDormRoomsResponse,
  GetDormitoriesParams,
  GetDormitoriesResponse,
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
>("dormitories/getDormRooms", async ({ dormId, page, per_page }) => {
  const response = await axiosInstance.get<GetDormRoomsResponse>(
    `/api/v1/dormitories/${dormId}/dorm-rooms?page=${page}&per_page=${per_page}`
  );
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
