import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space } from "antd";
import { ColumnType } from "antd/es/table";

type Props = {
  searchInput: React.RefObject<InputRef>;
  onFilter: (value: React.Key | undefined) => void;
};

export function getColumnSearchProps<T>({
  searchInput,
  onFilter,
}: Props): ColumnType<T> {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          autoFocus={true}
          ref={searchInput}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            onFilter(selectedKeys[0]);
            // dispatch(setFilters({ ...filters, [dataIndex]: selectedKeys[0] }));
            close();
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              onFilter(selectedKeys[0]);
              // dispatch(
              //   setFilters({ ...filters, [dataIndex]: selectedKeys[0] })
              // );
              close();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button
            onClick={() => {
              onFilter(undefined);
              // dispatch(setFilters({ ...filters, [dataIndex]: undefined }));
              setSelectedKeys([]);
              close();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
          <Button type="link" size="small" onClick={close}>
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
  };
}
