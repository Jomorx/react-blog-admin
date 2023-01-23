import request from "@/config/index"
import { DataType } from "@/api/types"
import { ReturnType } from "../types"
import { IProject } from "./types"
export const getProjectListApi = (
  currentPage: number,
  pageSize: number,
  searchText: string
): Promise<ReturnType<DataType<IProject>>> =>
  request.get("/project/getProjectList", {
    params: { currentPage, pageSize, searchText }
  })
export const deleteProjectListApi = (projectIdList: number[]) =>
  request.post("/project/deleteProjectList", { projectIdList: projectIdList })
export const insertProjectApi = (project: IProject) =>
  request.post("/project/uploadProject", project)
export const editProjectApi = (project: IProject) =>
  request.post("/project/updateProject", project)
export const getProjectByIdApi = (projectId: number) =>
  request.get(`/project/getProjectById/${projectId}`)
