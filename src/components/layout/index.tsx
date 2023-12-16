import { Layout as AntdLayout } from "antd";
import { setLogin } from "app/features/auth/authSlice";
import { useDispatch, useSelector } from "app/store";
import { PATH } from "assets/constants";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./header";
import s from "./layout.module.scss";

const { Content } = AntdLayout;

export const Layout: React.FC = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const user = sessionStorage.getItem("user");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setLogin(JSON.parse(user)));
    }
  }, []);

  if (!loggedIn && !user) {
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
