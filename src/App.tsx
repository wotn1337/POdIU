import { Typography } from "antd";
import { PATH } from "assets/constants";
import { Layout } from "components/layout";
import { AdministrationPage, DormitoriesPage, LoginPage } from "pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route
          index
          path={PATH.MAIN}
          element={<Typography.Title>Главная</Typography.Title>}
        />
        <Route path={PATH.ADMINSTRATION} element={<AdministrationPage />} />
        <Route
          path={PATH.STUDENTS}
          element={<Typography.Title>Студенты</Typography.Title>}
        />
        <Route path={PATH.DORMITORIES} element={<DormitoriesPage />} />
        <Route
          path={PATH.SETTLEMENT}
          element={<Typography.Title>Поселение</Typography.Title>}
        />
        <Route
          path={PATH.ACCESS_SETTINGS}
          element={<Typography.Title>Настройки входа</Typography.Title>}
        />
      </Route>
    </Routes>
  );
}

export default App;
