import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { openModal } from "@app/components/molecules/ModalConfirm/OpenModal";
import { ModalTypeEnum } from "@app/constant";
import { ICON_URL } from "@app/constant/url-image";
import { useDeleteAccount, useGetAccount } from "@app/hooks/useAccount";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { AccountsInterface } from "@app/interfaces/Account";
import { Col, Input, Row, Space } from "antd";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AcademicColumnsTable } from "./AcademicListColumn";
import { useDeleteAcademic, useGetAcademic, useGetAcademics } from "@app/hooks";
import { AcademicInterface } from "@app/interfaces/Academic";
import { useTranslation } from "react-i18next";
import AcademicCreate from "../AcademicCreate/AcademicCreate";
import AcademicUpdate from "../AcademicUpdate/AcademicUpdate";

const AcademicList = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [id, setId] = useState<string>("");

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetAcademics();
  const { mutate: onDeleteAcademicYear } = useDeleteAcademic();
  const { data: dataDetail } = useGetAcademic(id);

  const [table, setTable] = useState({
    page: 1,
    take: 100,
  });

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleAction = (action: string, record: AcademicInterface) => {
    switch (action) {
      case "detail":
        navigate(`/accounts/${record.id}`);
        break;
      case "deleted":
        openModal(
          () => {
            onDeleteAcademicYear({ id: record.id });
          },
          ModalTypeEnum.CONFIRM,
          ICON_URL.ICON_TRASH,
          t("MODAL.CONFIRM_DELETE", { name: record.year }),
          t("MODAL.TITLE_DELETE", { name: record.year })
        );
        break;
      case "update":
        Promise.all([setIsModalDetailOpen(true), setId(record.id)]);
        break;
    }
  };

  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: BREADCRUMBS_ENUM.ACCOUNTS },
  ];

  const handleSearch = async () => {
    await Promise.all([refetch()]);
  };

  return (
    <ListPage
      page={breadcrumbItems}
      title={"Academic"}
      extra={
        <Space>
          <Button type="primary" onClick={() => showModal()}>
            <PlusOutlined />
            Add New Academic Year
          </Button>
        </Space>
      }
    >
      <Row gutter={[8, 4]} className="px-15px py-1rem">
        <Col xs={24} sm={24} md={4}>
          <TextField
            label="Year"
            normalize={(value) => value.trim()}
            name="name"
          >
            <Input
              placeholder="Enter Year"
              allowClear
              //   onChange={(e) => {
              //     if (e.type === "click") {
              //       handleClear("name");
              //     }
              //     setFilters((prevFilters) => ({
              //       ...prevFilters,
              //       name: e.target.value,
              //     }));
              //   }}
            />
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
      <Table<AcademicInterface>
        columns={AcademicColumnsTable(handleAction)}
        loading={isLoading}
        paginate={{
          table,
          setTable,
          total: 1,
          pageCount: 1,
          // nameItemCount: "TOTAL_WORKSHOP",
        }}
        // onChange={handleTableChange}
        dataSource={data?.data || []}
        overflow={true}
      />
      <AcademicCreate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {id && (
        <AcademicUpdate
          isModalOpen={isModalDetailOpen}
          setIsModalOpen={setIsModalDetailOpen}
          dataDetail={dataDetail}
        />
      )}
    </ListPage>
  );
};

export default AcademicList;
