import { Translation } from "react-i18next";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  FileOutlined,
  FileWordOutlined,
  CommentOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { FeedbackInterface } from "@app/interfaces/workshop.interface";
import { Button, Space, TableColumnsType, Tooltip } from "antd";
import { ArticleInterface } from "@app/interfaces/Article";
import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import i18n from "@app/config/i18n";

export const MagazineDetailColumnTable = (
  handleAction: (key: string, item: ArticleInterface) => void,
  role: string
): TableColumnsType<ArticleInterface> => [
  {
    title: "Title",
    width: 120,
    dataIndex: "title",
  },
  {
    title: "Description",
    width: 150,
    dataIndex: "description",
  },
  {
    title: "Status",
    width: 150,
    dataIndex: "status",
  },
  {
    title: "Submitted Date",
    width: 150,
    dataIndex: "submitted_date",
  },
  {
    title: "Image File",
    width: 150,
    dataIndex: "file",
    render: (_text, record) => (
      <>
        <Button icon={<FileOutlined />} type="link">
          Image
        </Button>
      </>
    ),
  },
  {
    title: "Word File",
    width: 150,
    dataIndex: "file",
    render: (_text, record) => (
      <>
        <Button icon={<FileWordOutlined />} type="link">
          Word File
        </Button>
      </>
    ),
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
          <>
            <ButtonAction
              variant="success"
              handleAction={() => handleAction("detail", record)}
              tooltip={i18n.t("ACTION.DETAILS")}
            >
              <SearchOutlined />
            </ButtonAction>
            <>
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
            </>{" "}
          </>
        ) : (
          <>
            <ButtonAction
              variant="primary"
              tooltip="Comment"
              handleAction={() => handleAction("comment", record)}
            >
              <CommentOutlined />
            </ButtonAction>
            <ButtonAction
              variant="success"
              handleAction={() => handleAction("publication", record)}
              tooltip="Publication"
            >
              <CheckCircleOutlined />
            </ButtonAction>
          </>
        )}
      </Space>
    ),
  },
];
