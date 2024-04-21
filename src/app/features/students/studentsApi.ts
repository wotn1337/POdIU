import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { METHOD, WithMessage } from "app/types";
import {
  CreateStudentResponse,
  GetStudentPaymentsResponse,
  GetStudentsParams,
  GetStudentsResponse,
  PostStudentData,
  SettleStudentParams,
  StudentTags,
  UpdateStudentData,
} from "./types";
import { getFilterParams, getSorterParams } from "app/utils";
import { RoomTag } from "../rooms/types";

export const getStudentsApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getStudents: builder.query<GetStudentsResponse, GetStudentsParams>({
    query: ({ filters, sorters, ...params }) =>
      `api/v1/students?${getFilterParams({
        ...filters,
        ...params,
      })}&${getSorterParams(sorters)}`,
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
  }),
  settleStudent: builder.mutation<void, SettleStudentParams>({
    query: ({ studentId, roomId }) => ({
      url: `api/v1/students/${studentId}/settle`,
      method: METHOD.PATCH,
      body: {
        dorm_room_id: roomId,
      },
    }),
    invalidatesTags: (_, __, { roomId }) => [
      ...StudentTags,
      { type: RoomTag, dorm_room_id: roomId },
    ],
  }),
  evictStudent: builder.mutation<void, SettleStudentParams>({
    query: ({ studentId }) => ({
      url: `api/v1/students/${studentId}/evict`,
      method: METHOD.PATCH,
    }),
    invalidatesTags: (_, __, { roomId }) => [
      ...StudentTags,
      { type: RoomTag, dorm_room_id: roomId },
    ],
  }),
  studentPaymentsImport: builder.mutation<void, Blob>({
    query: (file) => {
      const formData = new FormData();
      formData.append("file", file);
      return {
        url: "api/v1/students/payments/import",
        method: METHOD.POST,
        body: formData,
      };
    },
  }),
  getStudentPayments: builder.query<
    GetStudentPaymentsResponse,
    number | undefined
  >({
    query: (studentId) => ({
      url: `api/v1/students/payments/${studentId}`,
      method: METHOD.GET,
    }),
  }),
});
