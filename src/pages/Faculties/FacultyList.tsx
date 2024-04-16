import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { openModal } from "@app/components/molecules/ModalConfirm/OpenModal";
import { ModalTypeEnum } from "@app/constant";
import { ICON_URL } from "@app/constant/url-image";
import { IBreadcrumbItem } from "@app/interfaces";
import { Col, Input, Row, Space } from "antd";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDeleteFaculty,
  useGetFaculties,
  useGetFaculty,
} from "@app/hooks/useFaculty";
import { FacultyInterface } from "@app/interfaces/Faculty";
import { useTranslation } from "react-i18next";
import FacultyCreate from "./FacultyCreate";
import { FacultyColumnsTable } from "./FacultyListColumn";
import FacultyUpdate from "./FacultyUpdate";
import { getLocalStorage } from "@app/config/storage";
import { ROLE } from "@app/constant/auth";
import FacultyAssign from "./FacultyAssign";

const FacultyList = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenAssign, setIsModalOpenAssign] = useState<boolean>(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [id, setId] = useState<string>("");

  const role = getLocalStorage(ROLE);

  const [table, setTable] = useState({
    page: 1,
    take: 100,
  });

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetFaculties();
  const { mutate: onDeleteAcademicYear } = useDeleteFaculty();
  const { data: dataDetail } = useGetFaculty(id);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleAction = (action: string, record: FacultyInterface) => {
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
          t("MODAL.CONFIRM_DELETE", { name: record.name }),
          t("MODAL.TITLE_DELETE", { name: record.name })
        );
        break;
      case "update":
        Promise.all([setIsModalDetailOpen(true), setId(record.id)]);
        break;
      case "assign":
        Promise.all([setIsModalOpenAssign(true), setId(record.id)]);
        break;
    }
  };

  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: "Faculty", name: "Faculty" },
  ];

  const handleSearch = async () => {
    await Promise.all([refetch()]);
  };

  return (
    <ListPage
      page={breadcrumbItems}
      title={"Faculty"}
      extra={
        <Space>
          <Button type="primary" onClick={() => showModal()}>
            <PlusOutlined />
            Add New Faculty
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
            <Input placeholder="Enter Year" allowClear />
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
      <Table<FacultyInterface>
        columns={FacultyColumnsTable(handleAction, role || "")}
        loading={isLoading}
        // onChange={handleTableChange}
        paginate={{
          table,
          setTable,
          total: 1,
          pageCount: 1,
          // nameItemCount: "TOTAL_WORKSHOP",
        }}
        dataSource={data?.data || []}
        overflow={true}
      />
      <FacultyCreate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {id && (
        <FacultyAssign
          isModalOpen={isModalOpenAssign}
          setIsModalOpen={setIsModalOpenAssign}
          dataDetail={dataDetail}
        />
      )}
      {id && (
        <FacultyUpdate
          isModalOpen={isModalDetailOpen}
          setIsModalOpen={setIsModalDetailOpen}
          dataDetail={dataDetail}
        />
      )}
    </ListPage>
  );
};

export default FacultyList;
