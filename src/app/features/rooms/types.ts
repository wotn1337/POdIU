import { SortOrder } from "antd/es/table/interface";
import {
  PaginationParams,
  WithId,
  WithMessage,
  WithPaginationMeta,
} from "app/types";
import { Student } from "../students/types";
import { User } from "../users";

export const RoomTag = "Room";
export const RoomTags = [RoomTag];

export type RoomsSorters = {
  number?: SortOrder;
};

export type BaseRoom = {
  number: string;
  number_of_seats: number;
  comment: string;
};

export type Room = WithId<
  BaseRoom & {
    students_count: number;
    empty_seats_count: number;
    creator: User;
    last_update_user: User;
    students?: Student[];
  }
>;

export type GetRoomsParams = PaginationParams<{
  dormId: number;
  gender_id?: number;
  is_family?: boolean;
  only_available_dorm_rooms?: boolean;
  with_students?: boolean;
  sorters?: RoomsSorters;
}>;
export type GetRoomsResponse = WithPaginationMeta<{
  dorm_rooms: Room[];
}>;

export type CreateRoomData = BaseRoom & {
  dormitory_id: number;
};
export type CreateRoomResponse = WithMessage<{
  dorm_rooms: Room;
}>;

export type UpdateRoomData = WithId<CreateRoomData>;
export type UpdateRoomResponse = CreateRoomResponse;

export type GetDormRoomsParams = PaginationParams<{
  dormId: number;
  gender_id?: number;
  is_family?: boolean;
  only_available_dorm_rooms?: boolean;
  with_students?: boolean;
  sorters: RoomsSorters;
}>;
export type GetDormRoomsResponse = WithPaginationMeta<{
  dorm_rooms: Room[];
}>;

export type RoomsStateType = {
  deletingRoomIds: number[];
  createRoomModal: {
    open: boolean;
    defaultDorm?: number;
    defaultRoom?: Room;
  };
  settlementModal?: { room: Room };
};
