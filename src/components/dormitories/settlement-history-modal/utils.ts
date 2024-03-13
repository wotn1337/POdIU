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

export const getSettlementHistory = (data?: SettlementHistory[]) => {
  const resultObj: Record<number, SettlementHistory[]> = {};

  data?.forEach((item) => {
    if (resultObj[item.student.id]) {
      resultObj[item.student.id] = [...resultObj[item.student.id], item].sort(
        (a, b) => moment(a.created_at).diff(moment(b.created_at))
      );
    } else {
      resultObj[item.student.id] = [item];
    }
  });

  const groups: Group[] = [];
  const items: Item[] = [];
  Object.entries(resultObj).forEach(([key, value]) => {
    groups.push({ id: key, title: value[0].student.cyrillic_name });

    for (let i = 0; i < value.length; i += 2) {
      const end_time =
        value.length === 1 && value[i].settlement_status.title === "Выселение"
          ? value[i].created_at
          : undefined;
      items.push({
        id: `${value[i].student.id}-${i}`,
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
