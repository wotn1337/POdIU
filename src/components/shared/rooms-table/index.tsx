import { Empty, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import {
  Dormitory,
  Room,
  setCreateRoomModal,
  useDeleteRoomMutation,
  useGetRoomsQuery,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { PaginationParams, Sorters } from "app/types";
import { useUserPermissions } from "hooks";
import { useState } from "react";
import { StudentsTable } from "..";
import { TableActionButtons } from "../table-action-buttons";
import { getActionButtons, getAvailableFilterProps } from "./utils";
import { getBinaryFilterProps } from "utils";

type Props = {
  dorm?: Dormitory;
  actions?: boolean;
  selection?: TableRowSelection<Room>;
  onlyAvailable?: boolean;
  isFamily?: boolean;
  gender?: number;
};

export const RoomsTable: React.FC<Props> = ({
  dorm,
  actions = true,
  selection,
  isFamily,
  gender,
  ...props
}) => {
  const {
    dormitories: perms,
    settlementHistory: settlementHistoryPerms,
    students: studentsPerms,
  } = useUserPermissions();
  const dispatch = useDispatch();
  const { deletingRoomIds } = useSelector((state) => state.rooms);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    per_page: 10,
  });
  const [sorters, setSorters] = useState<Sorters>();
  const [onlyAvailable, setOnlyAvailable] = useState<boolean | undefined>(
    props.onlyAvailable
  );
  const [deleteRoom] = useDeleteRoomMutation();
  const { data, isLoading, isFetching } = useGetRoomsQuery(
    {
      ...paginationParams,
      with_students: true,
      dormId: dorm?.id,
      only_available_dorm_rooms: onlyAvailable,
      is_family: isFamily,
      gender_id: gender,
      sorters,
    },
    { skip: !dorm }
  );
  const loading = isLoading || isFetching;

  const columns: ColumnsType<Room> = [
    {
      key: "number",
      dataIndex: "number",
      title: "Номер комнаты",
      sortOrder: sorters?.number,
      sorter: () => 0,
    },
    {
      key: "number_of_seats",
      dataIndex: "number_of_seats",
      title: "Кол-во мест",
    },
    {
      key: "empty_seats_count",
      dataIndex: "empty_seats_count",
      title: "Свободных мест",
      ...getBinaryFilterProps({
        label: "Только свободные",
        value: onlyAvailable,
        onChange: setOnlyAvailable,
      }),
    },
    {
      key: "students_count",
      dataIndex: "students_count",
      title: "Кол-во студентов",
    },
    {
      key: "comment",
      dataIndex: "comment",
      title: "Комментарий",
    },
  ];

  if (
    actions &&
    (perms.update ||
      perms.delete ||
      settlementHistoryPerms.read ||
      studentsPerms.update)
  ) {
    columns.push({
      key: "actions",
      title: "Действия",
      render: (_, room) => (
        <TableActionButtons
          deleting={deletingRoomIds.includes(room.id)}
          hasDelete={perms.delete}
          hasUpdate={perms.update}
          onDelete={() => deleteRoom(room.id)}
          onUpdate={() => {
            if (dorm) {
              dispatch(
                setCreateRoomModal({
                  open: true,
                  defaultDorm: dorm.id,
                  defaultRoom: room,
                })
              );
            }
          }}
          items={getActionButtons({
            dispatch,
            dorm,
            room,
            hasSettle: studentsPerms.update,
            hasSettlementHistory: settlementHistoryPerms.read,
          })}
        />
      ),
    });
  }

  return (
    <Table
      dataSource={data?.dorm_rooms}
      columns={columns}
      loading={loading}
      scroll={{ x: "100%" }}
      rowSelection={
        selection
          ? {
              ...selection,
              getCheckboxProps: ({ empty_seats_count }) => ({
                disabled: empty_seats_count === 0,
              }),
            }
          : undefined
      }
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
      expandable={{
        rowExpandable: ({ students_count }) => students_count !== 0,
        expandRowByClick: true,
        expandedRowRender: ({ students, id }) => (
          <StudentsTable dataSource={students} actions roomId={id} />
        ),
      }}
    />
  );
};
