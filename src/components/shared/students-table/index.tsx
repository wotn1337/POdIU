import { Empty, InputRef, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  DormitoriesStateType,
  useGetCountriesQuery,
  useGetGendersQuery,
} from "app/features";
import { Student } from "app/features/students/types";
// import {
//   setFilters,
//   setPage,
//   setPageSize,
//   setSorters,
// } from "app/features/students/studentsSlice";
import { useDispatch, useSelector } from "app/store";
import { useEffect, useRef } from "react";
import { getColumnSearchProps } from "utils";

type Props = {
  dataSource?: Student[];
};

export const StudentsTable: React.FC<Props> = ({ dataSource }) => {
  // const {
  //   // students,
  //   // current_page,
  //   // per_page,
  //   // loading,
  //   // total,
  //   // sorters,
  //   // filters,
  //   // genders,
  //   // countries,
  // } = useSelector((state) => state.students);
  // const dispatch = useDispatch();
  // const searchInput = useRef<InputRef>(null);
  const { data: genders } = useGetGendersQuery();
  const { data: countries } = useGetCountriesQuery();

  const columns: ColumnsType<Student> = [
    {
      key: "cyrillic_name",
      dataIndex: "cyrillic_name",
      title: "ФИО (Кириллица)",
      // sortOrder: sorters.cyrillic_name,
      // sorter: () => 0,
      // ...getColumnSearchProps({
      //   searchInput,
      //   onFilter: (value) =>
      //     dispatch(setFilters({ ...filters, cyrillic_name: value })),
      // }),
    },
    {
      key: "latin_name",
      dataIndex: "latin_name",
      title: "ФИО (Латиница)",
      // sortOrder: sorters.latin_name,
      // sorter: () => 0,
      // ...getColumnSearchProps({
      //   searchInput,
      //   onFilter: (value) =>
      //     dispatch(setFilters({ ...filters, latin_name: value })),
      // }),
    },
    {
      key: "gender",
      dataIndex: "gender",
      title: "Пол",
      render: (value) => value?.title,
      filters: genders?.map((g) => ({ text: g.title, value: g.id })),
      // filtered: !!filters.gender_id,
      // filteredValue: filters.gender_id ? [filters.gender_id] : [],
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

  // useEffect(() => {
  //   dispatch(getGenders());
  //   dispatch(getCountries());
  // }, []);

  // useEffect(() => {
  //   if (settlementState) {
  //     const genders = Array.from(
  //       new Set(settlementState.room?.students?.map((s) => s.gender?.id))
  //     );
  //     // const countries = settlementState.room?.students?.map((s) => s.country);

  //     if (genders?.length === 1) {
  //       // dispatch(setFilters({ ...filters, gender_id: String(genders[0]) }));
  //     }
  //   }
  // }, [settlementState]);

  // useEffect(() => {
  //   dispatch(
  //     getStudents({
  //       page: current_page,
  //       per_page,
  //       with_dormitory,
  //       sorters,
  //       filters,
  //     })
  //   );
  // }, [current_page, per_page, sorters, filters, with_dormitory]);

  // return (
  //   <Table
  //     {...props}
  //     dataSource={students}
  //     columns={columns}
  //     loading={loading}
  //     rowSelection={{ ...props.rowSelection, type: "radio" }}
  //     rowKey="id"
  //     scroll={{ x: "100%" }}
  //     onChange={(_, tableFilters, sorter) => {
  //       // if (!Array.isArray(sorter)) {
  //       //   dispatch(
  //       //     setSorters({
  //       //       [String(sorter.columnKey)]: sorter.order,
  //       //     })
  //       //   );
  //       // }
  //       // dispatch(
  //       //   setFilters({
  //       //     ...filters,
  //       //     gender_id: tableFilters["gender"]
  //       //       ? tableFilters["gender"][0]
  //       //       : undefined,
  //       //     countries: tableFilters["country"] ?? undefined,
  //       //   })
  //       // );
  //     }}
  //     pagination={{
  //       ...props.pagination,
  //       defaultPageSize: 5,
  //       pageSizeOptions: [5, 10, 20, 50, 100],
  //       showSizeChanger: true,
  //       total,
  //       showTotal: (total, range) =>
  //         `Показано ${range.join(" - ")} (всего ${total})`,
  //       locale: { items_per_page: "строк на страницу" },
  //       onChange: (page, pageSize) => {
  //         // dispatch(setPage(page));
  //         // dispatch(setPageSize(pageSize));
  //       },
  //     }}
  //   />
  // );
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      // loading={loading}
      scroll={{ x: "100%" }}
      // rowSelection={
      //   selection
      //     ? {
      //         ...selection,
      //         getCheckboxProps: ({ empty_seats_count }) => ({
      //           disabled: empty_seats_count === 0,
      //         }),
      //       }
      //     : undefined
      // }
      locale={{
        filterReset: "Сбросить",
        emptyText: (
          <Empty
            description="Нет данных"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ),
        triggerAsc: "Отсортировать по возрастанию",
        triggerDesc: "Отсортировать по убыванию",
        cancelSort: "Сбросить сортировку",
      }}
      pagination={false}
      // pagination={{
      //   // className: s.roomsTable__pagination,
      //   pageSizeOptions: [5, 10, 20, 50, 100],
      //   current: paginationParams.page,
      //   pageSize: paginationParams.per_page,
      //   total: data?.meta.total,
      //   showTotal: (total, range) =>
      //     `Показано ${range.join(" - ")} (всего ${total})`,
      //   locale: { items_per_page: "строк на страницу" },
      //   onChange: (page, per_page) => setPaginationParams({ page, per_page }),
      // }}
      // onChange={(_, __, sorter) => {
      //   if (!Array.isArray(sorter)) {
      //     setSorters({
      //       [String(sorter.columnKey)]: sorter.order,
      //     });
      //   }
      // }}
      rowKey="id"
      // expandable={{
      //   rowExpandable: ({ students_count }) => students_count !== 0,
      //   expandedRowRender: ({ students, id }) => (
      //     <Table
      //       dataSource={students?.map((s) => ({ ...s, roomId: id }))}
      //       columns={studentColumns}
      //       pagination={false}
      //     />
      //   ),
      // }}
    />
  );
};
