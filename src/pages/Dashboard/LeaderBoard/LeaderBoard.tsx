import Card from "@app/components/molecules/Card/Card";
import { RoleAccountEnum } from "@app/constant";
import { getRandomCourse } from "@app/helpers/utils";
import { CourseInterface } from "@app/interfaces/Course";
import {
  Col,
  Empty,
  Row,
  Select,
  Spin,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import Calendar from "./Calendar";
import ModalLeaderBoard from "./ModalLeaderBoard";
import TabLeaderBoard from "./TabLeaderBoard";

const LeaderBoard = ({
  courses,
  isLoadingCourses,
}: {
  courses: CourseInterface[];
  isLoadingCourses: boolean;
}) => {
  const { t } = useTranslation();

  const courseId = getRandomCourse(courses)?.id || "";

  const [filters, setFilters] = useState({
    role: RoleAccountEnum.MENTEE,
    courseId: courseId,
  });

  const [open, setIsOpen] = useState<boolean>(false);

  const handleChangeTab = (key: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      role: key as RoleAccountEnum,
    }));
  };

  const initalTabs: TabsProps["items"] = [
    {
      key: RoleAccountEnum.MENTEE,
      label: <Translation>{(t) => t("COURSES.MENTEE")}</Translation>,
      children: <TabLeaderBoard filters={filters} />,
    },
    {
      key: RoleAccountEnum.MENTOR,
      label: <Translation>{(t) => t("COURSES.MENTOR")}</Translation>,
      children: <TabLeaderBoard filters={filters} />,
    },
  ];
  return (
    <Row gutter={[18, 18]} className="mt-18px">
      <Col sm={24} md={16} lg={16} xl={16}>
        <Card>
          <Row>
            <Col sm={12} md={12} lg={12} xl={12}>
              <Typography.Title
                level={5}
                className="font-semibold text-text-color-2"
              >
                {t("DASHBOARD.LEADERBOARD")}
              </Typography.Title>
            </Col>
            <Col sm={12} md={12} lg={12} xl={12} className="flex justify-end">
              {courses && (
                <Select
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
                  defaultValue={courseId}
                >
                  {courses?.map((item: CourseInterface, index: number) => (
                    <Select.Option key={index} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Col>
          </Row>
          <Tabs onChange={handleChangeTab} type="card" items={initalTabs} />
          <Typography
            onClick={() => setIsOpen(!open)}
            className="flex justify-end text-text-color cursor-pointer"
          >
            {t("DASHBOARD.VIEW_ALL")}
          </Typography>
        </Card>
      </Col>
      <Col sm={24} md={8} lg={8} xl={8}>
        <Card>
          <Typography.Title
            level={5}
            className="font-semibold text-text-color-2"
          >
            {t("DASHBOARD.EVENT_CALENDAR")}
          </Typography.Title>
          <Calendar />
        </Card>
      </Col>
      {open && (
        <ModalLeaderBoard
          isOpen={open}
          setIsOpen={setIsOpen}
          filters={filters}
          title={filters.role}
        />
      )}
    </Row>
  );
};

export default LeaderBoard;
