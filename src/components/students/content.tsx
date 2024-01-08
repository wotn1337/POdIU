import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteStudent } from "app/features";
import {
  setCreateModal,
  setPage,
  setPageSize,
  setSettlementModal,
} from "app/features/students/studentsSlice";
import { Student } from "app/features/students/types";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { DeleteButton } from "components/shared/delete-button";
import { CreateStudentModal } from "./createStudentModal";
import { SettlementModal } from "./settlementModal";

export const StudentsPageContent = () => {
  const { students, loading, current_page, total, per_page, deletingIds } =
    useSelector((state) => state.students);
  const dispatch = useDispatch();

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
    {
      key: "actions",
      title: "Действия",
      render: (_, student) => (
        <Space>
          <Button
            type="primary"
            onClick={() =>
              dispatch(setSettlementModal({ open: true, student }))
            }
          >
            Поселить
          </Button>
          <Button
            onClick={() =>
              dispatch(setCreateModal({ open: true, defaultStudent: student }))
            }
          >
            Изменить
          </Button>
          <DeleteButton
            onClick={() => dispatch(deleteStudent(student.id))}
            loading={deletingIds.includes(student.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <SettlementModal />
      <TabledContent<Student>
        pageTitle="Студенты"
        actionButtons={<CreateStudentModal />}
        dataSource={students}
        columns={columns}
        loading={loading}
        pagination={{
          current: current_page,
          pageSize: per_page,
          total,
          showTotal: (total, range) =>
            `Показано ${range.join(" - ")} (всего ${total})`,
          locale: { items_per_page: "строк на страницу" },
          onChange: (page, pageSize) => {
            dispatch(setPage(page));
            dispatch(setPageSize(pageSize));
          },
        }}
      />
    </>
  );
};
