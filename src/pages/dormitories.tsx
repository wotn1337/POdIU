import { message } from "antd";
import { getDormitories, setMessages } from "app/features/dormitories";
import { useDispatch, useSelector } from "app/store";
import { DormitoriesContent } from "components/dormitories";
import { useEffect } from "react";

export const DormitoriesPage = () => {
  const { current_page, per_page, filters, sorters, messages } = useSelector(
    (state) => state.dormitories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getDormitories({ page: current_page, per_page, filters, sorters })
    );
  }, [current_page, per_page, filters, sorters]);

  useEffect(() => {
    if (messages.length) {
      messages.forEach((m) => message.success(m));
      dispatch(setMessages([]));
    }
  }, [messages]);

  return <DormitoriesContent />;
};
