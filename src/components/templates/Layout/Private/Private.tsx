import SpinLoading from "@app/components/atoms/SpinLoading/SpinLoading";
import Sider from "@app/components/molecules/Sider/Sider";
import { Col, Layout } from "antd";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="w-screen h-screen overflow-hidden">
      <Sider />
      <Content className="bg-primary_bg p-4 h-full ml-80px pl-1rem pr-1rem overflow-visible">
        <Suspense fallback={<SpinLoading />}>
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default App;
