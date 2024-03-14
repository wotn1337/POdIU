import { Empty, Spin } from "antd";
import { useGetSettlementHistoryQuery } from "app/features";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.scss";
import { getSettlementHistory } from "./utils";

type Props = {
  itemId: number;
  type: "student" | "room";
};

export const SettlementHistoryTimeline: React.FC<Props> = ({
  itemId,
  type,
}) => {
  const { data, isLoading, isFetching } = useGetSettlementHistoryQuery({
    page: 1,
    per_page: 100,
    dorm_room_id: type === "room" ? itemId : undefined,
    student_id: type === "student" ? itemId : undefined,
  });

  const { groups, items } = getSettlementHistory(
    type,
    data?.settlement_history_records
  );

  return (
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
          sidebarWidth={type === "room" ? 300 : 100}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
      )}
    </Spin>
  );
};
