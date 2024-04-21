import { InputRef } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  setCreateStudentModal,
  setSettlementHistoryStudent,
  setSettlementStudent,
  useDeleteStudentMutation,
  useEvictStudentMutation,
  useGetCountriesQuery,
  useGetGendersQuery,
  useGetStudentsQuery,
} from "app/features";
import { Student } from "app/features/students/types";
import { useDispatch, useSelector } from "app/store";
import { Filters, PaginationParams, Sorters } from "app/types";
import { TableActionButtons, TabledContent } from "components/shared";
import { useUserPermissions } from "hooks";
import React, { useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { getColumnSearchProps } from "utils";
import { SettlementHistoryModal } from "./SettlementHistoryModal";
import { TalbeRowWithPopover } from "./TableRowWithPopover";
import { CreateStudentModal } from "./createStudentModal";
import { SettlementModal } from "./settlementModal";
import { getActionButtons, getHeaderActionButtons, getOnChange } from "./utils";

export const StudentsPageContent: React.FC = () => {
  const dispatch = useDispatch();
  const {
    deletingStudentIds,
    createStudentModal,
    settlementStudent,
    settlementHistoryStudent,
    evictingStudentIds,
  } = useSelector((state) => state.students);
  const { students: perms, settlementHistory: settlementHistoryPerms } =
    useUserPermissions();
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
  const [evictStudent] = useEvictStudentMutation();

  const onEvict = (student: Student) => {
    if (student.dorm_room) {
      evictStudent({ studentId: student.id, roomId: student.dorm_room.id });
    }
  };

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
    },
    {
      key: "dorm_room",
      dataIndex: ["dorm_room", "number"],
      title: "Номер комнаты",
      filters: [
        { text: "Только поселенные", value: true },
        { text: "Только не поселенные", value: false },
      ],
      filterMultiple: false,
      filteredValue:
        filters?.has_dorm_room !== undefined ? [!!filters.has_dorm_room] : [],
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
  ];

  if (perms.update || perms.delete || settlementHistoryPerms.read) {
    columns.push({
      key: "actions",
      title: "Действия",
      render: (_, student) => (
        <TableActionButtons
          deleting={deletingStudentIds.includes(student.id)}
          hasDelete={perms.delete}
          hasUpdate={perms.update}
          onDelete={() => deleteStudent(student.id)}
          loading={evictingStudentIds.includes(student.id)}
          onUpdate={() =>
            dispatch(
              setCreateStudentModal({ open: true, defaultStudent: student })
            )
          }
          items={getActionButtons({
            hasSettle: perms.update,
            disableSettle: !!student.dorm_room,
            disableEvict: !student.dorm_room,
            hasEvict: perms.update,
            onEvict: () => onEvict(student),
            onSettle: () => dispatch(setSettlementStudent(student)),
            hasSettlementHistory: settlementHistoryPerms.read,
            onOpenSettlementHistory: () =>
              dispatch(setSettlementHistoryStudent(student)),
          })}
        />
      ),
    });
  }

  return (
    <>
      {settlementHistoryStudent && (
        <SettlementHistoryModal
          student={settlementHistoryStudent}
          onCancel={() => dispatch(setSettlementHistoryStudent(undefined))}
        />
      )}
      {settlementStudent && (
        <SettlementModal
          student={settlementStudent}
          onCancel={() => dispatch(setSettlementStudent(undefined))}
        />
      )}
      {createStudentModal.open && <CreateStudentModal />}
      <TabledContent<Student>
        pageTitle="Студенты"
        actionButtons={getHeaderActionButtons({
          hasCreate: perms.create,
          hasUpdate: perms.update,
          onCreateButtonClick: () =>
            dispatch(setCreateStudentModal({ open: true })),
        })}
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
        components={{
          body: {
            row: (
              props: JSX.IntrinsicAttributes & {
                children: { props: { record: Student } }[];
              }
            ) => <TalbeRowWithPopover {...props} />,
          },
        }}
      />
    </>
  );
};
