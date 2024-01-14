import { Checkbox, Form, Input, Select, message } from "antd";
import {
  createUser,
  editUser,
  getPermissions,
  getRoles,
} from "app/features/administration/administrationActions";
import {
  clearCreateMessage,
  setCreateUserModal,
} from "app/features/administration/administrationSlice";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";
import { useEffect } from "react";

const { Option } = Select;

export const CreateUserModal = () => {
  const dispatch = useDispatch();
  const {
    creating,
    createMessage,
    createUserModal,
    loadingRoles,
    roles,
    permissionsLoading,
    permissions,
  } = useSelector((state) => state.administration);
  const { open, defaultUser } = createUserModal;

  useEffect(() => {
    if (createMessage) {
      message.success(createMessage).then(() => dispatch(clearCreateMessage()));
    }
  }, [createMessage]);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getPermissions());
  }, []);

  return (
    <CreateModal
      openButtonProps={{
        onClick: () => dispatch(setCreateUserModal({ open: true })),
        children: `${defaultUser ? "Изменить" : "Добавить"} пользователя`,
      }}
      modalProps={{
        title: `${defaultUser ? "Изменить" : "Добавить"} пользователя`,
        open: open,
        onCancel: () => dispatch(setCreateUserModal({ open: false })),
      }}
      formProps={{
        name: "create-user",
        disabled: creating,
        onFinish: (values) =>
          dispatch(
            defaultUser
              ? editUser({ id: defaultUser.id, ...values })
              : createUser(values)
          ),
        initialValues: {
          is_admin: false,
          ...defaultUser,
          permissions: defaultUser?.permissions.map((p) => String(p.id)),
          roles: defaultUser?.roles.map((r) => String(r.id)),
        },
      }}
      submitButtonProps={{
        loading: creating,
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
          loading={loadingRoles}
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
