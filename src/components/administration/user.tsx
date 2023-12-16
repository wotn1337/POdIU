import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Space,
  Tag,
} from "antd";
import { User as UserType } from "app/features/administration/types";
import s from "./administration.module.scss";
import { getFlatPermissions } from "./utils";

type Props = UserType;

export const User: React.FC<Props> = ({ name, email, roles, permissions }) => {
  const descriptionsItems: DescriptionsProps["items"] = [
    {
      key: "name",
      label: "Имя пользователя",
      children: name,
    },
    {
      key: "email",
      label: "Электронная почта",
      children: email,
    },
    {
      key: "roles",
      label: "Роли",
      // children: <RoleDropdown role={role} />,
      children: (
        <Space size={4} wrap>
          {roles.map((role) => (
            <Tag key={role.id}>{role.title}</Tag>
          ))}
        </Space>
      ),
    },
    {
      key: "permissions",
      label: "Права",
      children: (
        <Space size={0} wrap>
          {getFlatPermissions(permissions).map((perm) => (
            <Tag key={perm.id}>{perm.title}</Tag>
          ))}
        </Space>
      ),
    },
    // {
    //   key: "password",
    //   label: "Пароль",
    //   children: <UserPassword password={password} />,
    // },
  ];

  return (
    <Flex className={s.user} align="center" gap={16}>
      <UserOutlined className={s.user__icon} />
      <Descriptions
        items={descriptionsItems}
        layout="vertical"
        column={4}
        className={s.user__descriptions}
      />
      <Button icon={<DeleteOutlined className={s.user__deleteIcon} />} />
    </Flex>
  );
};
