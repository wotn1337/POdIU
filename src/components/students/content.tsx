import { Button, InputRef } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  setCreateStudentModal,
  setSettlementStudent,
  useDeleteStudentMutation,
  useGetCountriesQuery,
  useGetGendersQuery,
  useGetStudentsQuery,
} from "app/features";
import { Student } from "app/features/students/types";
import { useDispatch, useSelector } from "app/store";
import { Filters, PaginationParams, Sorters } from "app/types";
import { TableActionButtons, TabledContent } from "components/shared";
import { useUserPermissions } from "hooks/useUserPermissions";
import { useEffect, useRef, useState } from "react";
import { getColumnSearchProps } from "utils";
import { CreateStudentModal } from "./createStudentModal";
import { SettlementModal } from "./settlementModal";
import { getOnChange } from "./utils";

export const StudentsPageContent = () => {
  const dispatch = useDispatch();
  const { deletingStudentIds, createStudentModal, settlementStudent } =
    useSelector((state) => state.students);
  const { students: perms } = useUserPermissions();
  const searchInput = useRef<InputRef>(null);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    per_page: 10,
  });
  const [filters, setFilters] = useState<Filters>();
  const [sorters, setSorters] = useState<Sorters>();
  const { data, isLoading, isFetching } = useGetStudentsQuery({
    ...paginationParams,
    with_dormitory: true,
    filters,
    sorters,
  });
  const loading = isFetching || isLoading;
  const { data: genders } = useGetGendersQuery();
  const { data: countries } = useGetCountriesQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  const columns: ColumnsType<Student> = [
    {
      key: "cyrillic_name",
      dataIndex: "cyrillic_name",
      title: "ФИО (Кириллица)",
      sortOrder: sorters?.cyrillic_name,
      sorter: () => 0,
      ...getColumnSearchProps({
        searchInput,
        onFilter: (value) => setFilters({ ...filters, cyrillic_name: value }),
      }),
    },
    {
      key: "latin_name",
      dataIndex: "latin_name",
      title: "ФИО (Латиница)",
      sortOrder: sorters?.latin_name,
      sorter: () => 0,
      ...getColumnSearchProps({
        searchInput,
        onFilter: (value) => setFilters({ ...filters, latin_name: value }),
      }),
    },
    {
      key: "gender",
      dataIndex: "gender",
      title: "Пол",
      render: (value) => value?.title,
      filters: genders?.map((g) => ({ text: g.title, value: g.id })),
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
      filters: countries?.map((c) => ({ text: c.title, value: c.id })),
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

  if (perms.update || perms.delete) {
    columns.push({
      key: "actions",
      title: "Действия",
      render: (_, student) => (
        <TableActionButtons
          deleting={deletingStudentIds.includes(student.id)}
          hasDelete={perms.delete}
          hasUpdate={perms.update}
          onDelete={() => deleteStudent(student.id)}
          onUpdate={() =>
            dispatch(
              setCreateStudentModal({ open: true, defaultStudent: student })
            )
          }
        >
          {perms.update && (
            <Button
              type="primary"
              onClick={() => dispatch(setSettlementStudent(student))}
            >
              Поселить
            </Button>
          )}
        </TableActionButtons>
      ),
    });
  }

  return (
    <>
      {settlementStudent && (
        <SettlementModal
          student={settlementStudent}
          onCancel={() => dispatch(setSettlementStudent(undefined))}
        />
      )}
      {createStudentModal.open && <CreateStudentModal />}
      <TabledContent<Student>
        pageTitle="Студенты"
        actionButtons={
          perms.create ? (
            <Button
              children="Добавить студента"
              onClick={() => dispatch(setCreateStudentModal({ open: true }))}
            />
          ) : undefined
        }
        dataSource={data?.students}
        columns={columns}
        loading={loading}
        onChange={getOnChange({ filters, setFilters, setSorters })}
        pagination={{
          current: paginationParams.page,
          pageSize: paginationParams.per_page,
          total: data?.meta.total,
          onChange: (page, per_page) => setPaginationParams({ page, per_page }),
        }}
      />
    </>
  );
};
