import { PropsWithChildren } from "react";
import s from "./content-wrapper.module.scss";

export const ContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={s.contentWrapper}>{children}</div>;
};
