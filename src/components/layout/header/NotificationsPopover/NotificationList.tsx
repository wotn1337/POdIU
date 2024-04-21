import { Empty, List, Pagination, PaginationProps, Skeleton } from "antd";
import s from "../header.module.scss";
import { useLazyGetUserNotificationsQuery } from "app/features";
import { useEffect, useState } from "react";
import { PaginationParams } from "app/types";
import { NotificationItem } from "./NotificationItem";
import { useSelector } from "app/store";

export const NotificationList = () => {
  const [getNotifications, { isLoading, data }] =
    useLazyGetUserNotificationsQuery();
  const { notifications } = useSelector((state) => state.users);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    per_page: 5,
  });

  const onPaginationChange: PaginationProps["onChange"] = (page, per_page) => {
    setPaginationParams({ page, per_page });
  };

  useEffect(() => {
    getNotifications(paginationParams);
  }, [paginationParams]);

  return (
    <Skeleton
      loading={isLoading}
      paragraph={{ rows: 5 }}
      className={s.notificationsSkeleton}
    >
      <List
        bordered
        dataSource={notifications}
        className={s.notificationsList}
        renderItem={(item) => <NotificationItem {...item} key={item.id} />}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет уведомлений"
            />
          ),
        }}
      />
      <Pagination
        current={paginationParams.page}
        pageSize={paginationParams.per_page}
        onChange={onPaginationChange}
        total={data?.meta.total}
        hideOnSinglePage
        size="small"
        className={s.notificationsPagination}
      />
    </Skeleton>
  );
};
