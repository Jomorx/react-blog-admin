import { getLoginInfo, registerManager } from "@/api/manager/Manager"
import { useAppDispatch } from "@/hooks"
import { initUserAction } from "@/store/userStore"
import { getUserInfo, setUserInfo } from "@/utils"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Input, Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.less"
function Login() {
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const Login = async () => {
    const { account, password } = managerInfo
    if (!account) return
    if (!password) return
    let userData = undefined
    if (tabType === "login") {
      const { data } = await getLoginInfo({ account, password })
      userData = data
    } else {
      const { data } = await registerManager({ account, password })
      userData = data
    }
    if (!userData) return
    appDispatch(initUserAction(userData))
    setUserInfo(userData)
    navigate("/dashboard")
  }

  const [managerInfo, setManagerInfo] = useState({
    account: "",
    password: ""
  })
  const [tabType, setTabType] = useState("login")
  useEffect(() => {
    getUserInfo().token && navigate("/dashboard")
  }, [navigate])
  const LoginCpm = (
    <div className={styles["form-content"]}>
      <div className={styles["form-item"]}>
        <Input
          type="text"
          value={managerInfo.account}
          onChange={(e) => {
            setManagerInfo((prev) => ({ ...prev, account: e.target.value }))
          }}
          placeholder="请输入账号"
          prefix={<UserOutlined />}
          allowClear
        />
      </div>
      <div className={styles["form-item"]}>
        <Input
          type="password"
          value={managerInfo.password}
          placeholder="请输入密码"
          onChange={(e) => {
            setManagerInfo((prev) => ({ ...prev, password: e.target.value }))
          }}
          prefix={<LockOutlined />}
          allowClear
        />
      </div>
    </div>
  )
  const items = [
    {
      label: "登录",
      key: "login",
      children: LoginCpm
    },
    {
      label: "注册",
      key: "register",
      children: LoginCpm
    }
  ]
  const handleTabChange = (key: string) => {
    setTabType(key)
    setManagerInfo({
      account: "",
      password: ""
    })
  }
  return (
    <div className={styles["bg-container"]}>
      <div className={styles.container}>
        <Tabs
          items={items}
          centered
          activeKey={tabType}
          onChange={handleTabChange}
          size="large"
        />
        <Button
          className={styles["form-footer"]}
          type="primary"
          onClick={Login}
        >
          {tabType === "login" ? "登录" : "注册"}
        </Button>
      </div>
    </div>
  )
}

export default Login
