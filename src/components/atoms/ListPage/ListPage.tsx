import { Space } from "antd";
import { FC, ReactNode } from "react";

import { IBreadcrumbItem } from "@app/interfaces";
import { Header } from "antd/lib/layout/layout";
import { Breadcrumb } from "../../molecules/Breadcrumb/Breadcrumb";
import Card from "../../molecules/Card/Card";
import "./ListPage.scss";

type Props = {
  children: ReactNode;
  page: IBreadcrumbItem[];
  extra?: ReactNode;
  title?: ReactNode;
  subTitle?: string;
  className?: string;
};

export const ListPage: FC<Props> = ({
  children,
  page,
  extra,
  title,
  className,
  subTitle,
}: Props) => {
  return (
    <div className="listpage">
      <Header className="px-0px w-full flex justify-between pr-48px bg-primary_bg">
        <Breadcrumb items={page} />
      </Header>
      <Card
        className={`${className} overflow-hidden`}
        title={
          extra ? (
            <div className="flex justify-between">
              <span>{title}</span> &nbsp;
              <span className="text-text-color">{subTitle}</span>
              <Space direction="horizontal">{extra}</Space>
            </div>
          ) : (
            <>
              <span>{title}</span> &nbsp;
              <span className="text-text-color">{subTitle}</span>
            </>
          )
        }
      >
        {children}
      </Card>
    </div>
  );
};
