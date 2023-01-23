import request from "@/config"
import { ReturnType } from "../types"
import { IGetChartDataApi } from "./types"

export const getChartApi = (): Promise<ReturnType<IGetChartDataApi>> =>
  request.get("dashboard/getChartInfo")
