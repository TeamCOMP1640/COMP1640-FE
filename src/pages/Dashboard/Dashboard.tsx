import { course, homeIcon, mentee, mentor } from "@app/assets/images";
import Card from "@app/components/molecules/Card/Card";
import { getLocalStorage } from "@app/config/storage";
import { USER_PROFILE } from "@app/constant/auth";
import { useGetCourseNoPaginate } from "@app/hooks";
import { useStatistic } from "@app/hooks/useDashboard";
import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const { t } = useTranslation();
  const { data } = useStatistic();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "Graphic",
    "Technical",
    "Business",
    "IOT",
    "Language",
    "Traveling",
  ];

  const dataChart = {
    labels,
    datasets: [
      {
        label: "The number of articles",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

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
                  {/* {t("SIDER.COURSES")} */} Falcuty
                </Typography>
                <span className="text-32pix font-bold leading-extra-loose">
                  {/* {data?.courses} */} 10
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
                  {/* {t("TEAM.MENTEES")} */} Student
                </Typography>
                <span className="text-32pix font-bold leading-extra-loose">
                  {data?.mentees} 20
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
                  {/* {t("TEAM.MENTORS")} */} Article
                </Typography>
                <span className="text-32pix font-bold leading-extra-loose">
                  {/* {data?.mentors} */} 30
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
      <Bar
        options={options}
        data={dataChart}
        style={{
          maxWidth: "800px",
          maxHeight: "400px",
          width: "100%",
          height: "auto",
          marginTop: 30,
        }}
      />
      ;
    </>
  );
};

export default Dashboard;
