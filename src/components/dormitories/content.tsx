import { ContentWrapper, Input } from "components/shared";
import s from "./dormitories.module.scss";
import { SearchOutlined } from "@ant-design/icons";

export const DormitoriesPageContent = () => {
  return (
    <ContentWrapper>
      <section className={s.dormitoriesInner}>
        <Input
          prefix={<SearchOutlined className={s.searchInput__icon} />}
          className={s.searchInput}
          placeholder="Искать..."
        />
      </section>
    </ContentWrapper>
  );
};
