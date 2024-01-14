import { Form, Input, InputNumber, Select } from "antd";
import {
  createRoom,
  setCreateRoomModal,
  setRoomCreatingErrors,
  updateRoom,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";
import s from "./dormitories.module.scss";

export const CreateDormRoomModal = () => {
  const dispatch = useDispatch();
  const { createRoomModal, creatingRoom, dormitories, loading } = useSelector(
    (state) => state.dormitories
  );
  const { open, defaultRoom, defaultDorm, errors } = createRoomModal;

  return (
    <CreateModal
      openButtonProps={{
        onClick: () => dispatch(setCreateRoomModal({ open: true })),
        children: `${defaultRoom ? "Изменить" : "Добавить"} комнату`,
      }}
      modalProps={{
        title: `${defaultRoom ? "Изменить" : "Добавить"} комнату`,
        open: open,
        onCancel: () => dispatch(setCreateRoomModal({ open: false })),
      }}
      formProps={{
        name: "create-room",
        disabled: creatingRoom,
        onFinish: (values) =>
          dispatch(
            defaultRoom
              ? updateRoom({
                  id: defaultRoom.id,
                  oldDorm: defaultDorm,
                  ...values,
                })
              : createRoom(values)
          ),
        initialValues: {
          dorm: defaultDorm ? String(defaultDorm) : undefined,
          ...defaultRoom,
        },
      }}
      submitButtonProps={{
        loading: creatingRoom,
        children: defaultRoom ? "Изменить" : "Добавить",
      }}
    >
      <Form.Item
        name="dorm"
        label="Общежитие"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Select loading={loading}>
          {dormitories.map((dorm) => (
            <Select.Option key={dorm.id}>
              {dorm.number} / {dorm.address}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="number"
        label="Номер"
        rules={[{ required: true, message: requiredMessage }]}
        validateStatus={errors?.number && "error"}
        help={errors?.number}
      >
        <InputNumber
          className={s.numberInput}
          min={1}
          onChange={() =>
            dispatch(setRoomCreatingErrors({ ...errors, number: undefined }))
          }
        />
      </Form.Item>
      <Form.Item
        name="number_of_seats"
        label="Количество мест"
        rules={[{ required: true, message: requiredMessage }]}
        validateStatus={errors?.number_of_seats && "error"}
        help={errors?.number_of_seats}
      >
        <InputNumber className={s.numberInput} min={1} />
      </Form.Item>
      <Form.Item
        name="comment"
        label="Комментарий"
        validateStatus={errors?.comment && "error"}
        help={errors?.comment}
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input.TextArea />
      </Form.Item>
    </CreateModal>
  );
};
