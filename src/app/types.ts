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
