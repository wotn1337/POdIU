import { Button, Empty, InputRef, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import {
  useGetCountriesQuery,
  useGetGendersQuery,
  useGetStudentsQuery,
  useUpdateStudentMutation,
} from "app/features";
import { Student } from "app/features/students/types";
import { Filters, PaginationParams, Sorters } from "app/types";
import { useRef, useState } from "react";
import { getColumnSearchProps } from "utils";

type Props = {
  dataSource?: Student[];
  selection?: TableRowSelection<Student>;
  actions?: boolean;
  withRoom?: boolean;
};

export const StudentsTable: React.FC<Props> = ({
  dataSource,
  selection,
  actions = false,
  withRoom = false,
}) => {
  const searchInput = useRef<InputRef>(null);
  const { data: genders } = useGetGendersQuery(undefined, {
    skip: !!dataSource,
  });
  const { data: countries } = useGetCountriesQuery(undefined, {
    skip: !!dataSource,
  });
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    per_page: 10,
  });
  const [filters, setFilters] = useState<Filters>();
  const [sorters, setSorters] = useState<Sorters>();
  const { data, isLoading, isFetching } = useGetStudentsQuery(
    {
      ...paginationParams,
      with_dormitory: withRoom,
      filters,
      sorters,
    },
    { skip: !!dataSource }
  );
  const loading = isFetching || isLoading;
  const [updateStudent, { isLoading: unsettleming }] =
    useUpdateStudentMutation();

  const columns: ColumnsType<Student> = [
    {
      key: "cyrillic_name",
      dataIndex: "cyrillic_name",
      title: "ФИО (Кириллица)",
      sortOrder: !dataSource ? sorters?.cyrillic_name : undefined,
      sorter: !dataSource ? () => 0 : undefined,
      ...getColumnSearchProps({
        searchInput,
        onFilter: (value) => setFilters({ ...filters, cyrillic_name: value }),
      }),
    },
    {
      key: "latin_name",
      dataIndex: "latin_name",
      title: "ФИО (Латиница)",
      sortOrder: !dataSource ? sorters?.latin_name : undefined,
      sorter: !dataSource ? () => 0 : undefined,
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

  const onUnsettlement = (student: Student) => {
    updateStudent({
      ...student,
      academic_group_id: student.academic_group?.id,
      gender_id: student.gender?.id,
      country_id: student.country?.id,
      dorm_room_id: null,
    });
  };

  if (withRoom) {
    columns.splice(3, 0, {
      key: "dorm_room",
      dataIndex: ["dorm_room", "number"],
      title: "Номер комнаты",
    });
  }

  if (actions) {
    columns.push({
      key: "actions",
      title: "Действия",
      render: (_, student) => (
        <Button
          type="primary"
          onClick={() => onUnsettlement(student)}
          loading={unsettleming}
        >
          Выселить
        </Button>
      ),
    });
  }

  return (
    <Table
      dataSource={dataSource ?? data?.students}
      columns={columns}
      loading={loading}
      scroll={{ x: "100%" }}
      rowSelection={selection}
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
      pagination={{
        pageSizeOptions: [5, 10, 20, 50, 100],
        current: paginationParams.page,
        pageSize: paginationParams.per_page,
        total: data?.meta.total,
        showTotal: (total, range) =>
          `Показано ${range.join(" - ")} (всего ${total})`,
        locale: { items_per_page: "строк на страницу" },
        onChange: (page, per_page) => setPaginationParams({ page, per_page }),
      }}
      onChange={(_, __, sorter) => {
        if (!Array.isArray(sorter)) {
          setSorters({
            [String(sorter.columnKey)]: sorter.order,
          });
        }
      }}
      rowKey="id"
    />
  );
};
