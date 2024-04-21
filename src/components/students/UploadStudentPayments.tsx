import { FileExcelOutlined } from "@ant-design/icons";
import { Button, Upload, UploadProps, message } from "antd";
import { useStudentPaymentsImportMutation } from "app/features";

type Props = {};

export const UploadStudentPayments: React.FC<Props> = () => {
  const [importExcel, { isLoading }] = useStudentPaymentsImportMutation();

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    ) {
      importExcel(file);
      return false;
    }

    message.error("Неверный тип файла");
    return Upload.LIST_IGNORE;
  };

  return (
    <Upload
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      <Button icon={<FileExcelOutlined />} loading={isLoading}>
        Импорт задолженностей
      </Button>
    </Upload>
  );
};
