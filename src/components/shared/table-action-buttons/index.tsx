import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";

type Props = {
  onUpdate?: () => void;
  onDelete?: () => void;
  deleting?: boolean;
  hasUpdate: boolean;
  hasDelete: boolean;
  items?: MenuProps["items"];
  loading?: boolean;
};

export const TableActionButtons: React.FC<Props> = ({
  deleting,
  hasDelete,
  hasUpdate,
  onDelete,
  onUpdate,
  loading,
  ...props
}) => {
  const items: MenuProps["items"] = [];

  if (hasUpdate) {
    items.push({
      key: "update",
      icon: <EditOutlined />,
      label: "Редактировать",
      onClick: onUpdate,
    });
  }

  if (hasDelete) {
    items.push({
      key: "delete",
      icon: deleting ? <LoadingOutlined /> : <DeleteOutlined />,
      label: "Удалить",
      onClick: onDelete,
      disabled: deleting,
    });
  }

  if (props.items) {
    items.push(...props.items);
  }

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      disabled={loading || deleting}
    >
      <Button
        icon={
          loading || deleting ? (
            <LoadingOutlined />
          ) : (
            <MoreOutlined style={{ transform: "rotate(90deg)" }} />
          )
        }
        onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  );
};
