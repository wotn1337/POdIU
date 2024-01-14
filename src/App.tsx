import { setLogin, setLogout } from "app/features/auth/authSlice";
import { useDispatch } from "app/store";
import { PATH } from "assets/constants";
import { Layout } from "components/layout";
import {
  DormitoriesPage,
  LoginPage,
  PageNotFound,
  RolesPage,
  StudentsPage,
  UsersPage,
} from "pages";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const [cookies] = useCookies();
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setLogin(JSON.parse(user)));
    }
  }, [user]);

  useEffect(() => {
    if (!cookies["XSRF-TOKEN"]) {
      dispatch(setLogout());
      localStorage.removeItem("user");
    }
  }, [cookies]);

  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={PATH.USERS} />} />
        <Route index path={PATH.USERS} element={<UsersPage />} />
        <Route path={PATH.ROLES} element={<RolesPage />} />
        <Route path={PATH.STUDENTS} element={<StudentsPage />} />
        <Route path={PATH.DORMITORIES} element={<DormitoriesPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
