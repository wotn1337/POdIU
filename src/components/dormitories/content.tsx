import type { ColumnsType } from "antd/es/table";
import {
  Dormitory,
  deleteDormitory,
  setCreateModal,
  setFilters,
  setSorters,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { TabledContent } from "components/shared";
import { DeleteButton } from "components/shared/delete-button";
import { CreateDormModal } from "./createDormModal";
import { CreateDormRoomModal } from "./createDormRoomModal";
import { RoomsTable } from "./roomsTable";
import { Button, InputRef, Space } from "antd";
import { useRef } from "react";
import { getColumnSearchProps } from "utils";
import { useUserPermissions } from "hooks/useUserPermissions";

export const DormitoriesContent = () => {
  const {
    loading,
    dormitories,
    dormRooms,
    gettingRoomsDormIds,
    filters,
    sorters,
  } = useSelector((state) => state.dormitories);
  const dispatch = useDispatch();
  const { dormitories: perms } = useUserPermissions();
  const actions = [];
  const searchInput = useRef<InputRef>(null);

  const columns: ColumnsType<Dormitory> = [
    {
      key: "number",
      dataIndex: "number",
      title: "Номер общежития",
      filters: dormitories.map((d) => ({ text: d.number, value: d.number })),
      filterMultiple: false,
      sortOrder: sorters.number,
      sorter: () => 0,
      ...getColumnSearchProps({
        searchInput,
        onFilter: (value) =>
          dispatch(setFilters({ ...filters, number: value })),
      }),
    },
    {
      key: "address",
      dataIndex: "address",
      title: "Адрес",
      filters: dormitories.map((d) => ({ text: d.address, value: d.address })),
      filterMultiple: false,
      sortOrder: sorters.address,
      sorter: () => 0,
      ...getColumnSearchProps({
        searchInput,
        onFilter: (value) =>
          dispatch(setFilters({ ...filters, address: value })),
      }),
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
      render: (_, dorm) => (
        <Space>
          {perms.update && (
            <Button
              type="primary"
              onClick={() =>
                dispatch(setCreateModal({ open: true, defaultDorm: dorm }))
              }
            >
              Изменить
            </Button>
          )}
          {perms.delete && (
            <DeleteButton onClick={() => dispatch(deleteDormitory(dorm.id))} />
          )}
        </Space>
      ),
    });
  }

  if (perms.create) {
    actions.push(<CreateDormModal key={1} />);
  }
  if (perms.update) {
    actions.push(<CreateDormRoomModal key={2} />);
  }

  return (
    <TabledContent<Dormitory>
      pageTitle="Общежития"
      actionButtons={actions}
      dataSource={dormitories}
      columns={columns}
      rowSelection={undefined}
      loading={loading}
      onChange={(_, __, sorter) => {
        if (!Array.isArray(sorter)) {
          dispatch(
            setSorters({
              [String(sorter.columnKey)]: sorter.order,
            })
          );
        }
      }}
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
