import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "app/api";
import { METHOD, WithMessage } from "app/types";
import {
  UpdateRoomData,
  CreateRoomResponse,
  RoomTags,
  CreateRoomData,
  GetRoomsResponse,
  GetRoomsParams,
  UpdateRoomResponse,
} from "./types";
import { getFilterParams, getSorterParams } from "app/utils";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: getBaseQuery("api/v1/dormitories/"),
  tagTypes: RoomTags,
  endpoints: (builder) => ({
    getRooms: builder.query<GetRoomsResponse, GetRoomsParams>({
      query: ({ page, per_page, dormId, sorters, ...params }) =>
        `${dormId}/dorm-rooms?page=${page}&per_page=${per_page}&${getFilterParams(
          params
        )}&${getSorterParams(sorters)}`,
      providesTags: RoomTags,
    }),
    createRoom: builder.mutation<CreateRoomResponse, CreateRoomData>({
      query: ({ dormitory_id, ...body }) => ({
        url: `${dormitory_id}/dorm-rooms`,
        method: METHOD.POST,
        body,
      }),
      invalidatesTags: RoomTags,
    }),
    updateRoom: builder.mutation<UpdateRoomResponse, UpdateRoomData>({
      query: ({ id, ...body }) => ({
        url: `dorm-rooms/${id}`,
        method: METHOD.PATCH,
        body,
      }),
      invalidatesTags: RoomTags,
    }),
    deleteRoom: builder.mutation<WithMessage, number>({
      query: (id) => ({
        url: `dorm-rooms/${id}/delete`,
        method: METHOD.DELETE,
      }),
      invalidatesTags: RoomTags,
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetRoomsQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;
