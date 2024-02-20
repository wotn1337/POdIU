import { Filters, Sorters } from "./types";

export const getFilterParams = (filters?: Filters) => {
  return (filters ? Object.entries(filters) : [])
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}[]=${v}`).join("&");
      }
      return `${key}=${typeof value === "boolean" ? Number(value) : value}`;
    })
    .join("&");
};

export const getSorterParams = (sorters?: Sorters) => {
  return (sorters ? Object.entries(sorters) : [])
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      return `sort_by[column]=${key}&sort_by[direction]=${value?.replace(
        "end",
        ""
      )}`;
    })
    .join("&");
};
