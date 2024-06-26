import {
  ApartmentOutlined,
  BankOutlined,
  LoadingOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout as AntdLayout, Menu, MenuProps, Space } from "antd";
import { useLogoutMutation } from "app/features";
import { useSelector } from "app/store";
import { PATH } from "assets/constants";
import { Logo } from "assets/images";
import { useCurrentPage } from "hooks/useCurrentPage";
import { NavLink } from "react-router-dom";
import s from "./header.module.scss";
import { NotificationsDropdown } from "./NotificationsPopover";

const { Header: AntdHeader } = AntdLayout;

export const Header = () => {
  const currentPage = useCurrentPage();
  const { user } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();

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
          onClick: () => logout(),
          disabled: isLoading,
          icon: isLoading ? <LoadingOutlined /> : <LogoutOutlined />,
        },
      ],
    },
  ];

  return (
    <AntdHeader className={s.header}>
      <img src={Logo} className={s.header__logo} />
      <Space size={32}>
        <Menu
          mode="horizontal"
          items={items}
          disabledOverflow={true}
          className={s.header__menu}
          selectedKeys={[currentPage]}
        />
        <NotificationsDropdown />
      </Space>
    </AntdHeader>
  );
};
