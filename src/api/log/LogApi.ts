import request from "@/config";
import { ReturnType } from "../types";
import { ILog } from "./types";

export const getLogListApi = (
  currentPage: number,
  pageSize: number,
  searchText?: string
): Promise<ReturnType<ILog>> =>
  request.get("/log/getLogList", {
    params: {
      currentPage,
      pageSize,
      searchText,
    },
  });
export const deleteLogListApi = (logList: number[]) =>
  request.post("/log/deleteLogList", { logList });
export const insertLogApi = (logContent:string) =>
  request.post("/log/insertLog", { logContent });
  export const editLogApi = (log:ILog) =>
  request.post("/log/editLog", log);
