import { Button, Empty, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  Sorters,
  setCreateRoomModal,
  setSettlementModalByRoom,
  useDeleteRoomMutation,
  useGetRoomsQuery,
} from "app/features";
import { Room } from "app/features/rooms/types";
import { PaginationParams } from "app/types";
import { useUserPermissions } from "hooks/useUserPermissions";
import { useState } from "react";
import { TableActionButtons } from "../table-action-buttons";
import { useDispatch, useSelector } from "app/store";
import { StudentsTable } from "..";
import { TableRowSelection } from "antd/es/table/interface";

type Props = {
  dormId: number;
  actions?: boolean;
  selection?: TableRowSelection<Room>;
  onlyAvailable?: boolean;
  isFamily?: boolean;
  gender?: number;
};

export const RoomsTable: React.FC<Props> = ({
  dormId,
  actions = true,
  selection,
  onlyAvailable,
  isFamily,
  gender,
}) => {
  const { dormitories: perms } = useUserPermissions();
  const dispatch = useDispatch();
  const { deletingRoomIds } = useSelector((state) => state.rooms);
  // const dorm = dormitories.find((d) => d.id === dormId);
  // const [sorters, setSorters] = useState<{
  //   [x: string]: SortOrder | undefined;
  // }>({});
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    per_page: 10,
  });
  // const [filters, setFilters] = useState<Filters>();
  const [sorters, setSorters] = useState<Sorters>();
  const [deleteRoom] = useDeleteRoomMutation();
  const { data, isLoading, isFetching } = useGetRoomsQuery({
    ...paginationParams,
    with_students: true,
    dormId,
    only_available_dorm_rooms: onlyAvailable,
    is_family: isFamily,
    gender_id: gender,
  });
  const loading = isLoading || isFetching;

  const columns: ColumnsType<Room> = [
    {
      key: "number",
      dataIndex: "number",
      title: "Номер комнаты",
      // sortOrder: sorters?.number,
      // sorter: () => 0,
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

  if (actions && (perms.update || perms.delete)) {
    columns.push({
      key: "actions",
      render: (_, room) => (
        <TableActionButtons
          deleting={deletingRoomIds.includes(room.id)}
          hasDelete={perms.delete}
          hasUpdate={perms.update}
          onDelete={() => deleteRoom(room.id)}
          onUpdate={() =>
            dispatch(
              setCreateRoomModal({
                open: true,
                defaultDorm: dormId,
                defaultRoom: room,
              })
            )
          }
        >
          <Button
            type="primary"
            disabled={room.empty_seats_count === 0}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setSettlementModalByRoom({ room }));
            }}
          >
            Поселить
          </Button>
        </TableActionButtons>
      ),
    });
  }
  //   {
  //     key: "cyrillic_name",
  //     dataIndex: "cyrillic_name",
  //     title: "ФИО (Кириллица)",
  //   },
  //   {
  //     key: "latin_name",
  //     dataIndex: "latin_name",
  //     title: "ФИО (Латиница)",
  //   },
  //   {
  //     key: "gender",
  //     dataIndex: "gender",
  //     title: "Пол",
  //     render: (value) => value?.title,
  //   },
  //   {
  //     key: "country",
  //     dataIndex: "country",
  //     title: "Страна",
  //     render: (value) => value?.title,
  //   },
  //   {
  //     key: "eisu_id",
  //     dataIndex: "eisu_id",
  //     title: "ЕИСУ",
  //   },
  //   {
  //     key: "academic_group",
  //     dataIndex: "academic_group",
  //     title: "Группа",
  //     render: (value) => value?.title,
  //   },
  //   {
  //     key: "telephone",
  //     dataIndex: "telephone",
  //     title: "Номер телефона",
  //   },
  //   {
  //     key: "comment",
  //     dataIndex: "comment",
  //     title: "Комментарий",
  //   },
  //   {
  //     key: "actions",
  //     title: "Действия",
  //     render: (_, student) => (
  //       <Button
  //         type="primary"
  //         loading={loadingStudentIds.includes(student.id)}
  //         onClick={() => {
  //           dispatch(addLoadingStudentId(student.id));
  //           dispatch(
  //             updateStudent({
  //               ...student,
  //               gender_id: student.gender?.id,
  //               academic_group_id: student.academic_group?.id,
  //               country_id: student.country?.id,
  //               dorm_room_id: null,
  //             })
  //           ).then((data) => {
  //             dispatch(removeLoadingStudentId(student.id));
  //             if (data.meta.requestStatus === "fulfilled") {
  //               const payload = data.payload as CreateStudentResponse;
  //               dispatch(setSettlementModal({ open: false }));
  //               dispatch(
  //                 updateStudentRoom({
  //                   dormId: dorm?.id,
  //                   roomId: student.roomId,
  //                   student: payload.student,
  //                 })
  //               );
  //             }
  //           });
  //         }}
  //       >
  //         Выселить
  //       </Button>
  //     ),
  //   },
  // ];

  // useEffect(() => {
  //   if (dormId) {
  //     dispatch(
  //       getDormRooms({
  //         dormId,
  //         page: roomsInfo?.current_page ?? 1,
  //         per_page: roomsInfo?.per_page ?? 10,
  //         gender_id: gender,
  //         is_family: isFamily,
  //         only_available_dorm_rooms: onlyAvailable,
  //         with_students: true,
  //         sorters,
  //       })
  //     );
  //   }
  // }, [
  //   roomsInfo?.current_page,
  //   roomsInfo?.per_page,
  //   sorters,
  //   gender,
  //   isFamily,
  //   onlyAvailable,
  // ]);

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
      // onChange={(_, __, sorter) => {
      //   if (!Array.isArray(sorter)) {
      //     setSorters({
      //       [String(sorter.columnKey)]: sorter.order,
      //     });
      //   }
      // }}
      rowKey="id"
      expandable={{
        rowExpandable: ({ students_count }) => students_count !== 0,
        expandRowByClick: true,
        expandedRowRender: ({ students }) => (
          <StudentsTable dataSource={students} />
        ),
      }}
    />
  );
};
