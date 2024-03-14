import { HistoryOutlined, LoginOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import {
  Dormitory,
  Room,
  setSettlementHistoryModal,
  setSettlementModalByRoom,
} from "app/features";
import store from "app/store";

type Props = {
  hasSettle: boolean;
  hasSettlementHistory: boolean;
  room: Room;
  dispatch: typeof store.dispatch;
  dorm?: Dormitory;
};

export const getActionButtons = ({
  dispatch,
  dorm,
  hasSettle,
  hasSettlementHistory,
  room,
}: Props) => {
  const items: MenuProps["items"] = [];

  if (hasSettle) {
    items.push({
      key: "settle",
      label: "Поселить",
      icon: <LoginOutlined />,
      disabled: room.empty_seats_count === 0,
      onClick: () => dispatch(setSettlementModalByRoom({ room })),
    });
  }

  if (hasSettlementHistory) {
    items.push({
      key: "settlement-history",
      label: "История поселения",
      icon: <HistoryOutlined />,
      onClick: () => {
        if (dorm) {
          dispatch(setSettlementHistoryModal({ room, dorm }));
        }
      },
    });
  }

  return items;
};
