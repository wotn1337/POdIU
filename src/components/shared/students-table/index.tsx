import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { getStudents } from "app/features";
import { setPage, setPageSize } from "app/features/students/studentsSlice";
import { Student } from "app/features/students/types";
import { useDispatch, useSelector } from "app/store";
import { useEffect } from "react";

const columns: ColumnsType<Student> = [
  {
    key: "cyrillic_name",
    dataIndex: "cyrillic_name",
    title: "ФИО (Кириллица)",
  },
  {
    key: "latin_name",
    dataIndex: "latin_name",
    title: "ФИО (Латиница)",
  },
  {
    key: "gender",
    dataIndex: "gender",
    title: "Пол",
    render: (value) => value?.title,
  },
  {
    key: "dorm_room",
    dataIndex: ["dorm_room", "number"],
    title: "Номер комнаты",
  },
  {
    key: "country",
    dataIndex: "country",
    title: "Страна",
    render: (value) => value?.title,
  },
  {
    key: "eisu_id",
    dataIndex: "eisu_id",
    title: "ЕИСУ",
  },
  {
    key: "academic_group",
    dataIndex: "academic_group",
    title: "Группа",
    render: (value) => value?.title,
  },
  {
    key: "telephone",
    dataIndex: "telephone",
    title: "Номер телефона",
  },
  {
    key: "comment",
    dataIndex: "comment",
    title: "Комментарий",
  },
];

type Props = TableProps<Student> & {
  with_dormitory?: boolean;
};

export const StudentsTable: React.FC<Props> = ({
  with_dormitory = true,
  ...props
}) => {
  const { students, current_page, per_page, loading, total } = useSelector(
    (state) => state.students
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents({ page: current_page, per_page, with_dormitory }));
  }, [current_page, per_page]);

  return (
    <Table
      dataSource={students}
      columns={columns}
      loading={loading}
      rowSelection={{ type: "radio" }}
      rowKey="id"
      scroll={{ x: "100%" }}
      pagination={{
        pageSizeOptions: [5, 10, 20, 50],
        showSizeChanger: true,
        total,
        showTotal: (total, range) =>
          `Показано ${range.join(" - ")} (всего ${total})`,
        locale: { items_per_page: "строк на страницу" },
        onChange: (page, pageSize) => {
          dispatch(setPage(page));
          dispatch(setPageSize(pageSize));
        },
        ...props.pagination,
      }}
      {...props}
    />
  );
};
