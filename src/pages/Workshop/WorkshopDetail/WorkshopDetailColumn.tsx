import { Translation } from "react-i18next";

import { FeedbackInterface } from "@app/interfaces/workshop.interface";
import { TableColumnsType, Tooltip } from "antd";

export const WorkshopDetailColumnsTable: TableColumnsType<FeedbackInterface> = [
  {
    title: <Translation>{(t) => t("WORKSHOP.REVIEWER")}</Translation>,
    width: 120,
    dataIndex: "reviewer",
  },
  {
    title: <Translation>{(t) => t("WORKSHOP.SCORES")}</Translation>,
    dataIndex: "scores",
    width: 100,
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
