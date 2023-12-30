import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { DeleteButton } from "components/shared/delete-button";
import { CreateDormModal } from "./createDormModal";
import { Dormitory, deleteDormitory, getDormRooms } from "app/features";
import { Spin } from "antd";
import { RoomsTable } from "./roomsTable";

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
      render: (_, { id }) => (
        <DeleteButton onClick={() => dispatch(deleteDormitory(id))} />
      ),
    },
  ];

  return (
    <TabledContent<Dormitory>
      pageTitle="Общежития"
      actionButtons={<CreateDormModal />}
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
        onExpand: (expanded, { id }) => {
          if (expanded) {
            dispatch(getDormRooms({ dormId: id, page: 1, per_page: 10 }));
          }
        },
      }}
    />
  );
};
