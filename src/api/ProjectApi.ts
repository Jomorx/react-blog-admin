import request from "@/config/index";
import { DataType } from "@/api/types";
import { ReturnType } from "./types";
import { RowType } from "@/pages/Project/ProjectList/types";
export const getProjectListApi:Function = (
  pageSize: number,
  currentPage: number,
  searchText: string
): Promise<ReturnType<DataType<RowType>>> =>
  request.get(
    `/project/getProjectList?pageSize=${pageSize}&currentPage=${currentPage}&searchText=${searchText}`
  );
export const deleteProjectListApi = (articleIdList: number[]) =>
  request.post("/project/deleteProjectList", { articleIdList: articleIdList });
export const uploadProjectApi = (article: any) =>
  request.post("/project/uploadProject", article);
export const updateProjectApi = (article: any) =>
  request.post("/project/updateProject", article);
export const getProjectByIdApi = (articleId: any) =>
  request.get(`/project/getProjectById/${articleId}`);
