import { retry } from "@reduxjs/toolkit/query";
import { Flex, Result } from "antd";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  access: boolean;
}>;

export const Forbidden: React.FC<Props> = ({ access, children }) => {
  if (access) {
    return children;
  }

  return (
    <Flex align="center" justify="center" flex={1}>
      <Result
        status="warning"
        title="У вас нет доступа к этому разделу. Запросите его у администратора."
      />
    </Flex>
  );
};
