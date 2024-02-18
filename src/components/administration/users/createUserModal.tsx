import { Checkbox, Form, Input, Select } from "antd";
import {
  CreateUserData,
  setCreateUserModal,
  useCreateUserMutation,
  useGetPermissionsQuery,
  useGetRolesQuery,
  useUpdateUserMutation,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";

const { Option } = Select;

export const CreateUserModal = () => {
  const dispatch = useDispatch();
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: permissions, isLoading: permissionsLoading } =
    useGetPermissionsQuery();
  const {
    createUserModal: { open, defaultUser },
  } = useSelector((state) => state.users);
  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const loading = creating || updating;

  const onFinish = (values: CreateUserData) => {
    if (defaultUser) {
      updateUser({ id: defaultUser.id, ...values });
    } else {
      createUser(values);
    }
  };

  return (
    <CreateModal<CreateUserData>
      modalProps={{
        title: `${defaultUser ? "Изменить" : "Добавить"} пользователя`,
        open: open,
        onCancel: () => dispatch(setCreateUserModal({ open: false })),
      }}
      formProps={{
        name: "create-user",
        disabled: loading,
        onFinish,
        initialValues: {
          is_admin: false,
          ...defaultUser,
          permissions: defaultUser?.permissions.map((p) => String(p.id)),
          roles: defaultUser?.roles.map((r) => String(r.id)),
        },
      }}
      submitButtonProps={{
        loading: loading,
        children: defaultUser ? "Изменить" : "Добавить",
      }}
    >
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: requiredMessage },
          { type: "email", message: "Некорректный email" },
        ]}
      >
        <Input />
      </Form.Item>
      {!defaultUser && (
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: requiredMessage }]}
        >
          <Input.Password />
        </Form.Item>
      )}
      <Form.Item label="Роли" name="roles">
        <Select
          mode="multiple"
          placeholder="Выберите роли"
          loading={rolesLoading}
        >
          {roles?.map((role) => (
            <Option key={role.id}>{role.title}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="permissions" label="Права">
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
      <Form.Item name="is_admin" valuePropName="checked">
        <Checkbox>Администратор</Checkbox>
      </Form.Item>
    </CreateModal>
  );
};
