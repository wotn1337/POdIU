import { WithIdAndTitle } from "app/types";

export type AcademicGroup = WithIdAndTitle;

export type GetAcademicGroupsResponse = {
  academic_groups: AcademicGroup[];
};
