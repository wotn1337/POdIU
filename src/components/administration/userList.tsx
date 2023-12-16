import { Skeleton, Space } from "antd";
import s from "./administration.module.scss";
import { User } from "./user";
import { useSelector } from "app/store";

export const UserList: React.FC = () => {
  const { loading, users } = useSelector((state) => state.administration);
  return (
    <Skeleton loading={loading} active>
      <Space direction="vertical" size={24} className={s.userList}>
        {users.map((user, index) => (
          <User key={index} {...user} />
        ))}
      </Space>
    </Skeleton>
  );
};
