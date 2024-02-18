import { Cookies } from "react-cookie";
import { User } from "..";

export const isObject = (object: unknown): object is Record<string, any> => {
  return typeof object === "object" && object !== null;
};

export const isUser = (user: unknown): user is User => {
  return (
    isObject(user) &&
    user.id !== undefined &&
    user.name !== undefined &&
    user.email !== undefined &&
    user.roles !== undefined &&
    user.permissions !== undefined &&
    user.is_admin !== undefined
  );
};

export const getInitialUser = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : undefined;
  const cookies = new Cookies();
  const token = cookies.get("XSRF-TOKEN");

  if (token && isUser(user)) {
    return user;
  }

  return undefined;
};
