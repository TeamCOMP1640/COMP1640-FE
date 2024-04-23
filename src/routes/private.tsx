import { lazy } from "react";

const PrivateLayout = lazy(
  () => import("@app/components/templates/Layout/Private/Private")
);
const Dashboard = lazy(() => import("@app/pages/Dashboard/Dashboard"));
const CourseList = lazy(
  () => import("@app/pages/Courses/CourseList/CourseList")
);
const CourseDetail = lazy(
  () => import("@app/pages/Courses/CourseDetail/CourseDetail")
);
const AccountList = lazy(
  () => import("@app/pages/Accounts/AccountList/AccountList")
);
const AccountDetail = lazy(
  () => import("@app/pages/Accounts/AccountDetail/AccountDetail")
);
const GiftList = lazy(() => import("@app/pages/Gift/GiftList/GiftList"));

const WorkshopList = lazy(
  () => import("@app/pages/Workshop/WorkshopList/WorkshopList")
);

const WorkshopDetail = lazy(
  () => import("@app/pages/Workshop/WorkshopDetail/WorkshopDetail")
);

const AcademicList = lazy(
  () => import("@app/pages/Academics/AcademicList/AcademicList")
);

const FacultyList = lazy(() => import("@app/pages/Faculties/FacultyList"));

const MagazineList = lazy(() => import("@app/pages/Magazine/MagazineList"));

const MagazineStudentList = lazy(
  () => import("@app/pages/Magazine/MagazineStudentList")
);

const MagazineDetail = lazy(() => import("@app/pages/Magazine/MagazineDetail"));
const MagazineDetailCoordinator = lazy(
  () => import("@app/pages/Magazine/MagazineDetailCoordinator")
);

const PublicationPost = lazy(
  () => import("@app/pages/Magazine/Publication/PublicationPost")
);

const PublicationList = lazy(
  () => import("@app/pages/Magazine/Publication/PublicationList")
);

interface Route {
  element: JSX.Element;
  children?: Route[];
  path?: string;
}

const routes = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "accounts",
        children: [
          {
            path: "",
            element: <AccountList />,
          },
          {
            path: ":id",
            element: <AccountDetail />,
          },
        ],
      },
      {
        path: "courses",
        children: [
          {
            path: "",
            element: <CourseList />,
          },
          {
            path: ":id",
            element: <CourseDetail />,
          },
        ],
      },
      {
        path: "gifts",
        children: [
          {
            path: "",
            element: <GiftList />,
          },
        ],
      },
      {
        path: "academics",
        children: [
          {
            path: "",
            element: <AcademicList />,
          },
        ],
      },
      {
        path: "magazine",
        children: [
          {
            path: "",
            element: <MagazineList />,
          },
          {
            path: ":id",
            element: <MagazineDetailCoordinator />,
          },
        ],
      },
      {
        path: "student-magazine",
        children: [
          {
            path: "",
            element: <MagazineStudentList />,
          },
          {
            path: ":id",
            element: <MagazineDetail />,
          },
        ],
      },
      {
        path: "faculty",
        children: [
          {
            path: "",
            element: <FacultyList />,
          },
        ],
      },
      {
        path: "manager-article",
        children: [
          {
            path: "",
            element: <PublicationList />,
          },
        ],
      },

      {
        path: "publication",
        children: [
          {
            path: "",
            element: <PublicationPost />,
          },
        ],
      },
      {
        path: "workshops",
        children: [
          {
            path: "",
            element: <WorkshopList />,
          },
          {
            path: ":id",
            element: <WorkshopDetail />,
          },
        ],
      },
    ],
  } as Route,
];

export default routes;
