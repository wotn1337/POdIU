import {
  PaginationMeta,
  PaginationParams,
  WithId,
  WithMessage,
} from "app/types";
import { User } from "../administration/types";
import { Student } from "../students/types";
import { SortOrder } from "antd/es/table/interface";

export type Dormitory = WithId<{
  number: string;
  address: string;
  comment: string;
  creator: User;
  last_update_user: User;
  created_at: string | null;
  updated_at: string | null;
}>;

export type Filters = {
  address?: string;
  number?: number;
};

export type Sorters = {
  number?: SortOrder;
  address?: SortOrder;
};

export type GetDormitoriesParams = PaginationParams<{
  with_user_info?: boolean;
  filters: Filters;
  sorters: Sorters;
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

export type UpdateDorm = WithId<{
  number: string;
  address: string;
  comment: string;
}>;

export type CreateDormitoryResponse = WithMessage<{
  data: Dormitory;
}>;

export type BaseDormRoom = WithId<{
  number: string;
  number_of_seats: number;
  comment: string;
  created_at: string | null;
  updated_at: string | null;
}>;

export type DormRoom = BaseDormRoom & {
  students_count: number;
  empty_seats_count: number;
  creator: User;
  last_update_user: User;
  students?: Student[];
};

export type GetDormRoomsParams = {
  dormId: number;
  page: number;
  per_page: number;
  gender_id?: number;
  is_family?: boolean;
  only_available_dorm_rooms?: boolean;
  with_students?: boolean;
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

export type CreateRoomData = {
  dorm: number;
  number: number;
  number_of_seats: number;
  comment?: string;
};

export type UpdateRoomData = WithId<
  CreateRoomData & {
    oldDorm: number;
  }
>;

export type CreateRoomResponse = WithMessage<{
  dorm_rooms: DormRoom;
}>;

export type DormitoriesStateType = {
  loading: boolean;
  dormitories: Dormitory[];
  per_page: number;
  current_page: number;
  total?: number;
  deletingIds: number[];
  createModal: {
    open: boolean;
    defaultDorm?: Dormitory;
  };
  createRoomModal: {
    open: boolean;
    defaultRoom?: DormRoom;
    defaultDorm?: number;
  };
  creating: boolean;
  creatingRoom: boolean;
  gettingRoomsDormIds: number[];
  dormRooms: Record<number, RoomsInfo>;
  deletingRoomIds: number[];
  settlementModal: {
    open: boolean;
    dorm?: Dormitory;
    room?: DormRoom;
  };
  loadingStudentIds: number[];
  filters: Filters;
  sorters: Sorters;
};
