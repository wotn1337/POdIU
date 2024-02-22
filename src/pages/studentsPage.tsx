import { Forbidden } from "components/shared";
import { StudentsPageContent } from "components/students";
import { useUserPermissions } from "hooks";

export const StudentsPage = () => {
  const { students } = useUserPermissions();

  return (
    <Forbidden access={students.read}>
      <StudentsPageContent />
    </Forbidden>
  );
};
