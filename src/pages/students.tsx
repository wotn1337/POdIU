import { getStudents } from "app/features/students";
import { useDispatch, useSelector } from "app/store";
import { StudentsPageContent } from "components/students";
import { useEffect } from "react";

export const StudentsPage = () => {
  const { current_page, per_page, filters, sorters } = useSelector(
    (state) => state.students
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getStudents({
        page: current_page,
        per_page,
        with_dormitory: true,
        filters,
        sorters,
      })
    );
  }, [current_page, per_page, filters, sorters]);

  return <StudentsPageContent />;
};
