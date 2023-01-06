import request from "@/config/index";
import { ReturnType } from "../types";
import { DataType } from "@/api/types";
import { ITag } from "@/api/tag";

export const getTagListApi = (
  currentPage: number,
  pageSize: number,
  searchText: string
): Promise<ReturnType<DataType<ITag>>> =>
  request.get(
    `/tag/getTagList`,{
      params:{
        currentPage,
        pageSize,
        searchText
      }

    }
  );

export const insertTagApi = (tagName: string) =>
  request.post("/tag/insertTag", { tagName });

export const deleteTagListApi = (tagList: number[]) =>
  request.post(`/tag/deleteTagList`, { tagList });

export const editTagApi = (tagId: number, tagName: object) =>
  request.post(`/tag/editTag`, { tagId, ...tagName });
