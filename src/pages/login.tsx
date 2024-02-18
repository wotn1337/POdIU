import { useSelector } from "app/store";
import { PATH } from "assets/constants";
import { LoginPageContent } from "components/login";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to={PATH.MAIN} />;
  }

  return <LoginPageContent />;
};
