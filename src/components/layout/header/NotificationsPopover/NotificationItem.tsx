import { CheckCircleTwoTone } from "@ant-design/icons";
import { Badge, List, Tooltip } from "antd";
import { NotificationType, useReadNotificationMutation } from "app/features";
import moment from "moment";
import s from "../header.module.scss";

export const NotificationItem: React.FC<NotificationType> = ({
  data,
  id,
  read_at,
  type,
  created_at,
}) => {
  const [readNotification] = useReadNotificationMutation();
  const onNotificationClick = (id: number, notReaded: boolean) => {
    if (notReaded) {
      readNotification(id);
    }
  };

  return (
    <Tooltip title={data.message}>
      <List.Item
        onClick={() => onNotificationClick(id, !read_at)}
        className={s.notification}
      >
        <List.Item.Meta
          title={
            <Badge dot={!read_at} offset={[3, 0]}>
              {type}
            </Badge>
          }
          description={moment(created_at).format("DD.MM.YYYY HH:MM")}
        />
        {data.status === "success" && (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        )}
      </List.Item>
    </Tooltip>
  );
};
