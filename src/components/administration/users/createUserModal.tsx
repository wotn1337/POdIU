import { Button, Checkbox, Form, Input, Modal, Select, message } from "antd";
import {
  createUser,
  getRoles,
} from "app/features/administration/administrationActions";
import {
  clearCreateMessage,
  setOpenCreateUserPopover,
} from "app/features/administration/administrationSlice";
import { useDispatch, useSelector } from "app/store";
import { useEffect } from "react";
import { getFlatPermissions } from "../utils";
import s from "../administration.module.scss";

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
  }, []);

  return (
    <>
      <Button onClick={() => dispatch(setOpenCreateUserPopover(true))}>
        Добавить пользователя
      </Button>
      <Modal
        title="Добавить пользователя"
        open={createUserModalOpen}
        footer={null}
        destroyOnClose
        getContainer={false}
        onCancel={() => dispatch(setOpenCreateUserPopover(false))}
      >
        <Form
          name="create-user"
          className={s.createForm}
          disabled={creating}
          onFinish={(values) => dispatch(createUser(values))}
          initialValues={{ is_admin: false }}
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

          <Form.Item className={s.submitButtonWrapper}>
            <Button
              type="primary"
              htmlType="submit"
              className={s.submitButton}
              loading={creating}
            >
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
