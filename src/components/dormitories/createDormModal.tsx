import { Form, Input, InputNumber } from "antd";
import { createDormitory, setCreateModal, updateDormitory } from "app/features";
import { useDispatch, useSelector } from "app/store";
import { CreateModal } from "components/shared/create-modal";
import s from "./dormitories.module.scss";
import { requiredMessage } from "assets/constants";

export const CreateDormModal = () => {
  const dispatch = useDispatch();
  const { createModal, creating } = useSelector((state) => state.dormitories);
  const { open, defaultDorm } = createModal;

  return (
    <CreateModal
      openButtonProps={{
        onClick: () => dispatch(setCreateModal({ open: true })),
        children: "Добавить общежитие",
      }}
      modalProps={{
        title: `${defaultDorm ? "Изменить" : "Добавить"} общежитие`,
        open: open,
        onCancel: () => dispatch(setCreateModal({ open: false })),
      }}
      formProps={{
        name: "create-dormitory",
        disabled: creating,
        onFinish: (values) =>
          dispatch(
            defaultDorm
              ? updateDormitory({ id: defaultDorm.id, ...values })
              : createDormitory(values)
          ),
        initialValues: defaultDorm,
      }}
      submitButtonProps={{
        loading: creating,
        children: defaultDorm ? "Изменить" : "Добавить",
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
