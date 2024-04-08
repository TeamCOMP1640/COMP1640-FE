import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { StatusCourseEnum } from "@app/constant/enum";
import { useGetCourses, useSyncCourseData } from "@app/hooks/useCourse";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { CourseListInterface } from "@app/interfaces/Course";
import { CourseListParam } from "@app/interfaces/course.interface";
import { Col, Input, Row, Select, TablePaginationConfig } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CourseColumnsTable } from "./CourseListColumn";

const CourseList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: BREADCRUMBS_ENUM.COURSES },
  ];
  const [filters, setFilters] = useState({
    name: "",
    status: "",
  });
  const [table, setTable] = useState({
    page: 1,
    take: 10,
  });

  const paginateOptions: CourseListParam = {
    name: filters.name,
    status: filters.status,
    page: table.page,
    take: table.take,
  };

  const { data, refetch, isLoading } = useGetCourses(paginateOptions);

  const { mutate: handleSync, isPending } = useSyncCourseData();

  const handleSearch = async () => {
    await Promise.all([
      setTable({
        page: 1,
        take: table.take,
      }),
      refetch(),
    ]);
  };

  const handleClear = async (field: "name" | "status") => {
    switch (field) {
      case "name":
        await Promise.all([
          setFilters((prevFilters) => ({
            ...prevFilters,
            name: "",
          })),
        ]);
        break;
      case "status":
        await Promise.all([
          setFilters((prevFilters) => ({
            ...prevFilters,
            type: "",
          })),
        ]);
        break;
    }
    refetch();
  };
  const handleAction = (key: string, item: CourseListInterface) => {
    switch (key) {
      // case "update":
      //   navigate(`/application/${item.id}`);
      //   break;
      case "detail":
        navigate(`/courses/${item.id}`);
        break;
      // case "delete":
      //   openModal(
      //     () => {
      //       onDeleteApplication(item.id);
      //     },
      //     ModalTypeEnum.CONFIRM,
      //     ICON_URL.ICON_TRASH,
      //     t("MODAL.CONFIRM_DELETE", { name: item.name }),
      //     t("MODAL.TITLE_DELETE", { name: item.name })
      //   );
      //   break;
      case "sync":
        handleSync(item.id);
        break;
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTable({
      page: pagination.current || 1,
      take: pagination.pageSize || 5,
    });
  };

  return (
    <ListPage page={breadcrumbItems} title={t("COURSE.COURSE_LIST")}>
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
              <Select.Option key={3} value={StatusCourseEnum.IN_PROGRESS}>
                {t("COURSE.IN_PROGRESS")}
              </Select.Option>
            </Select>
          </TextField>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6}>
          <Row justify="space-between">
            <Button type="primary" onClick={() => handleSearch()}>
              <SearchOutlined />
              {t("BUTTON.SEARCH")}
              {isPending ? <LoadingOutlined className="ml-1" /> : null}
            </Button>
          </Row>
        </Col>
      </Row>
      <Table<CourseListInterface>
        loading={isLoading}
        columns={CourseColumnsTable(handleAction, isPending)}
        onChange={handleTableChange}
        paginate={{
          table,
          setTable,
          total: data?.meta.itemCount || 0,
          pageCount: data?.meta.pageCount || 0,
          nameItemCount: "TOTAL_COURSES",
        }}
        dataSource={data?.data}
      />
    </ListPage>
  );
};

export default CourseList;
