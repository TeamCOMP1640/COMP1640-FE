import { Translation } from "react-i18next";

import { FeedbackInterface } from "@app/interfaces/workshop.interface";
import { TableColumnsType, Tooltip } from "antd";
import { ArticleInterface } from "@app/interfaces/Article";

export const MagazineDetailColumnTable: TableColumnsType<ArticleInterface> = [
  {
    title: "Title",
    width: 120,
    dataIndex: "title",
  },
  {
    title: "Description",
    width: 120,
    dataIndex: "description",
  },
  {
    title: <Translation>{(t) => t("WORKSHOP.CONTENT")}</Translation>,
    dataIndex: "content",
    width: 300,
    ellipsis: {
      showTitle: false,
    },
    render: (content) => (
      <Tooltip
        placement="topLeft"
        title={content}
        overlayStyle={{ maxWidth: "50%" }}
      >
        {content}
      </Tooltip>
    ),
  },
];
