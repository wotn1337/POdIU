import { Form, Input, InputNumber } from "antd";
import {
  CreateDormitoryData,
  setCreateDormitoryModal,
  useCreateDormitoryMutation,
  useUpdateDormitoryMutation,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";
import s from "./dormitories.module.scss";

export const CreateDormitoryModal = () => {
  const dispatch = useDispatch();
  const {
    createDormitoryModal: { open, defaultDormitory },
  } = useSelector((state) => state.dormitories);
  const [createDormitory, { isLoading: creating }] =
    useCreateDormitoryMutation();
  const [updateDormitory, { isLoading: updating }] =
    useUpdateDormitoryMutation();
  const loading = creating || updating;

  const onFinish = (values: CreateDormitoryData) => {
    if (defaultDormitory) {
      updateDormitory({ id: defaultDormitory.id, ...values });
    } else {
      createDormitory(values);
    }
  };

  return (
    <CreateModal<CreateDormitoryData>
      modalProps={{
        title: `${defaultDormitory ? "Изменить" : "Добавить"} общежитие`,
        open: open,
        onCancel: () => dispatch(setCreateDormitoryModal({ open: false })),
      }}
      formProps={{
        name: "create-dormitory",
        disabled: loading,
        onFinish,
        initialValues: defaultDormitory,
      }}
      submitButtonProps={{
        loading,
        children: defaultDormitory ? "Изменить" : "Добавить",
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
