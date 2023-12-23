import { DeleteOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import s from "./deleteButton.module.scss";

export const DeleteButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      className={s.deleteButton}
      icon={<DeleteOutlined className={s.deleteButton__icon} />}
      {...props}
    />
  );
};
