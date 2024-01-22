import { Button, Empty, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  DormRoom,
  RoomsInfo,
  addLoadingStudentId,
  deleteRoom,
  getDormRooms,
  removeLoadingStudentId,
  setCreateRoomModal,
  setRoomsPage,
  setRoomsPageSize,
  setSettlementModal,
  updateStudent,
  updateStudentRoom,
} from "app/features";
import { CreateStudentResponse, Student } from "app/features/students/types";
import { useDispatch, useSelector } from "app/store";
import { DeleteButton } from "components/shared/delete-button";
import { useEffect, useState } from "react";
import s from "./dormitories.module.scss";
import { SettlementModal } from "./settlementModal";
import { SortOrder } from "antd/es/table/interface";

type Props = {
  dormId: number | undefined;
  gender?: number;
  isFamily?: boolean;
  onlyAvailable?: boolean;
  loading: boolean;
  roomsInfo?: RoomsInfo;
  withActions?: boolean;
  selection?: TableProps<DormRoom>["rowSelection"];
};

export const RoomsTable: React.FC<Props> = ({
  loading,
  roomsInfo,
  dormId,
  withActions = true,
  selection,
  gender,
  isFamily,
  onlyAvailable,
}) => {
  const dispatch = useDispatch();
  const { deletingRoomIds, dormitories, loadingStudentIds } = useSelector(
    (state) => state.dormitories
  );
  const dorm = dormitories.find((d) => d.id === dormId);
  const [sorters, setSorters] = useState<{
    [x: string]: SortOrder | undefined;
  }>({});

  const baseColumns: ColumnsType<DormRoom> = [
    {
      key: "number",
      dataIndex: "number",
      title: "Номер комнаты",
      sortOrder: sorters.number,
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

  const columns: ColumnsType<DormRoom> = withActions
    ? [
        ...baseColumns,
        {
          key: "actions",
          title: "Действия",
          render: (_, room) => (
            <Space>
              <Button
                type="primary"
                disabled={room.empty_seats_count === 0}
                onClick={() =>
                  dispatch(setSettlementModal({ open: true, dorm, room }))
                }
              >
                Поселить
              </Button>
              <Button
                onClick={() =>
                  dispatch(
                    setCreateRoomModal({
                      open: true,
                      defaultRoom: room,
                      defaultDorm: dorm?.id,
                    })
                  )
                }
              >
                Изменить
              </Button>
              <DeleteButton
                onClick={() => dispatch(deleteRoom(room.id))}
                loading={deletingRoomIds.includes(room.id)}
              />
            </Space>
          ),
        },
      ]
    : baseColumns;

  const studentColumns: ColumnsType<Student & { roomId: number }> = [
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
        <Button
          type="primary"
          loading={loadingStudentIds.includes(student.id)}
          onClick={() => {
            dispatch(addLoadingStudentId(student.id));
            dispatch(
              updateStudent({
                ...student,
                gender_id: student.gender?.id,
                academic_group_id: student.academic_group?.id,
                country_id: student.country?.id,
                dorm_room_id: null,
              })
            ).then((data) => {
              dispatch(removeLoadingStudentId(student.id));
              if (data.meta.requestStatus === "fulfilled") {
                const payload = data.payload as CreateStudentResponse;
                dispatch(setSettlementModal({ open: false }));
                dispatch(
                  updateStudentRoom({
                    dormId: dorm?.id,
                    roomId: student.roomId,
                    student: payload.student,
                  })
                );
              }
            });
          }}
        >
          Выселить
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (dormId) {
      dispatch(
        getDormRooms({
          dormId,
          page: roomsInfo?.current_page ?? 1,
          per_page: roomsInfo?.per_page ?? 10,
          gender_id: gender,
          is_family: isFamily,
          only_available_dorm_rooms: onlyAvailable,
          with_students: true,
          sorters,
        })
      );
    }
  }, [
    roomsInfo?.current_page,
    roomsInfo?.per_page,
    sorters,
    gender,
    isFamily,
    onlyAvailable,
  ]);

  return (
    <>
      <SettlementModal />
      <Table
        className={s.roomsTable}
        dataSource={roomsInfo?.rooms}
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
          className: s.roomsTable__pagination,
          pageSizeOptions: [5, 10, 20, 50, 100],
          current: roomsInfo?.current_page,
          pageSize: roomsInfo?.per_page,
          total: roomsInfo?.total,
          showTotal: (total, range) =>
            `Показано ${range.join(" - ")} (всего ${total})`,
          locale: { items_per_page: "строк на страницу" },
          onChange: (page, pageSize) => {
            dispatch(setRoomsPage({ id: dormId, page }));
            dispatch(setRoomsPageSize({ id: dormId, size: pageSize }));
          },
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
          expandedRowRender: ({ students, id }) => (
            <Table
              dataSource={students?.map((s) => ({ ...s, roomId: id }))}
              columns={studentColumns}
              pagination={false}
            />
          ),
        }}
      />
    </>
  );
};
