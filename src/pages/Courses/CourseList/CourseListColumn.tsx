import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import { TagStatus } from "@app/components/atoms/TagStatus/TagStatus";
import i18n from "@app/config/i18n";
import { toDateString } from "@app/helpers/format";
import { CourseListInterface } from "@app/interfaces/Course";
import { Space } from "antd";

export const CourseColumnsTable = (
  handleAction: (key: string, item: CourseListInterface) => void,
  loading: boolean
): ColumnsType<CourseListInterface> => [
  {
    title: <Translation>{(t) => t("COURSE.NAME")}</Translation>,
    width: 200,
    render: (record) => record.course.name || "",
  },
  {
    title: <Translation>{(t) => t("COURSE.MENTEE")}</Translation>,
    dataIndex: "menteeCount",
    width: 100,
  },
  {
    title: <Translation>{(t) => t("COURSE.MENTOR")}</Translation>,
    dataIndex: "mentorCount",
    width: 100,
  },
  {
    title: <Translation>{(t) => t("COURSE.START_DATE")}</Translation>,
    width: 100,
    render: (record) =>
      record.course.start_date ? toDateString(record.course.start_date) : "",
  },
  {
    title: <Translation>{(t) => t("COURSE.END_DATE")}</Translation>,
    width: 100,
    render: (record) =>
      record.course.end_date ? toDateString(record.course.end_date) : "",
  },
  {
    title: <Translation>{(t) => t("COURSE.STATUS")}</Translation>,
    width: 150,
    render: (record) => <TagStatus status={record.course.status} />,
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
          variant="danger"
          handleAction={() => handleAction("sync", record)}
          tooltip={i18n.t("ACTION.SYNC")}
          loading = {loading}
        >
          <SyncOutlined />
        </ButtonAction>
      </Space>
    ),
  },
];
