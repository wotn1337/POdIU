import { SearchOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { BinaryFilter } from "components/shared";

type Props = {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
};

export function getBinaryFilterProps<T>({
  label,
  value,
  onChange,
}: Props): ColumnType<T> {
  return {
    filterDropdown: ({ close }) => (
      <BinaryFilter
        label={label}
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
