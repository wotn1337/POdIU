import { WithIdAndTitle } from "app/types";

export type SettlementStatus = WithIdAndTitle;

export type GetSettlementStatusesResponse = {
  settlement_statuses: SettlementStatus[];
};
