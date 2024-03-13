import {
  PaginationParams,
  WithId,
  WithPaginationMeta,
  WithTimeInfo,
} from "app/types";
import { Dormitory, Student, User } from "..";
import { SettlementStatus } from "../settlementStatuses";

export type SettlementHistory = WithId<
  WithTimeInfo<{
    student: Student;
    user: User;
    last_update_user_id: User;
    dorm_room: Dormitory;
    settlement_status: SettlementStatus;
  }>
>;

export type GetSettlementHistoryParams = PaginationParams<{
  dorm_room_id?: number;
  settlement_status_id?: number;
  student_id?: number;
}>;

export type GetSettlementHistoryResponse = WithPaginationMeta<{
  settlement_history_records: SettlementHistory[];
}>;
