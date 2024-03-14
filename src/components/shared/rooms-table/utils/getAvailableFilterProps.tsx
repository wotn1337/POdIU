import { SearchOutlined } from "@ant-design/icons";
import { Space, Switch, Typography } from "antd";
import { ColumnType } from "antd/es/table";

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
      <Space style={{ padding: 8 }} align="center">
        <Typography.Text>Только свободные</Typography.Text>
        <Switch
          checked={value}
          onChange={(checked) => {
            onChange(checked);
            close();
          }}
        />
      </Space>
    ),
    filterIcon: () => (
      <SearchOutlined style={{ color: value ? "#fa7a45" : undefined }} />
    ),
  };
}
