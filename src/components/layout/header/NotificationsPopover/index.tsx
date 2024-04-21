import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Popover } from "antd";
import { useGetUserNotificationsQuery } from "app/features";
import s from "../header.module.scss";
import { NotificationList } from "./NotificationList";
import { useSelector } from "app/store";

export const NotificationsDropdown = () => {
  useGetUserNotificationsQuery(
    { page: 1, per_page: 5 },
    { pollingInterval: 15000 }
  );
  const { notifications } = useSelector((state) => state.users);

  return (
    <Popover
      content={<NotificationList />}
      placement="bottomRight"
      title="Уведомления"
      trigger="click"
      className={s.header__notificationPopover}
      getPopupContainer={(node) => node}
      destroyTooltipOnHide
    >
      <Badge dot={notifications.some((n) => !n.read_at)}>
        <Button
          icon={<BellOutlined />}
          className={s.header__notificationButton}
        />
      </Badge>
    </Popover>
  );
};
