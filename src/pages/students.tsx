import { getStudents } from "app/features/students";
import { useDispatch, useSelector } from "app/store";
import { Forbidden } from "components/shared/Forbidden";
import { StudentsPageContent } from "components/students";
import { useUserPermissions } from "hooks/useUserPermissions";
import { useEffect } from "react";

export const StudentsPage = () => {
  const { current_page, per_page, filters, sorters } = useSelector(
    (state) => state.students
  );
  const dispatch = useDispatch();
  const { students } = useUserPermissions();

  useEffect(() => {
    if (students.read) {
      dispatch(
        getStudents({
          page: current_page,
          per_page,
          with_dormitory: true,
          filters,
          sorters,
        })
      );
    }
  }, [current_page, per_page, filters, sorters, students]);

  return (
    <Forbidden access={students.read}>
      <StudentsPageContent />
    </Forbidden>
  );
};
