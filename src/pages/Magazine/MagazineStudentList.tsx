import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { openModal } from "@app/components/molecules/ModalConfirm/OpenModal";
import { ModalTypeEnum, STORAGE_KEY } from "@app/constant";
import { ICON_URL } from "@app/constant/url-image";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { Col, Input, Row, Space } from "antd";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDeleteFaculty,
  useGetFaculties,
  useGetFaculty,
} from "@app/hooks/useFaculty";
import { MagazineInterface } from "@app/interfaces/Magazine";
import { useTranslation } from "react-i18next";
import FacultyCreate from "./MagazineCreate";
import { MagazineColumnsTable } from "./MagazineListColumn";
import FacultyUpdate from "./MagazineUpdate";
import {
  useDeleteMagazine,
  useGetMagazine,
  useGetMagazines,
  useGetStudentMagazines,
} from "@app/hooks/useMagazine";
import MagazineCreate from "./MagazineCreate";
import MagazineUpdate from "./MagazineUpdate";
import { useGetAccount } from "@app/hooks";
import { ID, ROLE } from "@app/constant/auth";
import { getLocalStorage } from "@app/config/storage";

const MagazineStudentList = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const role = getLocalStorage(ROLE);

  console.log(role);

  const [table, setTable] = useState({
    page: 1,
    take: 100,
  });

  const navigate = useNavigate();
  const { data: userDetail } = useGetAccount(getLocalStorage(ID) || "");

  const facultyName = userDetail?.faculties[0];

  const { data, isLoading, refetch } = useGetStudentMagazines(
    getLocalStorage(ID) || ""
  );
  console.log(data);
  const { mutate: onDeleteAcademicYear } = useDeleteMagazine();
  const { data: dataDetail } = useGetMagazine(id);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleAction = (action: string, record: MagazineInterface) => {
    switch (action) {
      case "detail":
        navigate(`/student-magazine/${record.id}`);
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
    }
  };

  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: BREADCRUMBS_ENUM.MAGAZINE, name: "Faculty" },
  ];

  const handleSearch = async () => {
    await Promise.all([refetch()]);
  };

  return (
    <ListPage page={breadcrumbItems} title={"My Magazine"}>
      <Row gutter={[8, 4]} className="px-15px py-1rem">
        <Col xs={24} sm={24} md={4}>
          <TextField
            label="Year"
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
      <Table<MagazineInterface>
        columns={MagazineColumnsTable(handleAction, role || "")}
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
      <MagazineCreate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        facultyName={facultyName}
      />
      {id && (
        <MagazineUpdate
          isModalOpen={isModalDetailOpen}
          setIsModalOpen={setIsModalDetailOpen}
          dataDetail={dataDetail}
          facultyName={facultyName}
        />
      )}
    </ListPage>
  );
};

export default MagazineStudentList;
