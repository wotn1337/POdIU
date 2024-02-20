import { TableProps } from "antd";
import { Student } from "app/features/students/types";
import { Filters, Sorters } from "app/types";

type Props = {
  filters?: Filters;
  setFilters: (filters: Filters) => void;
  setSorters: (sorters: Sorters) => void;
};

export const getOnChange = ({
  setFilters,
  setSorters,
  filters,
}: Props): TableProps<Student>["onChange"] => {
  return (_, tableFilters, sorter) => {
    if (!Array.isArray(sorter)) {
      setSorters({
        [String(sorter.columnKey)]: sorter.order,
      });
    }
    setFilters({
      ...filters,
      gender_id: tableFilters["gender"] ? tableFilters["gender"][0] : undefined,
      countries: tableFilters["country"] ?? undefined,
    });
  };
};
