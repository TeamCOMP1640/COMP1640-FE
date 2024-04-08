import { course, homeIcon, mentee, mentor } from "@app/assets/images";
import Card from "@app/components/molecules/Card/Card";
import { getLocalStorage } from "@app/config/storage";
import { USER_PROFILE } from "@app/constant/auth";
import { useGetCourseNoPaginate } from "@app/hooks";
import { useStatistic } from "@app/hooks/useDashboard";
import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import LeaderBoard from "./LeaderBoard/LeaderBoard";

const Dashboard = () => {
  const { t } = useTranslation();
  const { data } = useStatistic();

  const { data: courses, isLoading: isLoadingCourses } =
    useGetCourseNoPaginate();

  return (
    <>
      <div className="pt-24px pb-10px">
        <img src={homeIcon} alt="" />
      </div>
      <Typography.Title level={5} className="italic">
        {t("DASHBOARD.WELCOME")},{" "}
        {getLocalStorage(USER_PROFILE) ?? t("DASHBOARD.USER")}
      </Typography.Title>
      <Row gutter={[18, 18]}>
        <Col sm={24} md={12} lg={8} xl={8}>
          <Card>
            <Row>
              <Col
                sm={20}
                md={20}
                lg={20}
                xl={20}
                className="flex justify-center flex-col"
              >
                <Typography className="text-text-color-2 font-semibold pb-1rem">
                  {t("SIDER.COURSES")}
                </Typography>
                <span className="text-32pix font-bold leading-extra-loose">
                  {data?.courses}
                </span>
              </Col>
              <Col sm={4} md={4} lg={4} xl={4} className="flex items-end">
                <img src={course} alt="img" />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8} xl={8}>
          <Card>
            <Row>
              <Col
                sm={20}
                md={20}
                lg={20}
                xl={20}
                className="flex justify-center flex-col"
              >
                <Typography className="text-text-color-2 font-semibold pb-1rem">
                  {t("TEAM.MENTEES")}
                </Typography>
                <span className="text-32pix font-bold leading-extra-loose">
                  {data?.mentees}
                </span>
              </Col>
              <Col sm={4} md={4} lg={4} xl={4} className="flex items-end">
                <img src={mentee} alt="img" />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8} xl={8}>
          <Card>
            <Row>
              <Col
                sm={20}
                md={20}
                lg={20}
                xl={20}
                className="flex justify-center flex-col"
              >
                <Typography className="text-text-color-2 font-semibold pb-1rem">
                  {t("TEAM.MENTORS")}
                </Typography>
                <span className="text-32pix font-bold leading-extra-loose">
                  {data?.mentors}
                </span>
              </Col>
              <Col sm={4} md={4} lg={4} xl={4} className="flex items-end">
                <img src={mentor} alt="img" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {courses && (
        <LeaderBoard courses={courses} isLoadingCourses={isLoadingCourses} />
      )}
    </>
  );
};

export default Dashboard;
