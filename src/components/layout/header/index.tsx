import {
  ApartmentOutlined,
  AuditOutlined,
  BankOutlined,
  LoadingOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout as AntdLayout, Menu, MenuProps } from "antd";
import { logout } from "app/features/auth/authActions";
import { useDispatch, useSelector } from "app/store";
import { PATH } from "assets/constants";
import { Logo } from "assets/images";
import { useCurrentPage } from "hooks/useCurrentPage";
import { NavLink } from "react-router-dom";
import s from "./header.module.scss";

const { Header: AntdHeader } = AntdLayout;

export const Header = () => {
  const currentPage = useCurrentPage();
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const items: MenuProps["items"] = [
    {
      label: "Администрирование",
      key: "administration",
      icon: <SettingOutlined />,
      children: [
        {
          label: <NavLink to={PATH.USERS}>Пользователи</NavLink>,
          key: PATH.USERS,
          icon: <UserSwitchOutlined />,
        },
        {
          label: <NavLink to={PATH.ROLES}>Роли</NavLink>,
          key: PATH.ROLES,
          icon: <ApartmentOutlined />,
        },
      ],
    },
    {
      label: <NavLink to={PATH.STUDENTS}>Студенты</NavLink>,
      key: PATH.STUDENTS,
      icon: <TeamOutlined />,
    },
    {
      label: <NavLink to={PATH.DORMITORIES}>Общежития</NavLink>,
      key: PATH.DORMITORIES,
      icon: <BankOutlined />,
    },
    {
      label: user?.name,
      key: "user",
      icon: <UserOutlined />,
      children: [
        {
          label: "Выйти",
          key: "logout",
          onClick: () => dispatch(logout()),
          disabled: loading,
          icon: loading ? <LoadingOutlined /> : <LogoutOutlined />,
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
