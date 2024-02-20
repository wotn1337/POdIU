import { SortOrder } from "antd/es/table/interface";
import {
  PaginationParams,
  WithId,
  WithMessage,
  WithPaginationMeta,
} from "app/types";
import { User } from "../users";

export const DormitoryTag = "Dormitory";
export const DormitoryTags = [DormitoryTag];

export type BaseDormitory = {
  number: string;
  address: string;
  comment: string;
};

export type Dormitory = WithId<
  BaseDormitory & {
    creator: User;
    last_update_user: User;
    created_at: string | null;
    updated_at: string | null;
  }
>;

export type Filters = {
  address?: string;
  number?: number;
};

export type Sorters = {
  number?: SortOrder;
  address?: SortOrder;
};

export type RoomsSorters = {
  number?: SortOrder;
};

export type GetDormitoriesParams = PaginationParams<{
  with_user_info?: boolean;
  filters?: Filters;
  sorters?: Sorters;
}>;

export type GetDormitoriesResponse = WithPaginationMeta<{
  dormitories: Dormitory[];
}>;

export type CreateDormitoryData = BaseDormitory;

export type CreateDormitoryResponse = WithMessage<{
  data: Dormitory;
}>;

export type UpdateDormitoryData = WithId<BaseDormitory>;

export type DormitoriesStateType = {
  deletingDormitoryIds: number[];
  createDormitoryModal: {
    open: boolean;
    defaultDormitory?: Dormitory;
  };
};
