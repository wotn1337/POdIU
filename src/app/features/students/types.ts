import {
  PaginationMeta,
  PaginationParams,
  WithId,
  WithIdAndTitle,
  WithMessage,
} from "app/types";
import { BaseDormRoom } from "..";

export type BaseStudent = WithId<{
  latin_name: string;
  cyrillic_name: string;
  is_family: boolean;
  telephone: string | null;
  eisu_id: string | null;
  comment: string | null;
  created_at: string | null;
  updated_at: string | null;
}>;

export type Student = BaseStudent & {
  gender?: WithIdAndTitle | null;
  country?: WithIdAndTitle | null;
  academic_group?: WithIdAndTitle | null;
  dorm_room?: BaseDormRoom | null;
};

export type PostStudentData = BaseStudent & {
  dorm_room_id?: number | null;
  academic_group_id?: number;
  gender_id?: number;
  country_id?: number;
};

export type CreateStudentResponse = WithMessage<{
  student: Student;
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
  createModal: {
    open: boolean;
    defaultStudent?: Student;
  };
  settlementModal: {
    open: boolean;
    student?: Student;
  };
  creating: boolean;
  countries: WithIdAndTitle[];
  loadingCountries: boolean;
  genders: WithIdAndTitle[];
  loadingGenders: boolean;
  academicGroups: WithIdAndTitle[];
  loadingAcademicGroups: boolean;
  updating: boolean;
};
