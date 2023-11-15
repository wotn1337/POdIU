import { Typography } from "antd";
import { Logo } from "assets/images";
import s from "./login.module.scss";
import { LoginForm } from ".";

const { Title, Text } = Typography;

export const LoginPageContent = () => {
  return (
    <section className={s.loginPage}>
      <img src={Logo} className={s.logo} />
      <Title className={s.title}>Добро пожаловать!</Title>
      <Text className={s.text}>
        Чтобы продолжить работу, пожалуйста, авторизуйтесь
      </Text>
      <LoginForm />
    </section>
  );
};
