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
export type UserInfo = {
  account: string
  nickname: string
  token: string
}
export const getUserInfo = (): UserInfo =>
  JSON.parse(localStorage.getItem("userInfo") || "{}")
export const setUserInfo = (userInfo: UserInfo) =>
  localStorage.setItem("userInfo", JSON.stringify(userInfo))
export const removeUserInfo = () => localStorage.removeItem("userInfo")
