import { getUsers } from "app/features";
import { useDispatch } from "app/store";
import { UsersPageContent } from "components/administration";
import { useEffect } from "react";

export const UsersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return <UsersPageContent />;
};
