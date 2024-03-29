import { SearchOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { BinaryFilter } from "components/shared";

type Props = {
  value?: boolean;
  onChange: (value: boolean) => void;
};

export function getAvailableFilterProps<T>({
  value,
  onChange,
}: Props): ColumnType<T> {
  return {
    filterDropdown: ({ close }) => (
      <BinaryFilter
        label="Только свободные"
        value={value}
        onChange={onChange}
        onFilterClose={close}
      />
    ),
    filterIcon: () => (
      <SearchOutlined style={{ color: value ? "#fa7a45" : undefined }} />
    ),
  };
}
