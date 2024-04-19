import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import i18n from "@app/config/i18n";
import { AcademicInterface } from "@app/interfaces/Academic";
import { Space, Typography } from "antd";
import { FacultyInterface } from "@app/interfaces/Faculty";
import { MagazineInterface } from "@app/interfaces/Magazine";

export const MagazineColumnsTable = (
  handleAction: (key: string, item: MagazineInterface) => void,
  role: string
): ColumnsType<MagazineInterface> => [
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
    render: (_text, record) => <Typography>{record.name}</Typography>,
  },
  {
    title: "Description",
    dataIndex: "description",
    width: 150,
  },
  {
    title: "Closure Date",
    dataIndex: "closure_date",
    width: 100,
  },
  {
    title: "Faculty",
    dataIndex: "faculty",
    width: 150,
    render: (_text, record) => <Typography>{record?.faculty?.name}</Typography>,
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
        {role === "student" ? (
          <ButtonAction
            variant="success"
            handleAction={() => handleAction("detail", record)}
            tooltip={i18n.t("ACTION.DETAILS")}
          >
            <SearchOutlined />
          </ButtonAction>
        ) : (
          <>
            <ButtonAction
              variant="success"
              handleAction={() => handleAction("detail_coordinator", record)}
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
            <ButtonAction
              variant="danger"
              handleAction={() => handleAction("deleted", record)}
              tooltip={i18n.t("ACTION.DELETE")}
            >
              <DeleteOutlined />
            </ButtonAction>
          </>
        )}
      </Space>
    ),
  },
];
