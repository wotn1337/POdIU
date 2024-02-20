import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { getFilterParams, getSorterParams } from "app/utils";
import {
  CreateDormitoryData,
  CreateDormitoryResponse,
  DormitoryTags,
  GetDormitoriesParams,
  GetDormitoriesResponse,
  UpdateDormitoryData,
} from "./types";
import { METHOD, WithMessage } from "app/types";

export const dormitoriesApi = createApi({
  reducerPath: "dormitoriesApi",
  baseQuery: getBaseQuery("api/v1/dormitories"),
  tagTypes: DormitoryTags,
  endpoints: (builder) => ({
    getDormitories: builder.query<GetDormitoriesResponse, GetDormitoriesParams>(
      {
        query: ({ page, per_page, with_user_info, filters, sorters }) =>
          `?page=${page}&per_page=${per_page}&with_user_info=${Number(
            with_user_info ?? false
          )}&${getFilterParams(filters)}&${getSorterParams(sorters)}`,
        providesTags: DormitoryTags,
      }
    ),
    createDormitory: builder.mutation<
      CreateDormitoryResponse,
      CreateDormitoryData
    >({
      query: (body) => ({
        url: "/create",
        method: METHOD.POST,
        body,
      }),
      invalidatesTags: DormitoryTags,
    }),
    updateDormitory: builder.mutation<
      CreateDormitoryResponse,
      UpdateDormitoryData
    >({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: METHOD.PATCH,
        body,
      }),
      invalidatesTags: DormitoryTags,
    }),
    deleteDormitory: builder.mutation<WithMessage, number>({
      query: (id) => ({
        url: `/${id}/delete`,
        method: METHOD.DELETE,
      }),
      invalidatesTags: DormitoryTags,
    }),
  }),
});

export const {
  useGetDormitoriesQuery,
  useCreateDormitoryMutation,
  useUpdateDormitoryMutation,
  useDeleteDormitoryMutation,
} = dormitoriesApi;
