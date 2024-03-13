import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import {
  GetSettlementHistoryParams,
  GetSettlementHistoryResponse,
} from "./types";
import { RoomTag, RoomTags } from "../rooms";
import { getFilterParams } from "app/utils";

export const getSettlementHistoryApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getSettlementHistory: builder.query<
    GetSettlementHistoryResponse,
    GetSettlementHistoryParams
  >({
    query: (params) =>
      `api/v1/settlement-history/records?${getFilterParams(params)}`,
    providesTags: (_, __, { dorm_room_id }) => [
      ...RoomTags,
      { type: RoomTag, dorm_room_id },
    ],
  }),
});
