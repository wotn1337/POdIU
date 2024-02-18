import { WithIdAndTitle } from "app/types";

export const PermissionTag = "Role";
export const PermissionTags = [PermissionTag];

export type Permission = WithIdAndTitle<{
  model: string;
}>;

export type PermissionsResponse = {
  permissions: Permission[];
};
