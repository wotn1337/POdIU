import {
  PaginationMeta,
  PaginationParams,
  WithId,
  WithIdAndTitle,
} from "app/types";
import { User } from "../administration/types";

export type DormRoom = WithId<{
  number: string;
  number_of_seats: number;
  comment: string;
  students_count: number;
  empty_seats_count: number;
  creator: User;
  last_update_user: User;
  created_at: string | null;
  updated_at: string | null;
}>;

export type Student = WithId<{
  latin_name: string;
  cyrillic_name: string;
  is_family: boolean;
  telephone: string | null;
  eisu_id: string | null;
  comment: string | null;
  gender?: WithIdAndTitle;
  creator?: User;
  last_update_user_id?: User;
  country?: WithIdAndTitle;
  academic_group?: WithIdAndTitle;
  created_at: string | null;
  updated_at: string | null;
}>;

export type GetStudentsParams = PaginationParams<{
  with_dormitory?: boolean;
}>;

export type GetStudentsResponse = {
  students: Student[];
  meta: PaginationMeta;
};

export type GetCountriesResponse = {
  countries: WithIdAndTitle[];
};

export type GetGendersResponse = {
  genders: WithIdAndTitle[];
};

export type GetAcademicGroupsResponse = {
  academic_groups: WithIdAndTitle[];
};

export type StudentsStateType = {
  loading: boolean;
  students: Student[];
  per_page: number;
  current_page: number;
  total?: number;
  deletingIds: number[];
  openCreateModal: boolean;
  creating: boolean;
  countries: WithIdAndTitle[];
  loadingCountries: boolean;
  genders: WithIdAndTitle[];
  loadingGenders: boolean;
  academicGroups: WithIdAndTitle[];
  loadingAcademicGroups: boolean;
  //rooms
};
