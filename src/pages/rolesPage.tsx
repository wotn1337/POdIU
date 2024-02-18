import { RolesPageContent } from "components/administration";
import { Forbidden } from "components/shared";
import { useUserPermissions } from "hooks";

export const RolesPage = () => {
  const { roles } = useUserPermissions();

  return (
    <Forbidden access={roles.read}>
      <RolesPageContent />;
    </Forbidden>
  );
};
