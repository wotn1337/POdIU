import { Space, Typography } from "antd";
import { ContentWrapper } from "components/shared";
import s from "./administration.module.scss";
import { UserAddOutlined } from "@ant-design/icons";
import { UserList } from "./userList";

export const AdministrationPageContent = () => {
  return (
    <ContentWrapper>
      <section className={s.administrationInner}>
        <Space size={30} align="center" className={s.titleWrapper}>
          <Typography.Title className={s.title}>
            Список пользователей
          </Typography.Title>
          <UserAddOutlined className={s.addUserIcon} />
        </Space>
        <UserList />
      </section>
    </ContentWrapper>
  );
};
