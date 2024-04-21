import { Button, ButtonProps } from "antd";
import { UploadStudentPayments } from "../UploadStudentPayments";

type Props = {
  hasCreate: boolean;
  hasUpdate: boolean;
  onCreateButtonClick: ButtonProps["onClick"];
};

export const getHeaderActionButtons = ({
  hasCreate,
  hasUpdate,
  onCreateButtonClick,
}: Props) => {
  const buttons = [];

  if (hasCreate) {
    buttons.push(
      <Button
        children="Добавить студента"
        onClick={onCreateButtonClick}
        key="add-student-button"
      />
    );
  }

  if (hasUpdate) {
    buttons.push(<UploadStudentPayments key="excel-import-button" />);
  }

  return buttons.length ? buttons : undefined;
};
