import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Layout, theme } from "antd";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
const { Content, Footer } = Layout;

const ProtectedLayout = () => {
  const { auth, cargando } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const d = new Date();
  const year = d.getFullYear();
  if (cargando) return "Cargando...";

  return (
    <>
      {auth._id ? (
        <Layout>
          <Sidebar collapsed={collapsed} />
          <Layout className="min-h-screen">
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </Content>
            <Footer className="text-center">{`Klépierre ©${year} - Contratos Automáticos`}</Footer>
          </Layout>
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
export default ProtectedLayout;
