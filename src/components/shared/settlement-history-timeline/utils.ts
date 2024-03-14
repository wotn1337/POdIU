import { SettlementHistory } from "app/features";
import moment from "moment";

type Group = {
  id: number | string;
  title: string;
};

type Item = {
  id: number | string;
  group: number | string;
  title: string;
  start_time: moment.Moment;
  end_time: moment.Moment;
};

export const getSettlementHistory = (
  type: "student" | "room",
  data?: SettlementHistory[]
) => {
  const resultObj: Record<number, SettlementHistory[]> = {};

  data?.forEach((item) => {
    const key = type === "student" ? item.dorm_room.id : item.student.id;
    if (resultObj[key]) {
      resultObj[key] = [...resultObj[key], item].sort((a, b) =>
        moment(a.created_at).diff(moment(b.created_at))
      );
    } else {
      resultObj[key] = [item];
    }
  });

  const groups: Group[] = [];
  const items: Item[] = [];
  Object.entries(resultObj).forEach(([key, value]) => {
    const groupTitle =
      type === "student"
        ? value[0].dorm_room.number
        : value[0].student.cyrillic_name;
    groups.push({ id: key, title: groupTitle });

    for (let i = 0; i < value.length; i += 2) {
      const end_time =
        value.length === 1 && value[i].settlement_status.title === "Выселение"
          ? value[i].created_at
          : undefined;
      const itemId =
        type === "student"
          ? `${value[i].dorm_room.id}-${i}`
          : `${value[i].student.id}-${i}`;
      items.push({
        id: itemId,
        group: key,
        title: "",
        start_time: moment(value[i].created_at),
        end_time: moment(
          i === value.length - 1 ? end_time : value[i + 1].created_at
        ),
      });
    }
  });
  return { groups, items };
};
