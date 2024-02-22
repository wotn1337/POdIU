import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { getFilterParams, getSorterParams } from "app/utils";
import {
  CreateStudentResponse,
  GetStudentsParams,
  GetStudentsResponse,
  PostStudentData,
  StudentTags,
  UpdateStudentData,
} from "./types";
import { METHOD, WithMessage } from "app/types";
import { RoomTag } from "../rooms/types";

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: getBaseQuery("api/v1/students"),
  tagTypes: StudentTags,
  endpoints: (builder) => ({
    getStudents: builder.query<GetStudentsResponse, GetStudentsParams>({
      query: ({ page, per_page, with_dormitory, filters, sorters }) =>
        `?page=${page}&per_page=${per_page}&with_dormitory=${Number(
          with_dormitory ?? false
        )}&${getFilterParams(filters)}&${getSorterParams(sorters)}`,
      providesTags: StudentTags,
    }),
    createStudent: builder.mutation<CreateStudentResponse, PostStudentData>({
      query: (body) => ({
        url: "",
        method: METHOD.POST,
        body,
      }),
      invalidatesTags: StudentTags,
    }),
    updateStudent: builder.mutation<CreateStudentResponse, UpdateStudentData>({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: METHOD.PATCH,
        body,
      }),
      invalidatesTags: (_, __, { dorm_room_id }) => [
        ...StudentTags,
        { type: RoomTag, dorm_room_id },
      ],
    }),
    deleteStudent: builder.mutation<WithMessage, number>({
      query: (id) => ({
        url: `/${id}/delete`,
        method: METHOD.DELETE,
      }),
      invalidatesTags: StudentTags,
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
