import {
  FileOutlined,
  FileWordOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Translation } from "react-i18next";

import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import i18n from "@app/config/i18n";
import { ArticleInterface } from "@app/interfaces/Article";
import { Button, Space, TableColumnsType } from "antd";
import saveAs from "file-saver";
import { getFileNameFromUrl } from "@app/helpers/download";

const fetchAndDownload = async (filename: string) => {
  const response = await fetch(
    `http://localhost:8080/Articles/uploads/${filename}`
  );
  const blob = await response.blob();
  saveAs(blob, filename);
};

export const PublicationColumnTable = (
  handleAction: (key: string, item: ArticleInterface) => void
): TableColumnsType<ArticleInterface> => [
  {
    title: "Title",
    width: 200,
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
        <Button
          icon={<FileOutlined />}
          type="link"
          onClick={() => window.open(record.image_url)}
        >
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
        <Button
          icon={<FileWordOutlined />}
          type="link"
          onClick={() =>
            fetchAndDownload(getFileNameFromUrl(record.file_word_url))
          }
        >
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
        <ButtonAction
          variant="success"
          handleAction={() => handleAction("download", record)}
          tooltip={i18n.t("ACTION.DETAILS")}
        >
          <DownloadOutlined />
        </ButtonAction>
      </Space>
    ),
  },
];
