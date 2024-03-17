import { Space, Switch, Typography } from "antd";

type Props = {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  onFilterClose: () => void;
};

export const BinaryFilter: React.FC<Props> = ({
  label,
  onChange,
  onFilterClose,
  value,
}) => {
  return (
    <Space style={{ padding: 8 }} align="center">
      <Typography.Text>{label}</Typography.Text>
      <Switch
        checked={value}
        onChange={(checked) => {
          onChange(checked);
          onFilterClose();
        }}
      />
    </Space>
  );
};
