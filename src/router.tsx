import { createBrowserRouter, Outlet } from "react-router-dom";

import privateRoutes from "@app/routes/private";
import publicRoutes from "@app/routes/public";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);

export default router;
