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
  PostStudentData,
  CreateStudentResponse,
} from "./types";

export const createStudent = createAsyncThunk<
  CreateStudentResponse,
  PostStudentData
>("students/createStudent", async (data) => {
  const response = await axiosInstance.post<
    PostStudentData,
    AxiosResponse<CreateStudentResponse>
  >(`/api/v1/students`, data);
  return response.data;
});

export const getStudents = createAsyncThunk<
  GetStudentsResponse,
  GetStudentsParams
>("students/getStudents", async ({ per_page, page, with_dormitory }) => {
  const response = await axiosInstance.get<
    GetStudentsParams,
    AxiosResponse<GetStudentsResponse>
  >(
    `/api/v1/students?page=${page}&per_page=${per_page}&with_dormitory=${Number(
      with_dormitory
    )}`
  );
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

export const updateStudent = createAsyncThunk<
  CreateStudentResponse,
  PostStudentData
>("students/updateStudents", async ({ id, telephone, ...data }) => {
  const response = await axiosInstance.patch<
    PostStudentData,
    AxiosResponse<CreateStudentResponse>
  >(`/api/v1/students/${id}`, data);
  return response.data;
});
