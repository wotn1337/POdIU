import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import s from "./layout.module.scss";

const { Content } = AntdLayout;

export const Layout: React.FC = () => {
  return (
    <AntdLayout className={s.layout}>
      <Header />
      <Content className={s.content}>
        <Outlet />
      </Content>
    </AntdLayout>
  );
};
