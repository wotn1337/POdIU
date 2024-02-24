import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { METHOD, WithMessage } from "app/types";
import { getFilterParams, getSorterParams } from "app/utils";
import {
  CreateDormitoryData,
  CreateDormitoryResponse,
  DormitoryTags,
  GetDormitoriesParams,
  GetDormitoriesResponse,
  UpdateDormitoryData,
} from "./types";

export const getDormitoriesApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getDormitories: builder.query<GetDormitoriesResponse, GetDormitoriesParams>({
    query: ({ page, per_page, with_user_info, filters, sorters }) =>
      `api/v1/dormitories?page=${page}&per_page=${per_page}&with_user_info=${Number(
        with_user_info ?? false
      )}&${getFilterParams(filters)}&${getSorterParams(sorters)}`,
    providesTags: DormitoryTags,
  }),
  createDormitory: builder.mutation<
    CreateDormitoryResponse,
    CreateDormitoryData
  >({
    query: (body) => ({
      url: "api/v1/dormitories/create",
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
      url: `api/v1/dormitories/${id}`,
      method: METHOD.PATCH,
      body,
    }),
    invalidatesTags: DormitoryTags,
  }),
  deleteDormitory: builder.mutation<WithMessage, number>({
    query: (id) => ({
      url: `api/v1/dormitories/${id}/delete`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: DormitoryTags,
  }),
});
