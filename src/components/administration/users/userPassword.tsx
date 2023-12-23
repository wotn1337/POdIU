import { Input } from "antd";
import s from "./administration.module.scss";

type Props = {
  password: string;
};

export const UserPassword: React.FC<Props> = ({ password }) => {
  return (
    <Input.Password
      readOnly={true}
      value={password}
      className={s.user__descriptions__password}
      style={{ width: `calc(${password.length}ch + 24px)` }}
    />
  );
};
