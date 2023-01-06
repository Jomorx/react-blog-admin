import { RouteItem } from "@/router/types";
import moment from "moment";
import MenuItem from "_antd@4.21.6@antd/lib/menu/MenuItem";

//全屏
export const fullScreen = () => {
  const el = document.documentElement;
  const rfs = el.requestFullscreen;
  if (typeof rfs != "undefined" && rfs) {
    rfs.call(el);
  }
  // else if (typeof (window as any).ActiveXObject != "undefined") {
  //   // for Internet Explorer
  //   const wscript = new ActiveXObject("WScript.Shell");
  //   if (wscript != null) {
  //     wscript.SendKeys("{F11}");
  //   }
  // }
};

export const formatTime = (time: Date) => {
  if (!time) return "";
  return moment(time).format("YYYY-MM-DD");
};

export const getToken = (): string => localStorage.getItem("token")!;
export const setToken = (token: string) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");