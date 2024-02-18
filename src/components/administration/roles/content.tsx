import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
  setCreateRoleModal,
  Role,
} from "app/features/roles";
import { useDispatch, useSelector } from "app/store";
import { TableActionButtons, TabledContent } from "components/shared";
import { useUserPermissions } from "hooks/useUserPermissions";
import { CreateRoleModal } from "./createRoleModal";

export const RolesPageContent = () => {
  const dispatch = useDispatch();
  const { roles: perms } = useUserPermissions();
  const { data: roles, isLoading } = useGetRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const { deleteRoleIds, createRoleModal } = useSelector(
    (state) => state.roles
  );

  const columns: ColumnsType<Role> = [
    {
      key: "title",
      dataIndex: "title",
      title: "Название",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      key: "permissions",
      dataIndex: "permissions",
      title: "Права",
      render: (permissions: Role["permissions"]) => (
        <Space size={4} wrap>
          {permissions?.map((perm) => (
            <Tag key={perm.id}>
              {perm.model} - {perm.title}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  if (perms.delete || perms.update) {
    columns.push({
      key: "actions",
      title: "Действия",
      render: (_, role) => (
        <TableActionButtons
          onUpdate={() =>
            dispatch(setCreateRoleModal({ open: true, defaultRole: role }))
          }
          onDelete={() => deleteRole(role.id)}
          deleting={deleteRoleIds.includes(role.id)}
          hasDelete={perms.delete}
          hasUpdate={perms.update}
        />
      ),
    });
  }

  return (
    <>
      {createRoleModal.open && <CreateRoleModal />}
      <TabledContent<Role>
        pageTitle="Роли"
        actionButtons={
          perms.create ? (
            <Button
              onClick={() => dispatch(setCreateRoleModal({ open: true }))}
              children="Добавить роль"
            />
          ) : undefined
        }
        dataSource={roles}
        columns={columns}
        loading={isLoading}
        pagination={false}
      />
    </>
  );
};
