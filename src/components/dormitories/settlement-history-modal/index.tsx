import { Divider, Empty, Modal, Space, Spin, Statistic } from "antd";
import { Dormitory, useGetSettlementHistoryQuery } from "app/features";
import { Room } from "app/features/rooms/types";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import { getSettlementHistory } from "./utils";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.scss";

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
  const { data, isLoading, isFetching } = useGetSettlementHistoryQuery({
    page: 1,
    per_page: 100,
    dorm_room_id: room.id,
  });

  const { groups, items } = getSettlementHistory(
    data?.settlement_history_records
  );

  return (
    <Modal
      className="settlement-history-modal"
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
        <Spin spinning={isLoading || isFetching}>
          {data?.settlement_history_records.length ? (
            <Timeline
              groups={groups}
              items={items}
              defaultTimeStart={moment().add(-12, "hour")}
              defaultTimeEnd={moment().add(12, "hour")}
              canResize={false}
              canMove={false}
              className="settlement-timeline"
              sidebarWidth={300}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет данных"
            />
          )}
        </Spin>
      </Space>
    </Modal>
  );
};
