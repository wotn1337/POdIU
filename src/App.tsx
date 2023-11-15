import { Typography } from "antd";
import { PATH } from "assets/constants";
import { Layout } from "components/layout";
import { LoginPage } from "pages";
import { AdministrationPage } from "pages/administration";
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
          path={PATH.ACCESS_SETTINGS}
          element={<Typography.Title>Настройки входа</Typography.Title>}
        />
      </Route>
    </Routes>
  );
}

export default App;
