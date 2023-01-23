import request from "@/config/index"
import { DataType } from "@/api/types"
import { ReturnType } from "../types"
import { IProject } from "./types"
export const getProjectListApi = (
  pageSize: number,
  currentPage: number,
  searchText: string
): Promise<ReturnType<DataType<IProject>>> =>
  request.get(
    `/project/getProjectList?pageSize=${pageSize}&currentPage=${currentPage}&searchText=${searchText}`
  )
export const deleteProjectListApi = (projectIdList: number[]) =>
  request.post("/project/deleteProjectList", { projectIdList: projectIdList })
export const uploadProjectApi = (project: IProject) =>
  request.post("/project/uploadProject", project)
export const updateProjectApi = (project: IProject) =>
  request.post("/project/updateProject", project)
export const getProjectByIdApi = (projectId: number) =>
  request.get(`/project/getProjectById/${projectId}`)
