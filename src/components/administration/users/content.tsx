import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  setCreateUserModal,
  setUsersMeta,
} from "app/features/administration/administrationSlice";
import { User } from "app/features/administration/types";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { CreateUserModal } from "./createUserModal";
import { DeleteButton } from "components/shared/delete-button";
import { deleteUser } from "app/features";

export const UsersPageContent = () => {
  const { users, loading, deleteUserIds, usersMeta, roles, permissions } =
    useSelector((state) => state.administration);
  const dispatch = useDispatch();
  const { current_page, per_page, total } = usersMeta;

  const columns: ColumnsType<User> = [
    {
      key: "name",
      dataIndex: "name",
      title: "Имя пользователя",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: users.map((u) => ({ text: u.name, value: u.id })),
      onFilter: (id, record) => record.id === id,
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Электронная почта",
      filters: users.map((u) => ({ text: u.email, value: u.id })),
      onFilter: (id, record) => record.id === id,
    },
    {
      key: "roles",
      dataIndex: "roles",
      title: "Роли",
      filters: roles?.map((r) => ({ text: r.title, value: r.id })),
      onFilter: (id, record) =>
        record.roles.map((r) => r.id).includes(Number(id)),
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
      filters: permissions?.map((p) => ({
        text: `${p.model} - ${p.title}`,
        value: p.id,
      })),
      onFilter: (id, record) =>
        record.permissions.map((p) => p.id).includes(Number(id)),
      render: (permissions: User["permissions"]) => (
        <Space size={4} wrap>
          {permissions.map((perm) => (
            <Tag key={perm.id}>
              {perm.model} - {perm.title}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      key: "actions",
      title: "Действия",
      render: (_, user) => (
        <Space>
          <Button
            type="primary"
            onClick={() =>
              dispatch(setCreateUserModal({ open: true, defaultUser: user }))
            }
          >
            Изменить
          </Button>
          <DeleteButton
            onClick={() => dispatch(deleteUser(user.id))}
            loading={deleteUserIds.includes(user.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <TabledContent<User>
      pageTitle="Пользователи"
      actionButtons={<CreateUserModal />}
      dataSource={users}
      columns={columns}
      loading={loading}
      pagination={{
        pageSize: per_page,
        current: current_page,
        total,
        onChange: (current_page, per_page) =>
          dispatch(setUsersMeta({ current_page, per_page })),
      }}
    />
  );
};
