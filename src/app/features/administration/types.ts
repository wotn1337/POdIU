import { WithMessage } from "app/types";

export type Role = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export type Permission = {
  id: number;
  title: string;
};

export type PermissionsRecord = Record<"Пользователь" | "Роль", Permission[]>;

export type PermissionsResponse = {
  permissions: PermissionsRecord;
};

type BaseUserType = {
  name: string;
  email: string;
};

export type User = BaseUserType & {
  roles: Role[];
  permissions: PermissionsRecord;
};

export type CreateUserData = BaseUserType & {
  password: string;
  roles: number[] | null;
  permissions: number[] | null;
};

export type StateType = {
  users: User[];
  loading: boolean;
  creating: boolean;
  createMessage?: string;
  createUserModalOpen: boolean;
  createRoleModalOpen: boolean;
  permissionsLoading: boolean;
  permissions?: PermissionsRecord;
  creatingRole: boolean;
  createRoleMessage?: string;
  roles?: Role[];
  loadingRoles: boolean;
  deleteRolesIds: number[];
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
