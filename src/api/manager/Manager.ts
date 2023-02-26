import request from "@/config"
import { ReturnType } from "../types"
import { ILoginApi } from "./types"
export const getLoginInfo = (
  account: string,
  password: string
): Promise<ReturnType<ILoginApi>> =>
  request.post("/manager/getManagerInfo", { account, password })
