import { Button, ButtonProps, Form, FormProps, Modal, ModalProps } from "antd";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import s from "./createModal.module.scss";

type Props = PropsWithChildren<{
  openButtonProps: ButtonProps;
  submitButtonProps: ButtonProps;
  formProps: FormProps;
  modalProps: ModalProps;
}>;

export const CreateModal: React.FC<Props> = ({
  openButtonProps,
  modalProps,
  formProps,
  submitButtonProps,
  children,
}) => {
  const formClasses = classNames(s.createForm, formProps.className);
  const submitButtonClasses = classNames(
    s.submitButton,
    submitButtonProps.className
  );

  return (
    <>
      <Button {...openButtonProps} />
      <Modal footer={null} destroyOnClose getContainer={false} {...modalProps}>
        <Form className={formClasses} {...formProps}>
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
    </>
  );
};
