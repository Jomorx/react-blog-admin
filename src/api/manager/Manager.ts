import request from "@/config"
import { ReturnType } from "../types"
import { ILoginApi, ILoginDto } from "./types"
export const getLoginInfo = ({
  account,
  password
}: ILoginDto): Promise<ReturnType<ILoginApi>> =>
  request.post("/manager/getManagerInfo", { account, password })
export const registerManager = ({
  account,
  password
}: ILoginDto): Promise<ReturnType<ILoginApi>> =>
  request.post("/manager/registerManager", { account, password })
