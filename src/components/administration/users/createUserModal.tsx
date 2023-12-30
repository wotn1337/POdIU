import { Checkbox, Form, Input, Select, message } from "antd";
import {
  createUser,
  getPermissions,
  getRoles,
} from "app/features/administration/administrationActions";
import {
  clearCreateMessage,
  setOpenCreateUserPopover,
} from "app/features/administration/administrationSlice";
import { useDispatch, useSelector } from "app/store";
import { CreateModal } from "components/shared/create-modal";
import { useEffect } from "react";
import { getFlatPermissions } from "../utils";

const { Option } = Select;

const requiredMessage = "Это поле обязательно для заполнения";

export const CreateUserModal = () => {
  const dispatch = useDispatch();
  const {
    creating,
    createMessage,
    createUserModalOpen,
    loadingRoles,
    roles,
    permissionsLoading,
    permissions,
  } = useSelector((state) => state.administration);

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
        onClick: () => dispatch(setOpenCreateUserPopover(true)),
        children: "Добавить пользователя",
      }}
      modalProps={{
        title: "Добавить пользователя",
        open: createUserModalOpen,
        onCancel: () => dispatch(setOpenCreateUserPopover(false)),
      }}
      formProps={{
        name: "create-user",
        disabled: creating,
        onFinish: (values) => dispatch(createUser(values)),
        initialValues: { is_admin: false },
      }}
      submitButtonProps={{
        loading: creating,
        children: "Добавить",
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
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input.Password />
      </Form.Item>
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
          {getFlatPermissions(permissions).map((perm) => (
            <Option key={perm.id}>{perm.title}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="is_admin" valuePropName="checked">
        <Checkbox>Администратор</Checkbox>
      </Form.Item>
    </CreateModal>
  );
};
