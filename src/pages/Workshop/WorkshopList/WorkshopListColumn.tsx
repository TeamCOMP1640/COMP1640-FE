import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import { TagStatus } from "@app/components/atoms/TagStatus/TagStatus";
import i18n from "@app/config/i18n";
import { toDateString } from "@app/helpers/format";
import { WorkshopInterface } from "@app/interfaces/workshop.interface";
import { Space } from "antd";
import { StatusCourseEnum } from "@app/constant";

export const WorkshopColumnsTable = (
  handleAction: (key: string, item: WorkshopInterface) => void
): ColumnsType<WorkshopInterface> => [
  {
    title: <Translation>{(t) => t("WORKSHOP.TITLE")}</Translation>,
    width: 150,
    dataIndex: "title",
  },
  {
    title: <Translation>{(t) => t("WORKSHOP.SPEAKER")}</Translation>,
    dataIndex: "speaker",
    width: 150,
  },
  {
    title: <Translation>{(t) => t("WORKSHOP.DATE")}</Translation>,
    render: (record) => (record.date ? toDateString(record.date) : ""),
    width: 100,
  },
  {
    title: <Translation>{(t) => t("WORKSHOP.SCORES")}</Translation>,
    width: 100,
    dataIndex: "scores",
  },
  {
    title: <Translation>{(t) => t("WORKSHOP.STATUS")}</Translation>,
    width: 150,
    render: (record) => <TagStatus status={record.status} />,
  },
  {
    title: <Translation>{(t) => t("TABLE.ACTIONS")}</Translation>,
    dataIndex: "actions",
    key: "actions",
    fixed: "left",
    width: 100,
    render: (_text, record) => (
      <Space direction="horizontal">
        <ButtonAction
          variant="success"
          handleAction={() => handleAction("detail", record)}
          tooltip={i18n.t("ACTION.DETAILS")}
        >
          <SearchOutlined />
        </ButtonAction>
        <ButtonAction
          variant="primary"
          tooltip={i18n.t("ACTION.EDIT")}
          handleAction={() => handleAction("update", record)}
        >
          <EditOutlined />
        </ButtonAction>
        {record.status === StatusCourseEnum.NOT_STARTED && (
          <ButtonAction
            variant="danger"
            handleAction={() => handleAction("deleted", record)}
            tooltip={i18n.t("ACTION.DELETE")}
          >
            <DeleteOutlined />
          </ButtonAction>
        )}
      </Space>
    ),
  },
];
