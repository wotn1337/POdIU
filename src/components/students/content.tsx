import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { deleteStudent } from "app/features";
import {
  setCreateModal,
  setFilters,
  setPage,
  setPageSize,
  setSettlementModal,
  setSorters,
} from "app/features/students/studentsSlice";
import { Student } from "app/features/students/types";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { DeleteButton } from "components/shared/delete-button";
import { useRef } from "react";
import { CreateStudentModal } from "./createStudentModal";
import { SettlementModal } from "./settlementModal";

type DataIndex = keyof Student;

export const StudentsPageContent = () => {
  const {
    students,
    loading,
    current_page,
    total,
    per_page,
    deletingIds,
    filters,
    genders,
    countries,
    sorters,
  } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const searchInput = useRef<InputRef>(null);

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Student> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          autoFocus={true}
          ref={searchInput}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            dispatch(setFilters({ ...filters, [dataIndex]: selectedKeys[0] }));
            close();
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              dispatch(
                setFilters({ ...filters, [dataIndex]: selectedKeys[0] })
              );
              close();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button
            onClick={() => {
              dispatch(setFilters({ ...filters, [dataIndex]: undefined }));
              setSelectedKeys([]);
              close();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
          <Button type="link" size="small" onClick={close}>
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
  });

  const columns: ColumnsType<Student> = [
    {
      key: "cyrillic_name",
      dataIndex: "cyrillic_name",
      title: "ФИО (Кириллица)",
      sortOrder: sorters.cyrillic_name,
      sorter: () => 1,
      ...getColumnSearchProps("cyrillic_name"),
    },
    {
      key: "latin_name",
      dataIndex: "latin_name",
      title: "ФИО (Латиница)",
      sortOrder: sorters.latin_name,
      sorter: () => 1,
      ...getColumnSearchProps("latin_name"),
    },
    {
      key: "gender",
      dataIndex: "gender",
      title: "Пол",
      render: (value) => value?.title,
      filters: genders.map((g) => ({ text: g.title, value: g.id })),
      filterMultiple: false,
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
      filters: countries.map((c) => ({ text: c.title, value: c.id })),
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
        onChange={(_, tableFilters, sorter) => {
          if (!Array.isArray(sorter)) {
            dispatch(
              setSorters({
                [String(sorter.columnKey)]: sorter.order,
              })
            );
          }
          dispatch(
            setFilters({
              ...filters,
              gender_id: tableFilters["gender"]
                ? tableFilters["gender"][0]
                : undefined,
              countries: tableFilters["country"] ?? undefined,
            })
          );
        }}
        pagination={{
          current: current_page,
          pageSize: per_page,
          total,
          onChange: (page, pageSize) => {
            dispatch(setPage(page));
            dispatch(setPageSize(pageSize));
          },
        }}
      />
    </>
  );
};
