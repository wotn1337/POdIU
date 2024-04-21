import {
  WithId,
  WithMessage,
  WithPaginationMeta,
  WithTimeInfo,
} from "app/types";
import { Role } from "../roles";
import { Permission } from "../permissions";

export const UserTag = "User";
export const UserTags = [UserTag];

type BaseUserType = {
  name: string;
  email: string;
  is_admin: boolean;
};

export type User = BaseUserType &
  WithId<{
    roles: Role[];
    permissions: Permission[];
  }>;

export type GetUsersResponse = WithPaginationMeta<{
  users: User[];
}>;

export type CreateUserData = BaseUserType & {
  password: string;
  roles: number[] | null;
  permissions: number[] | null;
};

export type CreateUserResponse = WithMessage<{
  user: User;
}>;

export type UpdateUserData = WithId<CreateUserData>;

export type NotificationType = WithTimeInfo<
  WithId<{
    type: string;
    read_at: string | null;
    data: {
      message: string;
      status: "success" | "failure";
    };
  }>
>;

export type GetUserNotificationsResponse = WithPaginationMeta<{
  notifications: NotificationType[];
}>;

export type UsersStateType = {
  deleteUserIds: number[];
  createUserModal: {
    open: boolean;
    defaultUser?: User;
  };
  notifications: NotificationType[];
};
