import { UnknownAction } from "@reduxjs/toolkit";
import { Form, Input, Select, message } from "antd";
import {
  createRole,
  getPermissions,
  updateRole,
} from "app/features/administration/administrationActions";
import {
  clearCreateRoleMessage,
  setCreateRoleModal,
} from "app/features/administration/administrationSlice";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";
import { useEffect } from "react";

const { Option } = Select;

export const CreateRoleModal = () => {
  const dispatch = useDispatch();
  const {
    permissionsLoading,
    permissions,
    createRoleMessage,
    creatingRole,
    createRoleModal: { open, defaultRole },
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
    <CreateModal
      openButtonProps={{
        onClick: () => dispatch(setCreateRoleModal({ open: true })),
        children: `${defaultRole ? "Изменить" : "Добавить"} роль`,
      }}
      modalProps={{
        title: `${defaultRole ? "Изменить" : "Добавить"} роль`,
        open: open,
        onCancel: () => dispatch(setCreateRoleModal({ open: false })),
      }}
      formProps={{
        name: "create-role",
        disabled: creatingRole,
        onFinish: (values) =>
          dispatch(
            (defaultRole
              ? updateRole({ id: defaultRole.id, ...values })
              : createRole(values)) as unknown as UnknownAction
          ),
        initialValues: defaultRole
          ? {
              ...defaultRole,
              permissions: defaultRole.permissions.map((p) => String(p.id)),
            }
          : undefined,
      }}
      submitButtonProps={{
        loading: creatingRole,
        children: defaultRole ? "Изменить" : "Добавить",
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
