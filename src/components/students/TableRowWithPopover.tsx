// @ts-nocheck
import {
  Descriptions,
  DescriptionsProps,
  Popover,
  PopoverProps,
  Skeleton,
} from "antd";
import { Student, useLazyGetStudentPaymentsQuery } from "app/features";
import { useEffect, useState } from "react";

type Props = JSX.IntrinsicAttributes & {
  children: { props: { record: Student } }[];
};

export const TalbeRowWithPopover: React.FC<Props> = (props) => {
  const [getStudentPayments, { isFetching, isLoading, data, currentData }] =
    useLazyGetStudentPaymentsQuery();
  const commentItem = {
    key: "comment",
    label: "Комментарий",
    children: props.children[0]?.props.record.comment,
  };
  const [items, setItems] = useState<DescriptionsProps["items"]>([commentItem]);

  const onOpenChange: PopoverProps["onOpenChange"] = (open) => {
    if (open) {
      getStudentPayments(props.children[0].props.record.id);
    }
  };

  useEffect(() => {
    if (data) {
      setItems([
        commentItem,
        ...data.student_payments.map((payment) => ({
          key: payment.value,
          label: payment.student_payment_type.title,
          children: payment.value,
        })),
      ]);
    }
  }, [data]);

  return (
    <Popover
      title="Дополнительная информация"
      content={
        <Skeleton
          loading={isLoading || isFetching}
          active
          paragraph={{ rows: 3 }}
          style={{ width: 400 }}
          title={false}
        >
          <Descriptions
            items={items}
            layout="horizontal"
            column={1}
            style={{ maxWidth: 400 }}
          />
        </Skeleton>
      }
      onOpenChange={onOpenChange}
    >
      <tr {...props} />
    </Popover>
  );
};
