import { Form, Input, InputNumber } from "antd";
import { createDormitory, setOpenCreateModal } from "app/features";
import { useDispatch, useSelector } from "app/store";
import { CreateModal } from "components/shared/create-modal";
import s from "./dormitories.module.scss";

const requiredMessage = "Это поле обязательно для заполнения";

export const CreateDormModal = () => {
  const dispatch = useDispatch();
  const { openCreateModal, creating } = useSelector(
    (state) => state.dormitories
  );

  return (
    <CreateModal
      openButtonProps={{
        onClick: () => dispatch(setOpenCreateModal(true)),
        children: "Добавить общежитие",
      }}
      modalProps={{
        title: "Добавить общежитие",
        open: openCreateModal,
        onCancel: () => dispatch(setOpenCreateModal(false)),
      }}
      formProps={{
        name: "create-role",
        disabled: creating,
        onFinish: (values) => dispatch(createDormitory(values)),
      }}
      submitButtonProps={{
        loading: creating,
        children: "Добавить",
      }}
    >
      <Form.Item
        name="number"
        label="Номер"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <InputNumber className={s.numberInput} min={1} />
      </Form.Item>
      <Form.Item
        name="address"
        label="Адрес"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="comment"
        label="Комментарий"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input.TextArea />
      </Form.Item>
    </CreateModal>
  );
};
