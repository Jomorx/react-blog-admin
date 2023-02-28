import { getUserInfo, removeUserInfo } from "@/utils"
import { notification } from "antd"
import axios, { AxiosInstance } from "axios"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.ENV_BASEURL,
  timeout: 3000
})
type NotificationType = "success" | "info" | "warning" | "error"
const openNotificationWithIcon = (
  type: NotificationType,
  description: string
) => {
  switch (type) {
    case "success": {
      if (description)
        notification[type]({
          message: "成功",
          description: description
        })
      break
    }
    case "error": {
      notification[type]({
        message: "失败",
        description: description
      })
      break
    }
  }
}

request.interceptors.request.use((config) => {
  nprogress.start()
  // config.headers!["Content-Type"] = "application/json;charset=utf-8";
  config.headers!.Authorization = getUserInfo().token
  return config
})

request.interceptors.response.use(
  (res) => {
    nprogress.done()
    //相应成功做的事情

    openNotificationWithIcon("success", res.data.message)

    return res.data
  },

  (err) => {
    openNotificationWithIcon("error", err.response.data.message)
    if (err.response.data.statusCode === 403) {
      removeUserInfo()
    }

    return Promise.reject(err)
  }
)

export default request
