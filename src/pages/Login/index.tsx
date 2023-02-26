import { getLoginInfo } from "@/api/manager/Manager"
import { useAppDispatch } from "@/hooks"
import { initUserAction } from "@/store/userStore"
import { getUserInfo, setUserInfo } from "@/utils"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.less"
function Login() {
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const Login = async () => {
    if (!account) return
    if (!password) return
    const { data } = await getLoginInfo(account, password)
    appDispatch(initUserAction(data))
    setUserInfo(data)
    navigate("/dashboard")
  }
  const [account, setAccount] = useState<string>("Guest")
  const [password, setPassword] = useState<string>("Guest")
  useEffect(() => {
    getUserInfo().token && navigate("/dashboard")
  }, [navigate])
  return (
    <div className={styles["bg-container"]}>
      <div className={styles.container}>
        <div className={styles["form-header"]}>博客后台登录</div>
        <div className={styles["form-content"]}>
          <div className={styles["form-item"]}>
            <Input
              type="text"
              value={account}
              onChange={(e) => {
                setAccount(e.target.value)
              }}
              prefix={<UserOutlined />}
            />
          </div>
          <div className={styles["form-item"]}>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              prefix={<LockOutlined />}
              autoComplete="off"
            />
          </div>
        </div>
        <Button className={styles["form-footer"]} onClick={Login}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
