import { Col, Row, Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { TagStatus } from "@app/components/atoms/TagStatus/TagStatus";
import Card from "@app/components/molecules/Card/Card";
import { RoleAccountEnum } from "@app/constant";
import { timeToStatus, toDateString } from "@app/helpers/format";
import { useGetCourse } from "@app/hooks/useCourse";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { TabsProps } from "antd/lib";
import { ReactElement, useState } from "react";
import Members from "./Tabs/Mentee/Mentee";
import Team from "./Tabs/Team/TeamList/TeamList";
import Timeline from "./Tabs/Timeline/Timeline";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";

const CourseDetail = (): ReactElement => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState<string>("MENTEE");

  const { data } = useGetCourse(id ?? "");

  const handleChangeTab = (key: string) => {
    setCurrentTab(key);
  };

  const items: TabsProps["items"] = [
    {
      key: RoleAccountEnum.TIMELINE,
      label: t("COURSES.TIMELINE"),
      children: <Timeline />,
    },
    {
      key: RoleAccountEnum.TEAMS,
      label: t("COURSES.TEAMS"),
      children: <Team />,
    },
    {
      key: RoleAccountEnum.MENTEE,
      label: t("COURSES.MENTEE"),
      children: <Members role={currentTab} courseId={id ?? ""} />,
    },
    {
      key: RoleAccountEnum.MENTOR,
      label: t("COURSES.MENTOR"),
      children: <Members role={currentTab} courseId={id ?? ""} />,
    },
  ];

  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: BREADCRUMBS_ENUM.COURSES },
    { key: BREADCRUMBS_ENUM.COURSE_DETAIL, name: data?.course?.name },
  ];

  return (
    <ListPage
      page={breadcrumbItems}
      title={t("BREADCRUMBS.DETAIL_COURSE")}
      subTitle={data?.course?.name}
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
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <Typography.Text className="pr-4rem">
                {t("COURSES.NAME")}
              </Typography.Text>
            </Col>
            <Col xs={12} sm={12} md={16} lg={16} xl={16}>
              <Typography.Text className="font-bold">
                {data?.course?.name}
              </Typography.Text>
            </Col>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Typography.Text className="pr-4rem">
                  {t("COURSES.START_DATE")}
                </Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={16} lg={16} xl={16}>
                <Typography.Text className="font-bold">
                  {toDateString(data?.course?.start_date ?? new Date())}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Typography.Text className="pr-4rem">
                  {t("COURSES.END_DATE")}
                </Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={16} lg={16} xl={16}>
                <Typography.Text className="font-bold">
                  {data?.course?.end_date
                    ? toDateString(data.course?.end_date ?? new Date())
                    : t("COURSE.NO_INFO")}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="p-24px pt-0px">
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Typography.Text className="pr-4rem">
                  {t("COURSES.STATUS")}
                </Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={16} lg={16} xl={16}>
                <Typography.Text className="font-bold">
                  <TagStatus
                    status={timeToStatus(
                      data?.course?.start_date ?? new Date(),
                      data?.course?.end_date ?? new Date()
                    )}
                  />
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Typography.Text className="pr-4rem">
                  {t("COURSES.MENTEE")}
                </Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={16} lg={16} xl={16}>
                <Typography.Text className="font-bold">
                  {data?.menteeCount}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Typography.Text>{t("COURSES.MENTOR")}</Typography.Text>
              </Col>
              <Col xs={12} sm={12} md={16} lg={16} xl={16}>
                <Typography.Text className="font-bold">
                  {data?.mentorCount}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Tabs
        items={items}
        className="m-24px"
        destroyInactiveTabPane
        onChange={handleChangeTab}
      />
    </ListPage>
  );
};

export default CourseDetail;
