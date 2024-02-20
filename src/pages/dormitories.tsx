import { DormitoriesContent } from "components/dormitories";
import { Forbidden } from "components/shared";
import { useUserPermissions } from "hooks/useUserPermissions";

export const DormitoriesPage = () => {
  const { dormitories } = useUserPermissions();
  return (
    <Forbidden access={dormitories.read}>
      <DormitoriesContent />
    </Forbidden>
  );
};
