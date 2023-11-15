import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const roles = [
  { key: 1, label: "admin" },
  { key: 2, label: "writer" },
  { key: 3, label: "reader" },
];

type Props = {
  role: string;
};

export const RoleDropdown: React.FC<Props> = ({ role }) => {
  return (
    <Dropdown menu={{ items: roles }} trigger={["click"]}>
      <Space style={{ cursor: "pointer", fontSize: 20 }}>
        {role}
        <DownOutlined style={{ color: "var(--orange)" }} />
      </Space>
    </Dropdown>
  );
};
