import { SortOrder } from "antd/es/table/interface";
import {
  PaginationParams,
  WithId,
  WithIdAndTitle,
  WithMessage,
  WithPaginationMeta,
} from "app/types";
import { BaseDormRoom, Country, Gender } from "..";

export const StudentTag = "Student";
export const StudentTags = [StudentTag];

export type BaseStudent = {
  latin_name: string;
  cyrillic_name: string;
  is_family: boolean;
  telephone: string | null;
  eisu_id: string | null;
  comment: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Student = BaseStudent &
  WithId<{
    gender?: Gender | null;
    country?: Country | null;
    academic_group?: WithIdAndTitle | null;
    dorm_room?: BaseDormRoom | null;
  }>;

export type Filters = {
  gender_id?: number;
  latin_name?: string;
  cyrillic_name?: string;
  countries?: number[];
};

export type Sorters = {
  latin_name?: SortOrder;
  cyrillic_name?: SortOrder;
};

export type PostStudentData = BaseStudent & {
  dorm_room_id?: number | null;
  academic_group_id?: number;
  gender_id?: number;
  country_id?: number;
};

export type UpdateStudentData = WithId<PostStudentData>;

export type CreateStudentResponse = WithMessage<{
  student: Student;
}>;

export type GetStudentsParams = PaginationParams<{
  with_dormitory?: boolean;
  filters?: Filters;
  sorters?: Sorters;
}>;

export type GetStudentsResponse = WithPaginationMeta<{
  students: Student[];
}>;

export type StudentsStateType = {
  deletingStudentIds: number[];
  createStudentModal: {
    open: boolean;
    defaultStudent?: Student;
  };
  settlementModal: {
    open: boolean;
    student?: Student;
  };
};
