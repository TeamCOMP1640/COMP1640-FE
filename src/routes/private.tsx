import { lazy } from "react";

const PrivateLayout = lazy(
  () => import("@app/components/templates/Layout/Private/Private")
);

interface Route {
  element: JSX.Element;
  children?: Route[];
  path?: string;
}

const routes = [
  {
    element: <PrivateLayout />,
    children: [],
  } as Route,
];

export default routes;
