import { SearchOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { IBreadcrumbItem } from "@app/interfaces";
import { Col, Input, Row } from "antd";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import { useGetArticlesPublication } from "@app/hooks/useArticle";
import { ArticleInterface } from "@app/interfaces/Article";
import { PublicationColumnTable } from "./PublicationListColumn";
import { downloadFilesAsZip, getFileNameFromUrl } from "@app/helpers/download";

const PublicationList = () => {
  const { t } = useTranslation();

  const [table, setTable] = useState({
    page: 1,
    take: 100,
  });

  const {
    data: publicationData,
    isLoading,
    refetch,
  } = useGetArticlesPublication();

  const handleAction = (action: string, record: ArticleInterface) => {
    switch (action) {
      case "download":
        downloadFilesAsZip(
          record.image_url,
          getFileNameFromUrl(record.file_word_url)
        );
        break;
    }
  };

  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: "Magazine", name: "Faculty" },
  ];

  const handleSearch = async () => {
    await Promise.all([refetch()]);
  };

  return (
    <ListPage page={breadcrumbItems} title={"Publication Post"}>
      <Row gutter={[8, 4]} className="px-15px py-1rem">
        <Col xs={24} sm={24} md={4}>
          <TextField
            label="Name"
            normalize={(value) => value.trim()}
            name="name"
          >
            <Input placeholder="Enter Name" allowClear />
          </TextField>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6}>
          <Row justify="space-between">
            <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={() => handleSearch()}
            >
              <SearchOutlined />
              {t("BUTTON.SEARCH")}
            </Button>
          </Row>
        </Col>
      </Row>
      <Table<ArticleInterface>
        columns={PublicationColumnTable(handleAction)}
        loading={isLoading}
        paginate={{
          table,
          setTable,
          total: 1,
          pageCount: 1,
        }}
        dataSource={publicationData?.data || []}
        overflow={true}
      />
    </ListPage>
  );
};

export default PublicationList;
