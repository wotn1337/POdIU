import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetSettlementStatusesResponse, SettlementStatus } from "./types";

export const getSettlementStatusesApiEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getSettlementStatuses: builder.query<SettlementStatus[], void>({
    query: () => "api/v1/settlement-history/statuses",
    transformResponse: (response: GetSettlementStatusesResponse) =>
      response.settlement_statuses,
  }),
});
