import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { METHOD, WithMessage } from "app/types";
import {
  CreateStudentResponse,
  GetStudentsParams,
  GetStudentsResponse,
  PostStudentData,
  StudentTags,
  UpdateStudentData,
} from "./types";
import { getFilterParams, getSorterParams } from "app/utils";
import { RoomTag } from "../rooms/types";

export const getStudentsApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getStudents: builder.query<GetStudentsResponse, GetStudentsParams>({
    query: ({ page, per_page, with_dormitory, filters, sorters }) =>
      `api/v1/students?page=${page}&per_page=${per_page}&with_dormitory=${Number(
        with_dormitory ?? false
      )}&${getFilterParams(filters)}&${getSorterParams(sorters)}`,
    providesTags: StudentTags,
  }),
  createStudent: builder.mutation<CreateStudentResponse, PostStudentData>({
    query: (body) => ({
      url: "api/v1/students",
      method: METHOD.POST,
      body,
    }),
    invalidatesTags: StudentTags,
  }),
  deleteStudent: builder.mutation<WithMessage, number>({
    query: (id) => ({
      url: `api/v1/students/${id}/delete`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: StudentTags,
  }),
  updateStudent: builder.mutation<CreateStudentResponse, UpdateStudentData>({
    query: ({ id, ...body }) => ({
      url: `api/v1/students/${id}`,
      method: METHOD.PATCH,
      body,
    }),
    invalidatesTags: (_, __, { dorm_room_id }) => [
      ...StudentTags,
      { type: RoomTag, dorm_room_id },
    ],
  }),
});
