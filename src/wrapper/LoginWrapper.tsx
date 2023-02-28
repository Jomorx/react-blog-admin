import { getUserInfo } from "@/utils"
import { ReactNode, useEffect } from "react"
import React, { useNavigate } from "react-router-dom"
type IProps = {
  children: ReactNode
}
const LoginWrapper = ({ children }: IProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    getUserInfo().token || navigate("/login")
  }, [navigate])

  return <>{children}</>
}

export default LoginWrapper
