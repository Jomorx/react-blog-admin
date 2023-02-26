import { Layout, Avatar, Popover, Menu } from "antd"
import Breadcrumb from "@/component/MoBreadcrumb"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExpandOutlined
} from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import style from "./index.module.less"
const { Header, Sider, Content } = Layout
import { fullScreen, getUserInfo, removeUserInfo } from "@/utils"
import { Suspense } from "react"
import { menuItems } from "@/utils/menu"
import { ItemType } from "antd/es/menu/hooks/useItems"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { initUserAction, removeUserAction } from "@/store/userStore"

const ManageLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const userStore = useAppSelector((store) => store.userStore)
  const handleLogOut = () => {
    removeUserInfo()
    appDispatch(removeUserAction())
    navigate("/login")
  }
  useEffect(() => {
    const { account, nickname } = getUserInfo()
    appDispatch(initUserAction({ account, nickname }))
  }, [])
  return (
    <Layout className={style.layout}>
      <div
        style={{
          position: "relative",
          width: collapsed ? "80px" : "200px",
          transition: "all 0.2s"
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
          <Menu
            selectedKeys={[location.pathname]}
            items={menuItems as ItemType[] | undefined}
            mode="inline"
            onClick={({ key }) => navigate(key)}
            theme="dark"
          />
        </Sider>
      </div>
      <Layout
        className="site-layout"
        style={{
          overflowY: "auto",
          minHeight: "100vh"
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
                  marginLeft: 30
                }
              }
            )}
            <Breadcrumb></Breadcrumb>
          </div>
          <div className={style.headerRight}>
            <ExpandOutlined
              onClick={() => {
                fullScreen()
              }}
            />
            <Popover
              content={
                <div style={{ cursor: "pointer" }} onClick={handleLogOut}>
                  退出登录
                </div>
              }
            >
              <Avatar style={{ cursor: "pointer" }}>
                {userStore.userInfo.nickname}
              </Avatar>
            </Popover>
          </div>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "white"
          }}
        >
          <Suspense fallback={"加载中"}>
            <Outlet></Outlet>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default ManageLayout
