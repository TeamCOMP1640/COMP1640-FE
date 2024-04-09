import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import {
  useDeleteAccount,
  useGetAccount,
  useGetAccounts,
} from "@app/hooks/useAccount";
import { useGetCourseNoPaginate } from "@app/hooks/useCourse";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { AccountsInterface } from "@app/interfaces/Account";
import { CourseInterface } from "@app/interfaces/Course";
import { GetListParams } from "@app/interfaces/common";
import { Col, Empty, Input, Row, Select, Space, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccountColumnsTable } from "./AccountListColumn";
import { useNavigate } from "react-router-dom";
import WorkshopCreate from "@app/pages/Workshop/WorkshopCreate/WorkshopCreate";
import AccountCreate from "../AccountCreate/AccountCreate";
import { openModal } from "@app/components/molecules/ModalConfirm/OpenModal";
import { ModalTypeEnum } from "@app/constant";
import { ICON_URL } from "@app/constant/url-image";
import AccountUpdate from "../AccountUpdate/AccountUpdate";

const AccountList = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [id, setId] = useState<string>("");

  const navigate = useNavigate();

  const [table, setTable] = useState({
    page: 1,
    take: 100,
  });
  const [filters, setFilters] = useState({
    name: "",
    courseId: "",
  });

  const paginateOptions: GetListParams = {
    name: filters.name,
    courseId: filters.courseId,
    pageNumber: table.page,
    pageSize: table.take,
  };

  const { data, isLoading, refetch } = useGetAccounts(paginateOptions);
  const { mutate: onDeleteAccount } = useDeleteAccount();
  const { data: dataDetail } = useGetAccount(id);

  const handleTableChange = (pagination: any) => {
    setTable({
      page: pagination.current || 1,
      take: pagination.pageSize || 100,
    });
  };

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClear = async (field: "name" | "courseId") => {
    if (field === "name") {
      await Promise.all([
        setTable({
          page: 1,
          take: table.take,
        }),
        setFilters((prevFilters) => ({
          ...prevFilters,
          name: "",
        })),
      ]);
    } else if (field === "courseId") {
      await Promise.all([
        setTable({
          page: 1,
          take: table.take,
        }),
        setFilters((prevFilters) => ({
          ...prevFilters,
          courseId: "",
        })),
      ]);
    }
    refetch();
  };

  const handleAction = (action: string, record: AccountsInterface) => {
    switch (action) {
      case "detail":
        navigate(`/accounts/${record.id}`);
        break;
      case "deleted":
        openModal(
          () => {
            onDeleteAccount({ id: record.id });
          },
          ModalTypeEnum.CONFIRM,
          ICON_URL.ICON_TRASH,
          t("MODAL.CONFIRM_DELETE", { name: record.username }),
          t("MODAL.TITLE_DELETE", { name: record.username })
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
    await Promise.all([
      setTable({
        page: 1,
        take: table.take,
      }),
      refetch(),
    ]);
  };

  return (
    <ListPage
      page={breadcrumbItems}
      title={t("BREADCRUMBS.ACCOUNTS")}
      extra={
        <Space>
          <Button type="primary" onClick={() => showModal()}>
            <PlusOutlined />
            Add new account
          </Button>
        </Space>
      }
    >
      <Row gutter={[8, 4]} className="px-15px py-1rem">
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
        {/* <Col xs={24} sm={24} md={4}>
          <TextField
            label={t("INPUT.COURSES")}
            normalize={(value) => value.trim()}
            name="name"
          >
            <Select
              allowClear
              placeholder={t("PLACEHOLDER.COURSES")}
              onChange={(value) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  courseId: value,
                }));
              }}
              notFoundContent={
                isLoadingCourses ? (
                  <Spin size="small" />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={t("TABLE.EMPTY")}
                  />
                )
              }
              onClear={() => handleClear("courseId")}
            >
              {courses?.map((item: CourseInterface) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </TextField>
        </Col> */}

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
      <Table<AccountsInterface>
        columns={AccountColumnsTable(handleAction)}
        loading={isLoading}
        onChange={handleTableChange}
        // paginate={{
        //   table,
        //   setTable,
        //   total: data?.meta?.itemCount,
        //   pageCount: data?.meta?.pageCount,
        //   nameItemCount: "TOTAL_USERS",
        // }}
        dataSource={data?.data || []}
        overflow={true}
      />
      <AccountCreate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {id && (
        <AccountUpdate
          isModalOpen={isModalDetailOpen}
          setIsModalOpen={setIsModalDetailOpen}
          dataDetail={dataDetail}
        />
      )}
    </ListPage>
  );
};

export default AccountList;
