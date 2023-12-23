import type { ColumnsType } from "antd/es/table";
import { TabledContent } from "components/shared";
import { data } from "./mock_data";

type DormitoryDataType = (typeof data)[0];

const columns: ColumnsType<DormitoryDataType> = [
  {
    key: "number",
    dataIndex: "number",
    title: "Номер общежития",
  },
  {
    key: "address",
    dataIndex: "address",
    title: "Адрес",
  },
  {
    key: "room_count",
    dataIndex: "room_count",
    title: "Кол-во комнат",
  },
  {
    key: "student_count",
    dataIndex: "student_count",
    title: "Кол-во студентов",
  },
  {
    key: "capacity",
    dataIndex: "capacity",
    title: "Вместимость",
  },
];

export const DormitoriesContent = () => {
  return (
    <TabledContent<DormitoryDataType> dataSource={data} columns={columns} />
  );
};
