export type StateType = {
  loading: boolean;
  userInfo?: { email: string };
  error: string | null | undefined;
  loggedIn: boolean;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
};

export type LogoutResponse = LoginResponse;

export type LoginResponseWithEmail = LoginResponse & {
  email: string;
};
