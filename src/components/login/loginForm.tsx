import { Button, Flex, Form, Typography } from "antd";
import {
  LoginUserData,
  useLazyGetCsrfQuery,
  useLoginMutation,
} from "app/features";
import { WarningIcon } from "assets/images";
import { Input } from "components/shared";
import s from "./login.module.scss";

const { Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [getCsrf] = useLazyGetCsrfQuery();

  const onLogin = (values: LoginUserData) => {
    getCsrf().then(() => login(values));
  };

  return (
    <Form<LoginUserData>
      name="login"
      className={s.loginForm}
      layout="vertical"
      onFinish={onLogin}
      disabled={isLoading}
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Введите почту" },
          { type: "email", message: "Некорректный email" },
        ]}
        className={s.loginForm__item}
      >
        <Input placeholder="Введите email" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
        className={s.loginForm__item}
      >
        <Input type="password" placeholder="Введите пароль" />
      </Form.Item>
      <Flex className={s.infoMessage} gap={14} align="flex-start">
        <img src={WarningIcon} />
        <Text>Нет аккаунта? Запросите регистрацию у администратора.</Text>
      </Flex>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={s.submitButton}
          loading={isLoading}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
