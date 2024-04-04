import PublicLayout from "@app/components/templates/Layout/Public/Public";
import SignIn from "@app/pages/SignIn/SignIn";

const routes = [
  {
    element: <PublicLayout />,
    children: [{ path: "login", element: <SignIn /> }],
  },
];

export default routes;
