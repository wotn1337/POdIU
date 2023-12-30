import { getDormitories } from "app/features/dormitories";
import { useDispatch, useSelector } from "app/store";
import { DormitoriesContent } from "components/dormitories";
import { useEffect } from "react";

export const DormitoriesPage = () => {
  const { current_page, per_page } = useSelector((state) => state.dormitories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDormitories({ page: current_page, per_page }));
  }, [current_page, per_page]);

  return <DormitoriesContent />;
};
