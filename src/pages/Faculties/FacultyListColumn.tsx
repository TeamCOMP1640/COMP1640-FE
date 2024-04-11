import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import i18n from "@app/config/i18n";
import { AcademicInterface } from "@app/interfaces/Academic";
import { Space, Typography } from "antd";
import { FacultyInterface } from "@app/interfaces/Faculty";

export const FacultyColumnsTable = (
  handleAction: (key: string, item: FacultyInterface) => void
): ColumnsType<FacultyInterface> => [
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
    render: (_text, record) => <Typography>{record.name}</Typography>,
  },
  {
    title: "Enrolment Key",
    dataIndex: "enrolment_key",
    width: 150,
  },
  {
    title: <Translation>{(t) => t("TABLE.ACTIONS")}</Translation>,
    dataIndex: "actions",
    key: "actions",
    fixed: "left",
    align: "right",
    width: 100,
    render: (_text, record) => (
      <Space>
        <ButtonAction
          variant="primary"
          tooltip={i18n.t("ACTION.EDIT")}
          handleAction={() => handleAction("update", record)}
        >
          <EditOutlined />
        </ButtonAction>
        <ButtonAction
          variant="danger"
          handleAction={() => handleAction("deleted", record)}
          tooltip={i18n.t("ACTION.DELETE")}
        >
          <DeleteOutlined />
        </ButtonAction>
      </Space>
    ),
  },
];
