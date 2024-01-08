import { Modal, Typography } from "antd";
import {
  setSettlementModal,
  updateStudent,
  updateStudentRoom,
} from "app/features";
import { CreateStudentResponse } from "app/features/students/types";
import { useDispatch, useSelector } from "app/store";
import { StudentsTable } from "components/shared";
import { useState } from "react";
import s from "./dormitories.module.scss";

export const SettlementModal = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dispatch = useDispatch();
  const {
    settlementModal: { open, dorm, room },
  } = useSelector((state) => state.dormitories);
  const { students } = useSelector((state) => state.students);

  const onSettlement = () => {
    const student = students.find((s) => s.id === selectedRowKeys[0]);
    if (student) {
      dispatch(
        updateStudent({
          ...student,
          gender_id: student.gender?.id,
          academic_group_id: student.academic_group?.id,
          country_id: student.country?.id,
          dorm_room_id: Number(room?.id),
        })
      ).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          const payload = data.payload as CreateStudentResponse;
          console.log(data);
          dispatch(setSettlementModal({ open: false }));
          dispatch(
            updateStudentRoom({
              type: "set",
              dormId: dorm?.id,
              roomId: room?.id,
              student: payload.student,
            })
          );
        }
      });
    }
  };

  return (
    <Modal
      className={s.settlementModal}
      open={open}
      title="Поселение"
      onCancel={() => dispatch(setSettlementModal({ open: false }))}
      destroyOnClose
      getContainer={false}
      cancelText="Закрыть"
      okButtonProps={{ disabled: !selectedRowKeys.length }}
      okText="Поселить"
      onOk={onSettlement}
    >
      <Typography.Title level={5} className={s.cyrillicName}>
        Общежитие №{dorm?.number} / Комната №{room?.number}
      </Typography.Title>
      <StudentsTable
        rowSelection={{
          type: "radio",
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />
    </Modal>
  );
};
