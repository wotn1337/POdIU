import { Layout as AntdLayout } from "antd";
import { useSelector } from "app/store";
import { PATH } from "assets/constants";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./header";
import s from "./layout.module.scss";

const { Content } = AntdLayout;

export const Layout: React.FC = () => {
  const { loggedIn } = useSelector((state) => state.auth);

  if (!loggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <AntdLayout className={s.layout}>
      <Header />
      <Content className={s.content}>
        <Outlet />
      </Content>
    </AntdLayout>
  );
};
