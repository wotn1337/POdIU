import { Divider, Modal, Space, Statistic } from "antd";
import { Dormitory } from "app/features";
import { Room } from "app/features/rooms/types";
import { SettlementHistoryTimeline } from "components/shared";
import "react-calendar-timeline/lib/Timeline.css";
import s from "./dormitories.module.scss";

type Props = {
  dorm: Dormitory;
  room: Room;
  onCancel: () => void;
};

export const SettlementHistoryModal: React.FC<Props> = ({
  room,
  onCancel,
  dorm,
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
        <Space>
          <Statistic title="Номер общежития" value={dorm.number} />
          <Divider type="vertical" />
          <Statistic title="Номер комнаты" value={room.number} />
        </Space>
        <SettlementHistoryTimeline type="room" itemId={room.id} />
      </Space>
    </Modal>
  );
};
