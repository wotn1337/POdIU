import { clearState, getDormitories } from "app/features/dormitories";
import { useDispatch, useSelector } from "app/store";
import { DormitoriesContent } from "components/dormitories";
import { useEffect } from "react";

export const DormitoriesPage = () => {
  const { current_page, per_page, filters, sorters } = useSelector(
    (state) => state.dormitories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getDormitories({ page: current_page, per_page, filters, sorters })
    );
    return () => {
      dispatch(clearState());
    };
  }, [current_page, per_page, filters, sorters]);

  return <DormitoriesContent />;
};
