import type { ColumnsType } from "antd/es/table";
import { TabledContent } from "components/shared";
import { data } from "./mock_data";

type StudentDataType = (typeof data)[0];

const columns: ColumnsType<StudentDataType> = [
  {
    key: "name_сyrillic",
    dataIndex: "name_сyrillic",
    title: "ФИО (Кириллица)",
  },
  {
    key: "name_latin",
    dataIndex: "name_latin",
    title: "ФИО (Латиница)",
  },
  {
    key: "gender",
    dataIndex: "gender",
    title: "Пол",
  },
  {
    key: "birthday",
    dataIndex: "birthday",
    title: "Дата рождения",
  },
  {
    key: "eisu",
    dataIndex: "eisu",
    title: "ЕИСУ",
  },
  {
    key: "group",
    dataIndex: "group",
    title: "Номер группы",
  },
  {
    key: "room",
    dataIndex: "room",
    title: "Номер комнаты",
  },
  {
    key: "dorm",
    dataIndex: "dorm",
    title: "Номер общежития",
  },
  {
    key: "comment",
    dataIndex: "comment",
    title: "Комментарий",
  },
];

export const StudentsPageContent = () => {
  return <TabledContent<StudentDataType> dataSource={data} columns={columns} />;
};
