import { Form, Input, Select, message } from "antd";
import {
  createRole,
  getPermissions,
} from "app/features/administration/administrationActions";
import {
  clearCreateRoleMessage,
  setOpenCreateRolePopover,
} from "app/features/administration/administrationSlice";
import { useDispatch, useSelector } from "app/store";
import { CreateModal } from "components/shared/create-modal";
import { useEffect } from "react";
import { getFlatPermissions } from "../utils";

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
    <CreateModal
      openButtonProps={{
        onClick: () => dispatch(setOpenCreateRolePopover(true)),
        children: "Добавить роль",
      }}
      modalProps={{
        title: "Добавить роль",
        open: createRoleModalOpen,
        onCancel: () => dispatch(setOpenCreateRolePopover(false)),
      }}
      formProps={{
        name: "create-role",
        disabled: creatingRole,
        onFinish: (values) => dispatch(createRole(values)),
      }}
      submitButtonProps={{
        loading: creatingRole,
        children: "Добавить",
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
          {getFlatPermissions(permissions).map((perm) => (
            <Option key={perm.id}>{perm.title}</Option>
          ))}
        </Select>
      </Form.Item>
    </CreateModal>
  );
};
