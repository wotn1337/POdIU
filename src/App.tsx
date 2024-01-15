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
import { useUserPermissions } from "./hooks";
import { Forbidden } from "components/shared/Forbidden";

function App() {
  const [cookies] = useCookies();
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  const { students, dormitories, roles, users } = useUserPermissions();

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
        <Route
          index
          path={PATH.USERS}
          element={
            <Forbidden access={users.read}>
              <UsersPage />
            </Forbidden>
          }
        />
        <Route
          path={PATH.ROLES}
          element={
            <Forbidden access={roles.read}>
              <RolesPage />
            </Forbidden>
          }
        />
        <Route
          path={PATH.STUDENTS}
          element={
            <Forbidden access={students.read}>
              <StudentsPage />
            </Forbidden>
          }
        />
        <Route
          path={PATH.DORMITORIES}
          element={
            <Forbidden access={dormitories.read}>
              <DormitoriesPage />
            </Forbidden>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
