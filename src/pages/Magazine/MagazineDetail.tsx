import { DeleteOutlined } from "@ant-design/icons";
import { Button as ButtonAntd, Col, Row, Space, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { remind } from "@app/assets/images";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TagStatus } from "@app/components/atoms/TagStatus/TagStatus";
import Card from "@app/components/molecules/Card/Card";
import { openModal } from "@app/components/molecules/ModalConfirm/OpenModal";
import { ModalTypeEnum, StatusCourseEnum } from "@app/constant/enum";
import { ICON_URL } from "@app/constant/url-image";
import { toDateString } from "@app/helpers/format";
import {
  useCompletedFeedback,
  useDeleteWorkshop,
  useGetWorkshop,
} from "@app/hooks/useWorkshop";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { useGetMagazine } from "@app/hooks/useMagazine";
import { MagazineDetailColumnTable } from "./MagazineDetailColumn";
import {
  useDeleteArticle,
  useGetArticles,
  useGetStudentArticles,
} from "@app/hooks/useArticle";
import { ArticleInterface } from "@app/interfaces/Article";
import ArticleCreate from "./Article/ArticleCreate";
import { useCallback, useState } from "react";
import { useGetAccount } from "@app/hooks";
import { getLocalStorage } from "@app/config/storage";
import { ID, ROLE } from "@app/constant/auth";
// import { WorkshopDetailColumnsTable } from "./WorkshopDetailColumn";

const MagazineDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = useGetMagazine(id ?? "");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  console.log(data);

  const {
    data: articleDatas,
    isLoading,
    refetch,
  } = useGetStudentArticles(getLocalStorage(ID) || "", id || "");

  const role = getLocalStorage(ROLE);
  const today = new Date().toISOString().slice(0, 10);

  const { mutate: onDeleteArticle } = useDeleteArticle();
  const navigate = useNavigate();
  const { data: userDetail } = useGetAccount(getLocalStorage(ID) || "");

  const facultyName = userDetail?.faculties[0];
  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: BREADCRUMBS_ENUM.MAGAZINE, name: "Magazines" },
    { key: BREADCRUMBS_ENUM.MAGAZINE, name: "Detail" },
  ];

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleAction = (action: string, record: ArticleInterface) => {
    switch (action) {
      case "detail":
        navigate(`/magazines-student/${record.id}`);
        break;
      case "deleted":
        openModal(
          () => {
            onDeleteArticle({ id: record.id });
          },
          ModalTypeEnum.CONFIRM,
          ICON_URL.ICON_TRASH,
          t("MODAL.CONFIRM_DELETE", { name: record.title }),
          t("MODAL.TITLE_DELETE", { name: record.title })
        );
        break;
      case "update":
        // Promise.all([setIsModalDetailOpen(true), setId(record.id)]);
        break;
    }
  };

  const onDeleted = () => {
    openModal(
      () => {
        // onDeleteArticles({ id: id || "" });
        // navigate("/workshops");
      },
      ModalTypeEnum.CONFIRM,
      ICON_URL.ICON_TRASH,
      t("MODAL.CONFIRM_DELETE", { name: data?.title }),
      t("MODAL.TITLE_DELETE", { name: data?.title })
    );
  };

  const checkDate = (dateInput: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(dateInput);
    inputDate.setHours(0, 0, 0, 0);

    if (today.getTime() > inputDate.getTime()) {
      return false;
    } else if (today.getTime() <= inputDate.getTime()) {
      return true;
    }
  };

  return (
    <ListPage
      page={breadcrumbItems}
      title={"Magazine Detail"}
      extra={
        <Space>
          {data?.status === StatusCourseEnum.NOT_STARTED && (
            <ButtonAntd
              type="primary"
              icon={<DeleteOutlined />}
              size="large"
              danger
              onClick={onDeleted}
            >
              {t("BUTTON.DELETE")}
            </ButtonAntd>
          )}
        </Space>
      }
    >
      <Card className="m-24px border-none h-full">
        <Row className="p-24px">
          <Col
            xs={24}
            sm={24}
            md={8}
            lg={8}
            xl={8}
            className="flex justify-start"
          >
            <Col xs={12} sm={12} md={12} lg={9} xl={6}>
              <Typography.Text>Name</Typography.Text>
            </Col>
            <Col xs={12} sm={12} md={12} lg={15} xl={18}>
              <Typography.Text className="font-bold">
                {data?.name}
              </Typography.Text>
            </Col>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={9} xl={6}>
                <Typography.Text>Closure Date</Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={16} lg={15} xl={18}>
                <Typography.Text className="font-bold">
                  {data?.closure_date
                    ? toDateString(data?.closure_date)
                    : t("COURSE.NO_INFO")}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={9} lg={9} xl={6}>
                <Typography.Text>Faculty</Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={15} lg={15} xl={18}>
                <Typography.Text className="font-bold">
                  {data?.faculty?.name
                    ? data?.faculty?.name
                    : t("COURSE.NO_INFO")}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="p-24px pt-0px">
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={9} xl={6}>
                <Typography.Text>Year</Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={15} lg={15} xl={18}>
                <Typography.Text className="font-bold">
                  {data?.academic?.year
                    ? data?.academic?.year
                    : t("COURSE.NO_INFO")}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={9} xl={6}>
                <Typography.Text>Final Closure Date</Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={15} lg={15} xl={18}>
                <Typography.Text className="font-bold">
                  {data?.academic?.final_closure_date
                    ? toDateString(data?.academic?.final_closure_date)
                    : t("COURSE.NO_INFO")}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={9} lg={9} xl={6}>
                <Typography.Text>{t("WORKSHOP.COURSES")}</Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={15} lg={15} xl={18}>
                {data?.courses.length ? (
                  data?.courses.map((course) => (
                    <Tag
                      key={course.id}
                      className="rounded-3xl px-15px py-4px"
                      color="#5C5C5C"
                      style={{ color: "while", marginBottom: "1px" }}
                    >
                      {course.name}
                    </Tag>
                  ))
                ) : (
                  <Typography.Text className="font-bold">
                    {t("COURSE.NO_INFO")}
                  </Typography.Text>
                )}
              </Col>
            </Row>
          </Col> */}
        </Row>
        <Row className="p-24px pt-0px">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row>
              <Col xs={4} sm={12} md={4} lg={3} xl={2}>
                <Typography.Text>{t("WORKSHOP.DESCRIPTION")}</Typography.Text>
              </Col>
              <Col xs={20} sm={12} md={20} lg={21} xl={22}>
                <Typography.Text className="font-bold">
                  {data?.description ? data?.description : t("COURSE.NO_INFO")}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <ArticleCreate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        facultyName={facultyName}
      />

      {checkDate(data?.closure_date) ? (
        <Row justify="end" className="w-full pb-1rem pr-24px">
          <Col>
            <Button type="primary" onClick={() => showModal()}>
              Submit Article
            </Button>
          </Col>
        </Row>
      ) : null}
      <Table
        columns={MagazineDetailColumnTable(handleAction, role || "")}
        dataSource={articleDatas?.data || []}
      />
    </ListPage>
  );
};

export default MagazineDetail;
