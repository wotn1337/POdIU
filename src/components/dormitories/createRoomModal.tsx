import { Form, Input, InputNumber, Select } from "antd";
import {
  setCreateRoomModal,
  useCreateRoomMutation,
  useGetDormitoriesQuery,
  useUpdateRoomMutation,
} from "app/features";
import { CreateRoomData } from "app/features/rooms/types";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";
import s from "./dormitories.module.scss";

export const CreateRoomModal = () => {
  const dispatch = useDispatch();
  const {
    createRoomModal: { open, defaultRoom, defaultDorm },
  } = useSelector((state) => state.rooms);
  const { data: dormitoriesData } = useGetDormitoriesQuery({
    page: 1,
    per_page: 100,
  });
  const [createRoom, { isLoading: creating }] = useCreateRoomMutation();
  const [updateRoom, { isLoading: updating }] = useUpdateRoomMutation();
  const loading = creating || updating;

  const onFinish = (values: CreateRoomData) => {
    if (defaultRoom) {
      updateRoom({ id: defaultRoom.id, ...values });
    } else {
      createRoom(values);
    }
  };

  return (
    <CreateModal<CreateRoomData>
      modalProps={{
        title: `${defaultRoom ? "Изменить" : "Добавить"} комнату`,
        onCancel: () => dispatch(setCreateRoomModal({ open: false })),
        open,
      }}
      formProps={{
        name: "create-room",
        disabled: loading,
        onFinish,
        initialValues: {
          dormitory_id: String(defaultDorm),
          ...defaultRoom,
        },
      }}
      submitButtonProps={{
        loading,
        children: defaultRoom ? "Изменить" : "Добавить",
      }}
    >
      <Form.Item
        name="dormitory_id"
        label="Общежитие"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Select loading={loading}>
          {dormitoriesData?.dormitories.map((dorm) => (
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
        // validateStatus={errors?.number && "error"}
        // help={errors?.number}
      >
        <InputNumber
          className={s.numberInput}
          min={1}
          onChange={
            () => {}
            // dispatch(setRoomCreatingErrors({ ...errors, number: undefined }))
          }
        />
      </Form.Item>
      <Form.Item
        name="number_of_seats"
        label="Количество мест"
        rules={[{ required: true, message: requiredMessage }]}
        // validateStatus={errors?.number_of_seats && "error"}
        // help={errors?.number_of_seats}
      >
        <InputNumber className={s.numberInput} min={1} />
      </Form.Item>
      <Form.Item
        name="comment"
        label="Комментарий"
        // validateStatus={errors?.comment && "error"}
        // help={errors?.comment}
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input.TextArea />
      </Form.Item>
    </CreateModal>
  );
};
