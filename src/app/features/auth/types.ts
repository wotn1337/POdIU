import { WithMessage } from "app/types";
import { User } from "../users";

export type LoginUserData = {
  email: string;
  password: string;
};

export type LoginResponse = WithMessage<{
  user: User;
}>;

export type LogoutResponse = LoginResponse;

export type AuthStateType = {
  user?: User;
};
