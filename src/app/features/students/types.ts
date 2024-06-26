import {
  Filters,
  PaginationParams,
  Sorters,
  WithId,
  WithIdAndTitle,
  WithMessage,
  WithPaginationMeta,
} from "app/types";
import { Country, Gender } from "..";
import { BaseRoom } from "../rooms/types";

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
    dorm_room?: WithId<BaseRoom> | null;
  }>;

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

export type SettleStudentParams = {
  studentId: number;
  roomId: number;
  has_dorm_room?: boolean;
};

export type GetStudentPaymentsResponse = {
  student_payments: WithId<{
    student_payment_type: WithIdAndTitle;
    value: number;
    comment: string;
  }>[];
};

export type StudentsStateType = {
  deletingStudentIds: number[];
  createStudentModal: {
    open: boolean;
    defaultStudent?: Student;
  };
  settlementStudent?: Student;
  settlementHistoryStudent?: Student;
  evictingStudentIds: number[];
};
