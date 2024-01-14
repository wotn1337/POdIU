import { getUsers } from "app/features";
import { useDispatch, useSelector } from "app/store";
import { UsersPageContent } from "components/administration";
import { Forbidden } from "components/shared/Forbidden";
import { useUserPermissions } from "hooks/useUserPermissions";
import { useEffect } from "react";

export const UsersPage = () => {
  const {
    usersMeta: { current_page, per_page },
  } = useSelector((state) => state.administration);
  const { users } = useUserPermissions();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({ page: current_page, per_page }));
  }, [current_page, per_page]);

  return (
    <Forbidden access={users.read}>
      <UsersPageContent />
    </Forbidden>
  );
};
