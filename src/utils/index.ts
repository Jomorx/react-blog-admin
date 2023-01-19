import moment from "moment"


//全屏
export const fullScreen = () => {
  const el = document.documentElement
  const rfs = el.requestFullscreen
  if (typeof rfs != "undefined" && rfs) {
    rfs.call(el)
  }
}

export const formatTime = (time: Date) => {
  if (!time) return ""
  return moment(time).format("YYYY-MM-DD")
}

export const getToken = (): string => localStorage.getItem("token")!
export const setToken = (token: string) => localStorage.setItem("token", token)
export const removeToken = () => localStorage.removeItem("token")

