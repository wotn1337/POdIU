import { Button, Flex, Form, Typography } from "antd";
import { Input } from "components/shared";
import s from "./login.module.scss";
import { WarningIcon } from "assets/images";

const { Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  return (
    <Form name="login" className={s.loginForm} layout="vertical">
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Введите почту!" }]}
        className={s.loginForm__item}
      >
        <Input placeholder="Введите свой email" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
        className={s.loginForm__item}
      >
        <Input type="password" placeholder="Введите свой пароль" />
      </Form.Item>
      <Flex className={s.infoMessage} gap={14} align="flex-start">
        <img src={WarningIcon} />
        <Text>Нет аккаунта? Запросите регистрацию у администратора.</Text>
      </Flex>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={s.submitButton}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
