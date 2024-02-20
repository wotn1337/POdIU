import { Button, Space } from "antd";
import { DeleteButton } from "../delete-button";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  onUpdate: () => void;
  onDelete: () => void;
  deleting: boolean;
  hasUpdate: boolean;
  hasDelete: boolean;
}>;

export const TableActionButtons: React.FC<Props> = ({
  deleting,
  hasDelete,
  hasUpdate,
  onDelete,
  onUpdate,
  children,
}) => (
  <Space>
    {children}
    {hasUpdate && (
      <Button type={children ? "default" : "primary"} onClick={onUpdate}>
        Изменить
      </Button>
    )}
    {hasDelete && <DeleteButton onClick={onDelete} loading={deleting} />}
  </Space>
);
