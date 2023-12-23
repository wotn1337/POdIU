import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { User } from "app/features/administration/types";
import { useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { getFlatPermissions } from "../utils";
import { CreateUserModal } from "./createUserModal";
import s from "../administration.module.scss";

const columns: ColumnsType<User> = [
  {
    key: "name",
    dataIndex: "name",
    title: "Имя пользователя",
  },
  {
    key: "email",
    dataIndex: "email",
    title: "Электронная почта",
  },
  {
    key: "roles",
    dataIndex: "roles",
    title: "Роли",
    render: (roles: User["roles"]) => (
      <Space size={4} wrap>
        {roles.map((role) => (
          <Tag key={role.id}>{role.title}</Tag>
        ))}
      </Space>
    ),
  },
  {
    key: "permissions",
    dataIndex: "permissions",
    title: "Права",
    render: (permissions: User["permissions"]) => (
      <Space size={4} wrap>
        {getFlatPermissions(permissions).map((perm) => (
          <Tag key={perm.id}>{perm.title}</Tag>
        ))}
      </Space>
    ),
  },
];

export const UsersPageContent = () => {
  const { users, loading } = useSelector((state) => state.administration);
  return (
    <TabledContent<User>
      layoutClassName={s.administrationInner}
      pageTitle="Пользователи"
      actionButtons={<CreateUserModal />}
      dataSource={users}
      columns={columns}
      loading={loading}
      pagination={{ defaultPageSize: 10 }}
    />
  );
};
