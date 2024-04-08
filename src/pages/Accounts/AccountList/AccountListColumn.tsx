import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import { TagStatus } from "@app/components/atoms/TagStatus/TagStatus";
import i18n from "@app/config/i18n";
import { AccountsInterface } from "@app/interfaces/Account";
import React from "react";
import { CourseTag } from "@app/components/atoms/CourseTag/CourseTag";

export const AccountColumnsTable = (
  handleAction: (key: string, item: AccountsInterface) => void
): ColumnsType<AccountsInterface> => [
  {
    title: <Translation>{(t) => t("ACCOUNT.NAME")}</Translation>,
    dataIndex: "name",
    width: 150,
  },

  {
    title: <Translation>{(t) => t("ACCOUNT.EMAIL")}</Translation>,
    dataIndex: "email",
    width: 200,
  },
  {
    title: <Translation>{(t) => t("ACCOUNT.COURSES")}</Translation>,
    dataIndex: "courses",
    width: 200,
    render: (_text, record) => {
      if (Array.isArray(_text) && _text.includes(null)) {
        return <Translation>{(t) => t("COURSE.NO_INFO")}</Translation>;
      }

      return <CourseTag course={_text} />;
    },
  },
  {
    title: <Translation>{(t) => t("ACCOUNT.SCORE")}</Translation>,
    dataIndex: "score",
    width: 100,
  },
  {
    title: <Translation>{(t) => t("TABLE.ACTIONS")}</Translation>,
    dataIndex: "actions",
    key: "actions",
    fixed: "left",
    width: 100,
    render: (_text, record) => (
      <ButtonAction
        variant="success"
        handleAction={() => handleAction("detail", record)}
        tooltip={i18n.t("ACTION.DETAILS")}
      >
        <SearchOutlined />
      </ButtonAction>
    ),
  },
];
