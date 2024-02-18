import { WithId, WithMessage, WithPaginationMeta } from "app/types";
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

export type UsersStateType = {
  deleteUserIds: number[];
  createUserModal: {
    open: boolean;
    defaultUser?: User;
  };
};
