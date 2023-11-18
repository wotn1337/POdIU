import {
  BankOutlined,
  HomeOutlined,
  LockOutlined,
  PoweroffOutlined,
  SettingOutlined,
  TableOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout as AntdLayout, Menu, MenuProps } from "antd";
import { Logo } from "assets/images";
import s from "./header.module.scss";
import { useCurrentPage } from "hooks/useCurrentPage";
import { NavLink } from "react-router-dom";
import { PATH } from "assets/constants";

const { Header: AntdHeader } = AntdLayout;

const items: MenuProps["items"] = [
  {
    label: <NavLink to={PATH.MAIN}>Главная</NavLink>,
    key: PATH.MAIN,
    icon: <HomeOutlined />,
  },
  {
    label: <NavLink to={PATH.ADMINSTRATION}>Администрирование</NavLink>,
    key: PATH.ADMINSTRATION,
    icon: <SettingOutlined />,
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
    label: <NavLink to={PATH.SETTLEMENT}>Поселение</NavLink>,
    key: PATH.SETTLEMENT,
    icon: <TableOutlined />,
  },
  {
    label: "Имя пользователя",
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
        icon: <PoweroffOutlined />,
      },
    ],
  },
];

export const Header = () => {
  const currentPage = useCurrentPage();

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
