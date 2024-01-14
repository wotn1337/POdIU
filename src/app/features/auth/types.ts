import { User } from "../administration/types";

export type StateType = {
  loading: boolean;
  user?: User;
  error: string | null | undefined;
  loggedIn: boolean;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: User;
};

export type LogoutResponse = LoginResponse;
