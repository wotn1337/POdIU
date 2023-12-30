import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "app/api";
import { WithMessage } from "app/types";
import { AxiosResponse } from "axios";
import {
  GetCountriesResponse,
  GetAcademicGroupsResponse,
  GetStudentsParams,
  GetStudentsResponse,
  GetGendersResponse,
} from "./types";

export const getStudents = createAsyncThunk<
  GetStudentsResponse,
  GetStudentsParams
>("students/getStudents", async ({ per_page, page }) => {
  const response = await axiosInstance.get<
    GetStudentsParams,
    AxiosResponse<GetStudentsResponse>
  >(`/api/v1/students?page=${page}&per_page=${per_page}`);
  return response.data;
});

export const deleteStudent = createAsyncThunk<WithMessage, number>(
  "students/deleteStudent",
  async (id) => {
    const response = await axiosInstance.delete<WithMessage>(
      `/api/v1/students/${id}/delete`
    );
    return response.data;
  }
);

export const getCountries = createAsyncThunk<GetCountriesResponse>(
  "students/getCountries",
  async () => {
    const response = await axiosInstance.get<GetCountriesResponse>(
      `/api/v1/countries`
    );
    return response.data;
  }
);

export const getGenders = createAsyncThunk<GetGendersResponse>(
  "students/getGenders",
  async () => {
    const response = await axiosInstance.get<GetGendersResponse>(
      `/api/v1/genders`
    );
    return response.data;
  }
);

export const getAcademicGroups = createAsyncThunk<GetAcademicGroupsResponse>(
  "students/getAcademicGroups",
  async () => {
    const response = await axiosInstance.get<GetAcademicGroupsResponse>(
      `/api/v1/academic-groups`
    );
    return response.data;
  }
);
