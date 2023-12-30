import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DormRoom,
  RoomsInfo,
  deleteDormitory,
  deleteRoom,
  getDormRooms,
  setRoomsPage,
  setRoomsPageSize,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { DeleteButton } from "components/shared/delete-button";
import { useEffect } from "react";

type Props = {
  dormId: number;
  loading: boolean;
  roomsInfo?: RoomsInfo;
};

export const RoomsTable: React.FC<Props> = ({ loading, roomsInfo, dormId }) => {
  const dispatch = useDispatch();
  const { deletingRoomIds } = useSelector((state) => state.dormitories);

  const columns: ColumnsType<DormRoom> = [
    {
      key: "number",
      dataIndex: "number",
      title: "Номер комнаты",
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
    {
      key: "actions",
      render: (_, { id }) => (
        <DeleteButton
          onClick={() => dispatch(deleteRoom(id))}
          loading={deletingRoomIds.includes(id)}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      getDormRooms({
        dormId,
        page: roomsInfo?.current_page ?? 1,
        per_page: roomsInfo?.per_page ?? 10,
      })
    );
  }, [roomsInfo?.current_page, roomsInfo?.per_page]);

  return (
    <Table
      dataSource={roomsInfo?.rooms}
      columns={columns}
      loading={loading}
      pagination={{
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
      rowKey={"id"}
    />
  );
};
