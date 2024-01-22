import { ColumnsType } from "antd/es/table";
import { deleteRole } from "app/features";
import { Role } from "app/features/administration/types";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { DeleteButton } from "components/shared/delete-button";
import { CreateRoleModal } from "./createRoleModal";
import { useUserPermissions } from "hooks/useUserPermissions";
import { Button, Space, Tag } from "antd";
import { setCreateRoleModal } from "app/features/administration/administrationSlice";

export const RolesPageContent = () => {
  const { roles, loadingRoles, deleteRolesIds } = useSelector(
    (state) => state.administration
  );
  const dispatch = useDispatch();
  const { roles: perms } = useUserPermissions();

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
        <Space>
          {perms.update && (
            <Button
              type="primary"
              onClick={() =>
                dispatch(setCreateRoleModal({ open: true, defaultRole: role }))
              }
            >
              Изменить
            </Button>
          )}
          {perms.delete && (
            <DeleteButton
              onClick={() => dispatch(deleteRole(role.id))}
              loading={deleteRolesIds.includes(role.id)}
            />
          )}
        </Space>
      ),
    });
  }

  return (
    <TabledContent<Role>
      pageTitle="Роли"
      actionButtons={perms.create ? <CreateRoleModal /> : undefined}
      dataSource={roles}
      columns={columns}
      loading={loadingRoles}
      pagination={false}
    />
  );
};
