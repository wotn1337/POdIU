import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  setCreateUserModal,
  setUsersMeta,
} from "app/features/administration/administrationSlice";
import { User } from "app/features/administration/types";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { getFlatPermissions } from "../utils";
import { CreateUserModal } from "./createUserModal";
import { DeleteButton } from "components/shared/delete-button";
import { deleteUser } from "app/features";

export const UsersPageContent = () => {
  const { users, loading, deleteUserIds, usersMeta } = useSelector(
    (state) => state.administration
  );
  const dispatch = useDispatch();
  const { current_page, per_page, total } = usersMeta;

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
        defaultPageSize: 10,
        pageSize: per_page,
        current: current_page,
        total,
        onChange: (current_page, per_page) =>
          dispatch(setUsersMeta({ current_page, per_page })),
      }}
    />
  );
};
