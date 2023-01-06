import { Layout, Avatar, Popover } from "antd";
import Menu from "@/component/Menu";
import Breadcrumb from "@/component/Breadcrumb";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExpandOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "./index.module.less";
const { Header, Sider, Content } = Layout;
import { fullScreen, getToken, removeToken } from "@/utils";
import { Suspense } from "react";
import router from "@/router/routes";

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  //没有token重定向到登录
  // useEffect(() => {
  //   getToken() || navigate("/login");
  // }, []);
  return (
    <Layout className={style.layout}>
      <div
        style={{
          position: "relative",
          width: collapsed ? "80px" : "200px",
          transition: "all 0.2s",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ position: "fixed", height: "100vh", overflowY: "auto" }}
        >
          <div className={style.logo}>
            <span>{collapsed ? "系统" : "博客管理系统"}</span>
          </div>
          <Menu collapsed={collapsed}></Menu>
        </Sider>
      </div>
      <Layout
        className="site-layout"
        style={{
          overflowY: "auto",
          minHeight: "100vh",
        }}
      >
        <Header className={"site-layout-background" + " " + style.header}>
          <div className={style.headerLeft}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
                style: {
                  marginLeft: 30,
                },
              }
            )}
            <Breadcrumb></Breadcrumb>
          </div>
          <div className={style.headerRight}>
            <ExpandOutlined
              onClick={() => {
                fullScreen();
              }}
            />
            <Popover
              content={
                <div style={{cursor:'pointer'}}
                  onClick={(e) => {
                    removeToken();
                    navigate("/login");
                  }}
                >
                  退出登录
                </div>
              }
            >
              <Avatar>U</Avatar>
            </Popover>
          </div>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <Suspense fallback={"加载中"}>
            <Outlet></Outlet>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
