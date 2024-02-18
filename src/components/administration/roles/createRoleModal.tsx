import { Form, Input, Select } from "antd";
import {
  CreateRoleData,
  setCreateRoleModal,
  useGetPermissionsQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";

const { Option } = Select;

export const CreateRoleModal = () => {
  const [createRole, { isLoading: creating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: updating }] = useUpdateRoleMutation();
  const loading = creating || updating;
  const { data: permissions, isLoading: permissionsLoading } =
    useGetPermissionsQuery();
  const dispatch = useDispatch();
  const {
    createRoleModal: { open, defaultRole },
  } = useSelector((state) => state.roles);

  const onFinish = (values: CreateRoleData) => {
    if (defaultRole) {
      updateRole({ id: defaultRole.id, ...values });
    } else {
      createRole(values);
    }
  };

  return (
    <CreateModal<CreateRoleData>
      modalProps={{
        title: `${defaultRole ? "Изменить" : "Добавить"} роль`,
        open: open,
        onCancel: () => dispatch(setCreateRoleModal({ open: false })),
      }}
      formProps={{
        name: "create-role",
        disabled: loading,
        onFinish,
        initialValues: defaultRole
          ? {
              ...defaultRole,
              permissions: defaultRole.permissions.map((p) => String(p.id)),
            }
          : undefined,
      }}
      submitButtonProps={{
        children: defaultRole ? "Изменить" : "Добавить",
        loading,
      }}
    >
      <Form.Item
        label="Название"
        name="title"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="permissions"
        label="Права"
        rules={[
          {
            required: true,
            message: "Выберите права для роли",
            type: "array",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Выберите права"
          loading={permissionsLoading}
        >
          {permissions?.map((perm) => (
            <Option key={perm.id}>
              {perm.model} - {perm.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </CreateModal>
  );
};
