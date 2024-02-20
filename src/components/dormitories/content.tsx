import { Button, InputRef } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  Dormitory,
  setCreateDormitoryModal,
  setCreateRoomModal,
  useDeleteDormitoryMutation,
  useGetDormitoriesQuery,
} from "app/features";
import { useDispatch, useSelector } from "app/store";
import { Filters, PaginationParams, Sorters } from "app/types";
import {
  RoomsTable,
  TableActionButtons,
  TabledContent,
} from "components/shared";
import { useUserPermissions } from "hooks/useUserPermissions";
import { useRef, useState } from "react";
import { getColumnSearchProps } from "utils";
import { CreateDormitoryModal } from "./createDormitoryModal";
import { CreateRoomModal } from "./createRoomModal";

export const DormitoriesContent = () => {
  const { dormitories: perms } = useUserPermissions();
  const dispatch = useDispatch();
  const { createDormitoryModal, deletingDormitoryIds } = useSelector(
    (state) => state.dormitories
  );
  const { createRoomModal } = useSelector((state) => state.rooms);
  const actions = [];
  const searchInput = useRef<InputRef>(null);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    per_page: 10,
  });
  const [filters, setFilters] = useState<Filters>();
  const [sorters, setSorters] = useState<Sorters>();
  const { data, isLoading, isFetching } = useGetDormitoriesQuery({
    ...paginationParams,
    filters,
    sorters,
    with_user_info: false,
  });
  const loading = isLoading || isFetching;
  const [deleteDormitory] = useDeleteDormitoryMutation();

  const columns: ColumnsType<Dormitory> = [
    {
      key: "number",
      dataIndex: "number",
      title: "Номер общежития",
      filters: data?.dormitories.map((d) => ({
        text: d.number,
        value: d.number,
      })),
      filterMultiple: false,
      sortOrder: sorters?.number,
      sorter: () => 0,
      ...getColumnSearchProps({
        searchInput,
        onFilter: (value) => setFilters({ ...filters, number: value }),
      }),
    },
    {
      key: "address",
      dataIndex: "address",
      title: "Адрес",
      filters: data?.dormitories.map((d) => ({
        text: d.address,
        value: d.address,
      })),
      filterMultiple: false,
      sortOrder: sorters?.address,
      sorter: () => 0,
      ...getColumnSearchProps({
        searchInput,
        onFilter: (value) => setFilters({ ...filters, address: value }),
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
        <TableActionButtons
          deleting={deletingDormitoryIds.includes(dorm.id)}
          hasDelete={perms.delete}
          hasUpdate={perms.update}
          onDelete={() => deleteDormitory(dorm.id)}
          onUpdate={() =>
            dispatch(
              setCreateDormitoryModal({
                open: true,
                defaultDormitory: dorm,
              })
            )
          }
        />
      ),
    });
  }

  if (perms.create) {
    actions.push(
      <Button
        key={1}
        onClick={() => dispatch(setCreateDormitoryModal({ open: true }))}
        children="Добавить общежитие"
      />
    );
  }

  if (perms.update) {
    actions.push(
      <Button
        key={2}
        onClick={() => dispatch(setCreateRoomModal({ open: true }))}
        children="Добавить комнату"
      />
    );
  }

  return (
    <>
      {createDormitoryModal.open && <CreateDormitoryModal />}
      {createRoomModal.open && <CreateRoomModal />}
      <TabledContent<Dormitory>
        pageTitle="Общежития"
        actionButtons={actions}
        dataSource={data?.dormitories}
        columns={columns}
        rowSelection={undefined}
        loading={loading}
        pagination={{
          current: paginationParams.page,
          pageSize: paginationParams.per_page,
          total: data?.meta.total,
          onChange: (page, per_page) => setPaginationParams({ page, per_page }),
        }}
        onChange={(_, __, sorter) => {
          if (!Array.isArray(sorter)) {
            setSorters({
              [String(sorter.columnKey)]: sorter.order,
            });
          }
        }}
        expandable={{
          rowExpandable: () => true,
          expandedRowRender: ({ id }) => <RoomsTable dormId={id} />,
          expandRowByClick: true,
        }}
      />
    </>
  );
};
