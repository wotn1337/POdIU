import { getUsers } from "app/features/administration/administrationActions";
import { useDispatch } from "app/store";
import { AdministrationPageContent } from "components/administration";
import { useEffect } from "react";

export const AdministrationPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return <AdministrationPageContent />;
};
