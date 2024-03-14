import { Modal, Space, Statistic } from "antd";
import { Student } from "app/features";
import { SettlementHistoryTimeline } from "components/shared";
import "react-calendar-timeline/lib/Timeline.css";
import s from "./students.module.scss";

type Props = {
  student: Student;
  onCancel: () => void;
};

export const SettlementHistoryModal: React.FC<Props> = ({
  onCancel,
  student,
}) => {
  return (
    <Modal
      className={s.settlementHistoryModal}
      open={true}
      title="История поселения"
      onCancel={onCancel}
      destroyOnClose
      getContainer={false}
      footer={null}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Statistic title={student.latin_name} value={student.cyrillic_name} />
        <SettlementHistoryTimeline type="student" itemId={student.id} />
      </Space>
    </Modal>
  );
};
