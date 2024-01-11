import { getUsers } from "app/features";
import { useDispatch, useSelector } from "app/store";
import { UsersPageContent } from "components/administration";
import { useEffect } from "react";

export const UsersPage = () => {
  const {
    usersMeta: { current_page, per_page },
  } = useSelector((state) => state.administration);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({ page: current_page, per_page }));
  }, [current_page, per_page]);

  return <UsersPageContent />;
};
