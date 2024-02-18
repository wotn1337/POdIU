import { PATH } from "assets/constants";
import { Layout } from "components/layout";
import { Forbidden } from "components/shared/Forbidden";
import {
  DormitoriesPage,
  LoginPage,
  PageNotFound,
  RolesPage,
  StudentsPage,
  UsersPage,
} from "pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUserPermissions } from "./hooks";

function App() {
  const { students, dormitories } = useUserPermissions();

  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={PATH.USERS} />} />
        <Route index path={PATH.USERS} element={<UsersPage />} />
        <Route path={PATH.ROLES} element={<RolesPage />} />
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
