import { ColumnsType } from "antd/es/table";
import { deleteRole } from "app/features";
import { Role } from "app/features/administration/types";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { DeleteButton } from "components/shared/delete-button";
import { CreateRoleModal } from "./createRoleModal";

export const RolesPageContent = () => {
  const { roles, loadingRoles, deleteRolesIds } = useSelector(
    (state) => state.administration
  );
  const dispatch = useDispatch();

  const columns: ColumnsType<Role> = [
    {
      key: "title",
      dataIndex: "title",
      title: "Название",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      key: "actions",
      title: "Действия",
      render: (_, { id }) => (
        <DeleteButton
          onClick={() => dispatch(deleteRole(id))}
          loading={deleteRolesIds.includes(id)}
        />
      ),
    },
  ];

  return (
    <TabledContent<Role>
      pageTitle="Роли"
      actionButtons={<CreateRoleModal />}
      dataSource={roles}
      columns={columns}
      loading={loadingRoles}
      pagination={false}
    />
  );
};
