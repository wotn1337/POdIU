import { Button, Form, Input, Modal, Select, message } from "antd";
import {
  createRole,
  getPermissions,
} from "app/features/administration/administrationActions";
import { useDispatch, useSelector } from "app/store";
import { useEffect } from "react";
import s from "./administration.module.scss";
import { getFlatPermissions } from "./utils";
import {
  clearCreateRoleMessage,
  setOpenCreateRolePopover,
} from "app/features/administration/administrationSlice";

const { Option } = Select;

const requiredMessage = "Это поле обязательно для заполнения";

export const CreateRoleModal = () => {
  const dispatch = useDispatch();
  const {
    permissionsLoading,
    permissions,
    createRoleMessage,
    creatingRole,
    createRoleModalOpen,
  } = useSelector((state) => state.administration);

  useEffect(() => {
    dispatch(getPermissions());
  }, []);

  useEffect(() => {
    if (createRoleMessage) {
      message
        .success(createRoleMessage)
        .then(() => dispatch(clearCreateRoleMessage()));
    }
  }, [createRoleMessage]);

  return (
    <>
      <Button onClick={() => dispatch(setOpenCreateRolePopover(true))}>
        Добавить роль
      </Button>
      <Modal
        title="Добавить роль"
        open={createRoleModalOpen}
        footer={null}
        destroyOnClose
        getContainer={false}
        onCancel={() => dispatch(setOpenCreateRolePopover(false))}
      >
        <Form
          name="create-role"
          className={s.createUserForm}
          onFinish={(values) => dispatch(createRole(values))}
          disabled={creatingRole}
        >
          <Form.Item
            label="Название"
            name="title"
            rules={[{ required: true, message: requiredMessage }]}
          >
            <Input
              onChange={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            />
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
              {getFlatPermissions(permissions).map((perm) => (
                <Option key={perm.id}>{perm.title}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className={s.submitButtonWrapper}>
            <Button
              type="primary"
              htmlType="submit"
              className={s.submitButton}
              loading={creatingRole}
            >
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
