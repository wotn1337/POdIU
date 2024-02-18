import { UsersPageContent } from "components/administration";
import { Forbidden } from "components/shared";
import { useUserPermissions } from "hooks";

export const UsersPage = () => {
  const { users } = useUserPermissions();

  return (
    <Forbidden access={users.read}>
      <UsersPageContent />
    </Forbidden>
  );
};
