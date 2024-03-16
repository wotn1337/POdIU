import { List, Popover } from "antd";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.scss";
import { Item } from "./utils";

type Props = React.PropsWithChildren<{
  item: Item;
}>;

export const ItemTooltip: React.FC<Props> = ({ item, children }) => {
  const data = [
    {
      title: "ФИО (Кириллица)",
      description: item.groupProps.cyrillic_name,
    },
    {
      title: "ФИО (Латиница)",
      description: item.groupProps.latin_name,
    },
    {
      title: "Номер комнаты",
      description: item.groupProps.room,
    },
    {
      title: "Дата и время заселения",
      description: item.start_time.format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Дата и время выселения",
      description: !item.untilNow
        ? item.end_time.format("DD.MM.YYYY HH:mm")
        : "-",
    },
  ];

  return (
    <Popover
      trigger={["click"]}
      content={
        <List
          itemLayout="horizontal"
          style={{ width: 300 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item style={{ padding: "8px 0" }}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      }
    >
      {children}
    </Popover>
  );
};
