import {
  PaginationMeta,
  PaginationParams,
  WithId,
  WithMessage,
} from "app/types";
import { User } from "../administration/types";

export type Dormitory = WithId<{
  number: string;
  address: string;
  comment: string;
  creator: User;
  last_update_user: User;
  created_at: string | null;
  updated_at: string | null;
}>;

export type GetDormitoriesParams = PaginationParams<{
  with_user_info?: boolean;
}>;

export type GetDormitoriesResponse = {
  dormitories: Dormitory[];
  meta: PaginationMeta;
};

export type CreateDormitory = {
  number: string;
  address: string;
  comment: string;
};

export type CreateDormitoryResponse = WithMessage<{
  dormitory: Dormitory;
}>;

export type DormRoom = WithId<{
  number: string;
  number_of_seats: number;
  comment: string;
  students_count: number;
  empty_seats_count: number;
  creator: User;
  last_update_user: User;
  created_at: string | null;
  updated_at: string | null;
}>;

export type GetDormRoomsParams = {
  dormId: number;
  page: number;
  per_page: number;
};

export type GetDormRoomsResponse = {
  dorm_rooms: DormRoom[];
  meta: PaginationMeta;
};

export type RoomsInfo = {
  per_page: number;
  current_page: number;
  total?: number;
  rooms: DormRoom[];
};

export type DormitoriesStateType = {
  loading: boolean;
  dormitories: Dormitory[];
  per_page: number;
  current_page: number;
  total?: number;
  deletingIds: number[];
  openCreateModal: boolean;
  creating: boolean;
  gettingRoomsDormIds: number[];
  dormRooms: Record<number, RoomsInfo>;
  deletingRoomIds: number[];
};
