import { User } from "app/features";
import { useSelector } from "app/store";

type CrudPermissions = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

const hasPermission = (
  model: string,
  title: string,
  user: User | undefined
) => {
  const rolesPermissions = user?.roles.map((r) => r.permissions).flat(1);
  const permissions = [
    ...(user?.permissions ?? []),
    ...(rolesPermissions ?? []),
  ];

  return (
    user?.is_admin ||
    permissions.some((p) => model === p.model && title === p.title)
  );
};

export const useUserPermissions = () => {
  const { user } = useSelector((state) => state.auth);

  const users: CrudPermissions = {
    create: hasPermission("Пользователь", "Создание", user),
    read: hasPermission("Пользователь", "Просмотр", user),
    update: hasPermission("Пользователь", "Обновление", user),
    delete: hasPermission("Пользователь", "Удаление", user),
  };

  const students: CrudPermissions = {
    create: hasPermission("Студенты", "Создание", user),
    read: hasPermission("Студенты", "Просмотр", user),
    update: hasPermission("Студенты", "Обновление", user),
    delete: hasPermission("Студенты", "Удаление", user),
  };

  const dormitories: CrudPermissions = {
    create: hasPermission("Общежитие", "Создание", user),
    read: hasPermission("Общежитие", "Просмотр", user),
    update: hasPermission("Общежитие", "Обновление", user),
    delete: hasPermission("Общежитие", "Удаление", user),
  };

  const roles: CrudPermissions = {
    create: hasPermission("Роль", "Создание", user),
    read: hasPermission("Роль", "Просмотр", user),
    update: hasPermission("Роль", "Обновление", user),
    delete: hasPermission("Роль", "Удаление", user),
  };

  const settlementHistory: CrudPermissions = {
    create: hasPermission("История поселения", "Создание", user),
    read: hasPermission("История поселения", "Просмотр", user),
    update: hasPermission("История поселения", "Обновление", user),
    delete: hasPermission("История поселения", "Удаление", user),
  };

  return {
    users,
    students,
    dormitories,
    roles,
    settlementHistory,
  };
};
