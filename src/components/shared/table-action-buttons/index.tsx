import { Button, Space } from "antd";
import { DeleteButton } from "../delete-button";
import React, { PropsWithChildren } from "react";
import { EditOutlined } from "@ant-design/icons";

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
}) => {
  const onClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    callback: Function
  ) => {
    e.stopPropagation();
    callback();
  };

  return (
    <Space>
      {children}
      {hasUpdate && (
        <Button onClick={(e) => onClick(e, onUpdate)} icon={<EditOutlined />} />
      )}
      {hasDelete && (
        <DeleteButton
          onClick={(e) => onClick(e, onDelete)}
          loading={deleting}
        />
      )}
    </Space>
  );
};
