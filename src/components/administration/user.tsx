import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Descriptions, DescriptionsProps, Flex } from "antd";
import s from "./administration.module.scss";
import { RoleDropdown } from "./roleDropdown";
import { UserPassword } from "./userPassword";

type Props = {
  name: string;
  email: string;
  role: string;
  password: string;
};

export const User: React.FC<Props> = ({ name, email, role, password }) => {
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
      key: "role",
      label: "Роль",
      children: <RoleDropdown role={role} />,
    },
    {
      key: "password",
      label: "Пароль",
      children: <UserPassword password={password} />,
    },
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
      <DeleteOutlined className={s.user__deleteIcon} />
    </Flex>
  );
};
