import type { ColumnsType } from "antd/es/table";
import { Dormitory, deleteDormitory, setCreateModal } from "app/features";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { DeleteButton } from "components/shared/delete-button";
import { CreateDormModal } from "./createDormModal";
import { CreateDormRoomModal } from "./createDormRoomModal";
import { RoomsTable } from "./roomsTable";
import { Button, Space } from "antd";

export const DormitoriesContent = () => {
  const { loading, dormitories, dormRooms, gettingRoomsDormIds } = useSelector(
    (state) => state.dormitories
  );
  const dispatch = useDispatch();

  const columns: ColumnsType<Dormitory> = [
    {
      key: "number",
      dataIndex: "number",
      title: "Номер общежития",
    },
    {
      key: "address",
      dataIndex: "address",
      title: "Адрес",
    },
    {
      key: "comment",
      dataIndex: "comment",
      title: "Комментарий",
    },
    {
      key: "actions",
      render: (_, dorm) => (
        <Space>
          <Button
            type="primary"
            onClick={() =>
              dispatch(setCreateModal({ open: true, defaultDorm: dorm }))
            }
          >
            Изменить
          </Button>
          <DeleteButton onClick={() => dispatch(deleteDormitory(dorm.id))} />
        </Space>
      ),
    },
  ];

  return (
    <TabledContent<Dormitory>
      pageTitle="Общежития"
      actionButtons={[
        <CreateDormModal key={1} />,
        <CreateDormRoomModal key={2} />,
      ]}
      dataSource={dormitories}
      columns={columns}
      rowSelection={undefined}
      loading={loading}
      expandable={{
        rowExpandable: () => true,
        expandedRowRender: ({ id }) => (
          <RoomsTable
            loading={gettingRoomsDormIds.includes(id)}
            roomsInfo={dormRooms[id]}
            dormId={id}
          />
        ),
      }}
    />
  );
};
