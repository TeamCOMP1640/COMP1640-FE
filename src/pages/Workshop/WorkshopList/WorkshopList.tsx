import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Space, TablePaginationConfig } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { openModal } from "@app/components/molecules/ModalConfirm/OpenModal";
import { ModalTypeEnum, StatusCourseEnum } from "@app/constant/enum";
import { ICON_URL } from "@app/constant/url-image";
import {
  useDeleteWorkshop,
  useGetWorkshop,
  useGetWorkshops,
} from "@app/hooks/useWorkshop";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import {
  WorkshopInterface,
  WorkshopListParam,
} from "@app/interfaces/workshop.interface";
import WorkshopCreate from "../WorkshopCreate/WorkshopCreate";
import WorkshopUpdate from "../WorkshopUpdate/WorkshopUpdate";
import { WorkshopColumnsTable } from "./WorkshopListColumn";

const WorkshopList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: BREADCRUMBS_ENUM.WORKSHOPS },
  ];
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [id, setId] = useState<string>("");

  const [filters, setFilters] = useState({
    name: "",
    status: "",
    speaker: "",
  });
  const [table, setTable] = useState({
    page: 1,
    take: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const paginateOptions: WorkshopListParam = {
    name: filters.name,
    status: filters.status,
    speaker: filters.speaker,
    page: table.page,
    take: table.take,
  };

  const { data, refetch, isLoading } = useGetWorkshops(paginateOptions);
  const { mutate: onDeleteWorkshop } = useDeleteWorkshop();

  const handleSearch = () => {
    setTable({
      page: 1,
      take: table.take,
    });
    refetch();
  };

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClear = async (field: "name" | "status" | "speaker") => {
    switch (field) {
      case "name":
        await Promise.all([
          setFilters((prevFilters) => ({
            ...prevFilters,
            name: "",
          })),
        ]);
        break;
      case "speaker":
        await Promise.all([
          setFilters((prevFilters) => ({
            ...prevFilters,
            speaker: "",
          })),
        ]);
        break;
      case "status":
        await Promise.all([
          setFilters((prevFilters) => ({
            ...prevFilters,
            status: "",
          })),
        ]);
        break;
      default:
        await Promise.all([
          setFilters((prevFilters) => ({
            ...prevFilters,
          })),
        ]);
        break;
    }
    setTable({
      page: 1,
      take: table.take,
    });

    await refetch();
  };

  const handleAction = (key: string, item: WorkshopInterface) => {
    switch (key) {
      case "detail":
        navigate(`/workshops/${item.id}`);
        break;
      case "deleted":
        openModal(
          () => {
            onDeleteWorkshop({ id: item.id });
          },
          ModalTypeEnum.CONFIRM,
          ICON_URL.ICON_TRASH,
          t("MODAL.CONFIRM_DELETE", { name: item.title }),
          t("MODAL.TITLE_DELETE", { name: item.title })
        );
        break;
      case "update":
        Promise.all([setIsModalDetailOpen(true), setId(item.id)]);
        break;
      default:
        break;
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTable({
      page: pagination.current ?? 1,
      take: pagination.pageSize ?? 10,
    });
    refetch();
  };

  const { data: dataDetail } = useGetWorkshop(id);

  return (
    <ListPage
      page={breadcrumbItems}
      title={t("WORKSHOP.WORKSHOP_LIST")}
      extra={
        <Space>
          <Button type="primary" onClick={() => showModal()}>
            <PlusOutlined />
            {t("BUTTON.CREATE")}
          </Button>
        </Space>
      }
    >
      <Row gutter={[8, 8]} className="px-15px py-1rem">
        <Col xs={24} sm={24} md={4}>
          <TextField
            label={t("INPUT.NAME")}
            normalize={(value) => value.trim()}
            name="name"
          >
            <Input
              placeholder={t("PLACEHOLDER.NAME")}
              allowClear
              onChange={(e) => {
                if (e.type === "click") {
                  handleClear("name");
                }
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  name: e.target.value,
                }));
              }}
            />
          </TextField>
        </Col>

        <Col xs={24} sm={24} md={4}>
          <TextField
            label={t("INPUT.SPEAKER")}
            normalize={(value) => value.trim()}
            name="name"
          >
            <Input
              placeholder={t("PLACEHOLDER.SPEAKER")}
              allowClear
              onChange={(e) => {
                if (e.type === "click") {
                  handleClear("speaker");
                }
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  speaker: e.target.value,
                }));
              }}
            />
          </TextField>
        </Col>

        <Col xs={24} sm={24} md={4}>
          <TextField label={t("INPUT.STATUS")} name="status">
            <Select
              allowClear
              placeholder={t("PLACEHOLDER.STATUS")}
              onChange={(value) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  status: value,
                }));
              }}
              onClear={() => handleClear("status")}
            >
              <Select.Option key={1} value={StatusCourseEnum.NOT_STARTED}>
                {t("COURSE.NOT_STARTED")}
              </Select.Option>
              <Select.Option key={2} value={StatusCourseEnum.COMPLETED}>
                {t("COURSE.COMPLETED")}
              </Select.Option>
            </Select>
          </TextField>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6}>
          <Row justify="space-between">
            <Button type="primary" onClick={() => handleSearch()}>
              <SearchOutlined />
              {t("BUTTON.SEARCH")}
            </Button>
          </Row>
        </Col>
      </Row>
      <Table<WorkshopInterface>
        loading={isLoading}
        columns={WorkshopColumnsTable(handleAction)}
        onChange={handleTableChange}
        paginate={{
          table,
          setTable,
          total: data?.meta.itemCount ?? 0,
          pageCount: data?.meta.pageCount ?? 0,
          nameItemCount: "TOTAL_WORKSHOP",
        }}
        dataSource={data?.data}
      />
      <WorkshopCreate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {id && (
        <WorkshopUpdate
          isModalOpen={isModalDetailOpen}
          setIsModalOpen={setIsModalDetailOpen}
          dataDetail={dataDetail}
        />
      )}
    </ListPage>
  );
};

export default WorkshopList;
