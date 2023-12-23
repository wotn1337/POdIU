import { getRoles } from "app/features";
import { useDispatch } from "app/store";
import { RolesPageContent } from "components/administration";
import { useEffect } from "react";

export const RolesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return <RolesPageContent />;
};
