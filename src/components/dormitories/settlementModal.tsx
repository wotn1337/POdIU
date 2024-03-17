import { Modal, Typography } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import {
  setSettlementModalByRoom,
  useSettleStudentMutation,
} from "app/features";
import { Room } from "app/features/rooms/types";
import { Student } from "app/features/students/types";
import { useDispatch } from "app/store";
import { StudentsTable } from "components/shared";
import { useState } from "react";
import s from "./dormitories.module.scss";

type Props = {
  room: Room;
  onCancel: () => void;
};

export const SettlementModal: React.FC<Props> = ({ room, onCancel }) => {
  const dispatch = useDispatch();
  const initialSelection = room.students?.map((s) => s.id);
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    React.Key[] | undefined
  >(initialSelection);
  const [selectedStudents, setSelectedStudents] = useState<
    Student[] | undefined
  >(room.students);
  const [settleStudent] = useSettleStudentMutation();
  const [loading, setLoading] = useState(false);

  const onSettlement = () => {
    setLoading(true);
    const studentsToUpdate =
      selectedStudents?.filter(({ id }) => !initialSelection?.includes(id)) ??
      [];
    Promise.all(
      studentsToUpdate.map((s) =>
        settleStudent({ studentId: s.id, roomId: room.id })
      )
    )
      .then(() => dispatch(setSettlementModalByRoom(undefined)))
      .finally(() => setLoading(false));
  };

  const onSelectionChange: TableRowSelection<Student>["onChange"] = (
    selectedRowKeys,
    selectedRows
  ) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedStudents(selectedRows);
  };

  return (
    <Modal
      className={s.settlementModal}
      open={true}
      title="Поселение"
      onCancel={onCancel}
      destroyOnClose
      getContainer={false}
      cancelText="Закрыть"
      okText="Поселить"
      onOk={onSettlement}
      okButtonProps={{ loading }}
    >
      <Typography.Title level={5} className={s.cyrillicName}>
        Комната №{room?.number}
      </Typography.Title>
      <StudentsTable
        selection={{
          selectedRowKeys,
          onChange: onSelectionChange,
          hideSelectAll: true,
          getCheckboxProps: ({ id, dorm_room }) => ({
            disabled:
              !!dorm_room ||
              (selectedRowKeys?.length === room.number_of_seats &&
                !selectedRowKeys.includes(id)),
          }),
        }}
        withRoom
        initFilters={{ has_dorm_room: false }}
      />
    </Modal>
  );
};
