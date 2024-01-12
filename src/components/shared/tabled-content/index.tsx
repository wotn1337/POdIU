import { SearchOutlined } from "@ant-design/icons";
import { Empty, Input, Layout, Space, Table, Typography } from "antd";
import { AnyObject } from "antd/es/_util/type";
import type { TableProps } from "antd/es/table";
import { ContentWrapper } from "components/shared";
import { useEffect, useState } from "react";
import s from "./tabledContent.module.scss";
import classNames from "classnames";

const { Content, Header } = Layout;

type Props<T> = TableProps<T> & {
  pageTitle?: string;
  layoutClassName?: string;
  actionButtons?: React.ReactNode | React.ReactNode[];
};

export function TabledContent<T extends AnyObject>({
  dataSource,
  pageTitle,
  actionButtons,
  layoutClassName,
  ...props
}: Props<T>) {
  const [data, setData] = useState(dataSource);
  const [searchValue, setSearchInput] = useState<string>();
  const className = classNames(s.tabledContent, layoutClassName);

  useEffect(() => {
    setData(
      dataSource?.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().includes(searchValue ?? "")
        )
      )
    );
  }, [searchValue]);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  return (
    <ContentWrapper>
      <Layout className={className}>
        <Header className={s.tabledContent__header}>
          <Space size={30} align="center" className={s.titleWrapper}>
            {pageTitle && (
              <Typography.Title className={s.title}>
                {pageTitle}
              </Typography.Title>
            )}
            {actionButtons}
          </Space>
          <Input
            placeholder="Искать..."
            prefix={<SearchOutlined className={s.searchInput__icon} />}
            className={s.searchInput}
            value={searchValue}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Header>
        <Content className={s.tabledContent__content}>
          <Table
            {...props}
            dataSource={data}
            className={s.tabledContent__content__table}
            rowKey="id"
            scroll={{ x: "100%" }}
            locale={{
              filterReset: "Сбросить",
              emptyText: (
                <Empty
                  description="Нет данных"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
              triggerAsc: "Отсортировать по возрастанию",
              triggerDesc: "Отсортировать по убыванию",
              cancelSort: "Сбросить сортировку",
            }}
            pagination={
              props.pagination
                ? {
                    ...props.pagination,
                    defaultPageSize: 10,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                      `Показано ${range.join(" - ")} (всего ${total})`,
                    locale: { items_per_page: "строк на страницу" },
                  }
                : false
            }
          />
        </Content>
      </Layout>
    </ContentWrapper>
  );
}
