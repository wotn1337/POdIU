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
  pageTitle,
  actionButtons,
  layoutClassName,
  ...props
}: Props<T>) {
  const className = classNames(s.tabledContent, layoutClassName);

  return (
    <ContentWrapper>
      <Layout className={className}>
        <Header className={s.tabledContent__header}>
          <Space
            size={30}
            align="center"
            className={s.titleWrapper}
            wrap={true}
          >
            {pageTitle && (
              <Typography.Title className={s.title}>
                {pageTitle}
              </Typography.Title>
            )}
            {actionButtons}
          </Space>
        </Header>
        <Content className={s.tabledContent__content}>
          <Table
            {...props}
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
