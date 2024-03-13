import { FilterValue, Key, SortOrder } from "antd/es/table/interface";

export type WithMessage<T = {}> = T & {
  message: string;
};

export type WithId<T = {}> = T & {
  id: number;
};

export type WithIdAndTitle<T = {}> = T &
  WithId<{
    title: string;
  }>;

export type PaginationParams<T = {}> = T & {
  per_page?: number;
  page?: number;
};

export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type WithPaginationMeta<T = {}> = T & {
  meta: PaginationMeta;
};

export type ErrorsResponse = {
  errors?: Record<string, string[]>;
  message?: string;
};

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type Filters = Record<string, boolean | Key | undefined | FilterValue>;
export type Sorters = Record<string, SortOrder | undefined>;

export type WithTimeInfo<T = {}> = T & {
  created_at: string | null;
  deleted_at: string | null;
};
