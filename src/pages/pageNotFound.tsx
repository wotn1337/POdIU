import { Button, Result } from "antd";
import { PATH } from "assets/constants";
import { NavLink } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={
          <NavLink to={PATH.USERS}>
            <Button type="primary">К странице пользователей</Button>
          </NavLink>
        }
      />
    </div>
  );
};
