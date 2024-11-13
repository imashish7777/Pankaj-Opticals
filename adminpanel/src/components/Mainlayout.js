import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ProductOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  TagFilled,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

const Mainlayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {collapsed ? (
            <></>
          ) : (
            <>
              <img
                style={{
                  width: "100%",
                  marginTop: "15px",
                  backgroundColor: "#FFBA00",
                  marginTop: "0px",
                }}
                src="https://res.cloudinary.com/pankajoptical/image/upload/v1709921004/pankajoptical_LOGO_ielprm.png"
              ></img>
            </>
          )}

          <div className="demo-logo-vertical" />
          {/* <div className="logo">
            <h1>h</h1>
          </div> */}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["admin"]}
            onClick={({ key }) => {
              navigate(key);
            }}
            items={[
              {
                key: "/admin",
                icon: <DashboardOutlined />,
                label: "DashBoard",
              },
              {
                key: "customers",
                icon: <UserOutlined />,
                label: "Customers",
              },

              {
                key: "products",
                icon: <ProductOutlined />,
                label: "Products",
              },
              {
                key: "coupons",
                icon: <TagFilled />,
                label: "Coupons",
              },
              {
                key: "properties",
                icon: <UnorderedListOutlined />,
                label: "Properties",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Mainlayout;
