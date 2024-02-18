import { Button, ButtonProps, Form, FormProps, Modal, ModalProps } from "antd";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import s from "./createModal.module.scss";

type Props<T> = PropsWithChildren<{
  submitButtonProps: ButtonProps;
  formProps: FormProps<T>;
  modalProps: ModalProps;
}>;

export function CreateModal<T>({
  modalProps,
  formProps,
  submitButtonProps,
  children,
}: Props<T>) {
  const formClasses = classNames(s.createForm, formProps.className);
  const submitButtonClasses = classNames(
    s.submitButton,
    submitButtonProps.className
  );

  return (
    <Modal footer={null} destroyOnClose getContainer={false} {...modalProps}>
      <Form<T> className={formClasses} {...formProps}>
        {children}
        <Form.Item className={s.submitButtonWrapper}>
          <Button
            type="primary"
            htmlType="submit"
            className={submitButtonClasses}
            children="Добавить"
            {...submitButtonProps}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
