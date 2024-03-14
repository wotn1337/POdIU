import {
  HistoryOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

type Props = {
  hasSettle: boolean;
  hasEvict: boolean;
  onSettle: () => void;
  onEvict: () => void;
  hasSettlementHistory: boolean;
  onOpenSettlementHistory: () => void;
  disableSettle: boolean;
  disableEvict: boolean;
};

export const getActionButtons = ({
  hasSettle,
  hasEvict,
  onSettle,
  onEvict,
  hasSettlementHistory,
  onOpenSettlementHistory,
  disableSettle,
  disableEvict,
}: Props) => {
  const items: MenuProps["items"] = [];

  if (hasSettle) {
    items.push({
      key: "settle",
      label: "Поселить",
      icon: <LoginOutlined />,
      onClick: onSettle,
      disabled: disableSettle,
    });
  }

  if (hasEvict) {
    items.push({
      key: "evict",
      label: "Выселить",
      icon: <LogoutOutlined />,
      onClick: onEvict,
      disabled: disableEvict,
    });
  }

  if (hasSettlementHistory) {
    items.push({
      key: "settlement-history",
      label: "История поселения",
      icon: <HistoryOutlined />,
      onClick: onOpenSettlementHistory,
    });
  }

  return items;
};
