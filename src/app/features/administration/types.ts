import { PaginationMeta, WithId, WithIdAndTitle, WithMessage } from "app/types";

export type Role = {
  id: number;
  title: string;
};

export type Permission = WithIdAndTitle<{
  model: string;
}>;

export type PermissionsResponse = {
  permissions: Permission[];
};

type BaseUserType = WithId<{
  name: string;
  email: string;
  is_admin: boolean;
}>;

export type User = BaseUserType & {
  roles: Role[];
  permissions: Permission[];
};

export type CreateUserData = BaseUserType & {
  password: string;
  roles: number[] | null;
  permissions: number[] | null;
};

export type AdministrationStateType = {
  users: User[];
  loading: boolean;
  creating: boolean;
  createMessage?: string;
  createUserModal: {
    open: boolean;
    defaultUser?: User;
  };
  createRoleModalOpen: boolean;
  permissionsLoading: boolean;
  permissions?: Permission[];
  creatingRole: boolean;
  createRoleMessage?: string;
  roles?: Role[];
  loadingRoles: boolean;
  deleteRolesIds: number[];
  deleteUserIds: number[];
  usersMeta: {
    per_page: number;
    current_page: number;
    total?: number;
  };
};

export type CreateUserResponse = WithMessage<{
  user: User;
}>;

export type CreateRoleData = {
  title: string;
  permissions: number[];
};

export type CreateRoleResponse = WithMessage<{
  role: Role;
}>;

export type RolesResponse = {
  roles: Role[];
};

export type GetUserResponse = {
  users: User[];
  meta: PaginationMeta;
};
