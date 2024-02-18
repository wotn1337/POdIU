import { WithId, WithMessage } from "app/types";
import { Permission } from "../permissions";

export const RoleTag = "Role";
export const RoleTags = [RoleTag];

export type Role = WithId<{
  title: string;
  permissions: Permission[];
}>;

export type CreateRoleData = {
  title: string;
  permissions: number[];
};

export type UpdateRoleData = WithId<CreateRoleData>;

export type CreateRoleResponse = WithMessage<{
  role: Role;
}>;

export type RolesResponse = {
  roles: Role[];
};

export type RolesStateType = {
  deleteRoleIds: number[];
  createRoleModal: {
    open: boolean;
    defaultRole?: Role;
  };
};
