import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import Card from "@app/components/molecules/Card/Card";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const GiftList: FC<Props> = () => {
  const { t } = useTranslation();
  const breadcrumbItems: IBreadcrumbItem[] = [{ key: BREADCRUMBS_ENUM.GIFTS }];

  return (
    <ListPage
      page={breadcrumbItems}
      title={t("BREADCRUMBS.GIFTS")}
      className="p-1rem"
    >
      <Card className="m-1rem p-2rem">GiftList</Card>
    </ListPage>
  );
};

export default GiftList;
