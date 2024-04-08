import { SearchOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { useGetAccounts } from "@app/hooks/useAccount";
import { useGetCourseNoPaginate } from "@app/hooks/useCourse";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { AccountsInterface } from "@app/interfaces/Account";
import { CourseInterface } from "@app/interfaces/Course";
import { GetListParams } from "@app/interfaces/common";
import { Col, Empty, Input, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccountColumnsTable } from "./AccountListColumn";
import { useNavigate } from "react-router-dom";

const AccountList = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [table, setTable] = useState({
    page: 1,
    take: 10,
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
  const { data: courses, isLoading: isLoadingCourses } =
    useGetCourseNoPaginate();

  const handleTableChange = (pagination: any) => {
    setTable({
      page: pagination.current || 1,
      take: pagination.pageSize || 10,
    });
  };

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
    <ListPage page={breadcrumbItems} title={t("BREADCRUMBS.ACCOUNTS")}>
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
      <Table<AccountsInterface>
        columns={AccountColumnsTable(handleAction)}
        loading={isLoading}
        onChange={handleTableChange}
        paginate={{
          table,
          setTable,
          total: data?.meta?.itemCount,
          pageCount: data?.meta?.pageCount,
          nameItemCount: "TOTAL_USERS",
        }}
        dataSource={data?.data || []}
        overflow={true}
      />
    </ListPage>
  );
};

export default AccountList;
