import {
  HomeOutlined,
  LoadingOutlined,
  LockOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout as AntdLayout, Menu, MenuProps } from "antd";
import { Logo } from "assets/images";
import s from "./header.module.scss";
import { useCurrentPage } from "hooks/useCurrentPage";
import { NavLink } from "react-router-dom";
import { PATH } from "assets/constants";
import { useDispatch, useSelector } from "app/store";
import { logout } from "app/features/auth/authActions";

const { Header: AntdHeader } = AntdLayout;

export const Header = () => {
  const currentPage = useCurrentPage();
  const { userInfo, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const items: MenuProps["items"] = [
    {
      label: <NavLink to={PATH.MAIN}>Главная</NavLink>,
      key: "",
      icon: <HomeOutlined />,
    },
    {
      label: <NavLink to={PATH.ADMINSTRATION}>Администрирование</NavLink>,
      key: "administration",
      icon: <SettingOutlined />,
    },
    {
      label: userInfo?.email,
      key: "user",
      icon: <UserOutlined />,
      children: [
        {
          label: <NavLink to={PATH.ACCESS_SETTINGS}>Настройки входа</NavLink>,
          key: "access-settings",
          icon: <LockOutlined />,
        },
        {
          label: "Выйти",
          key: "logout",
          onClick: () => dispatch(logout()),
          disabled: loading,
          icon: loading ? <LoadingOutlined /> : <PoweroffOutlined />,
        },
      ],
    },
  ];

  return (
    <AntdHeader className={s.header}>
      <img src={Logo} className={s.header__logo} />
      <Menu
        mode="horizontal"
        items={items}
        disabledOverflow={true}
        className={s.header__menu}
        selectedKeys={[currentPage]}
      />
    </AntdHeader>
  );
};
