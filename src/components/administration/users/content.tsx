import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  User,
  setCreateUserModal,
  useDeleteUserMutation,
  useGetPermissionsQuery,
  useGetRolesQuery,
  useGetUsersQuery,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { PaginationParams } from "app/types";
import { TableActionButtons, TabledContent } from "components/shared";
import { useUserPermissions } from "hooks/useUserPermissions";
import { useState } from "react";
import { CreateUserModal } from "./createUserModal";

export const UsersPageContent = () => {
  const { users: perms } = useUserPermissions();
  const { deleteUserIds, createUserModal } = useSelector(
    (state) => state.users
  );
  const { data: roles } = useGetRolesQuery();
  const { data: permissions } = useGetPermissionsQuery();
  const dispatch = useDispatch();
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    per_page: 10,
  });
  const { data, isLoading, isFetching } = useGetUsersQuery(paginationParams);
  const [deleteUser] = useDeleteUserMutation();
  const loading = isLoading || isFetching;

  const columns: ColumnsType<User> = [
    {
      key: "name",
      dataIndex: "name",
      title: "Имя пользователя",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: data?.users.map((u) => ({ text: u.name, value: u.id })),
      onFilter: (id, record) => record.id === id,
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Электронная почта",
      filters: data?.users.map((u) => ({ text: u.email, value: u.id })),
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
      key: "is_admin",
      dataIndex: "is_admin",
      title: "Админ",
      render: (value) => value && <CheckCircleTwoTone twoToneColor="#52c41a" />,
    },
  ];

  if (perms.update || perms.delete) {
    columns.push({
      key: "actions",
      title: "Действия",
      render: (_, user) => (
        <TableActionButtons
          onUpdate={() =>
            dispatch(setCreateUserModal({ open: true, defaultUser: user }))
          }
          onDelete={() => deleteUser(user.id)}
          deleting={deleteUserIds.includes(user.id)}
          hasDelete={perms.delete}
          hasUpdate={perms.update}
        />
      ),
    });
  }

  return (
    <>
      {createUserModal.open && <CreateUserModal />}
      <TabledContent<User>
        pageTitle="Пользователи"
        actionButtons={
          perms.create ? (
            <Button
              onClick={() => dispatch(setCreateUserModal({ open: true }))}
              children="Добавить пользователя"
            />
          ) : undefined
        }
        dataSource={data?.users}
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: paginationParams.per_page,
          current: paginationParams.page,
          total: data?.meta.total,
          onChange: (page, per_page) => setPaginationParams({ page, per_page }),
        }}
      />
    </>
  );
};
