import request from "@/config";
import { IConfig } from "./types";
import { ReturnType } from "../types";

export const getConfigByIdApi = (configId:number): Promise<ReturnType<IConfig>> =>
  request.get(`/config/getConfigById/${configId}`);

export const editConfigApi = (config: IConfig) =>
  request.post("/config/editConfig", config);
