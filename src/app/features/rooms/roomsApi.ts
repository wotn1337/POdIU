import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { METHOD, WithMessage } from "app/types";
import { getFilterParams, getSorterParams } from "app/utils";
import {
  CreateRoomData,
  CreateRoomResponse,
  GetRoomsParams,
  GetRoomsResponse,
  RoomTag,
  RoomTags,
  UpdateRoomData,
  UpdateRoomResponse,
} from "./types";

export const getRoomsApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getRooms: builder.query<GetRoomsResponse, GetRoomsParams>({
    query: ({ page, per_page, dormId, sorters, ...params }) =>
      `api/v1/dormitories/${dormId}/dorm-rooms?page=${page}&per_page=${per_page}&${getFilterParams(
        params
      )}&${getSorterParams(sorters)}`,
    providesTags: (_, __, { dormId }) => [
      ...RoomTags,
      { type: RoomTag, dorm_room_id: dormId },
    ],
  }),
  createRoom: builder.mutation<CreateRoomResponse, CreateRoomData>({
    query: ({ dormitory_id, ...body }) => ({
      url: `api/v1/dormitories/${dormitory_id}/dorm-rooms`,
      method: METHOD.POST,
      body,
    }),
    invalidatesTags: RoomTags,
  }),
  updateRoom: builder.mutation<UpdateRoomResponse, UpdateRoomData>({
    query: ({ id, ...body }) => ({
      url: `api/v1/dormitories/dorm-rooms/${id}`,
      method: METHOD.PATCH,
      body,
    }),
    invalidatesTags: RoomTags,
  }),
  deleteRoom: builder.mutation<WithMessage, number>({
    query: (id) => ({
      url: `api/v1/dormitories/dorm-rooms/${id}/delete`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: RoomTags,
  }),
});
