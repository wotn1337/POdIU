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
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
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
