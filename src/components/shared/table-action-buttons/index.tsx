import { Button, Space } from "antd";
import { DeleteButton } from "../delete-button";
import React from "react";

type Props = {
  onUpdate: () => void;
  onDelete: () => void;
  deleting: boolean;
  hasUpdate: boolean;
  hasDelete: boolean;
};

export const TableActionButtons: React.FC<Props> = ({
  deleting,
  hasDelete,
  hasUpdate,
  onDelete,
  onUpdate,
}) => (
  <Space>
    {hasUpdate && (
      <Button type="primary" onClick={onUpdate}>
        Изменить
      </Button>
    )}
    {hasDelete && <DeleteButton onClick={onDelete} loading={deleting} />}
  </Space>
);
