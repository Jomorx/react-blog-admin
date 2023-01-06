import request from "@/config";
import { ICategory } from "@/api/category";
import { DataType, ReturnType } from "../types";

export const getCategoryListApi = (
  currentPage: number,
  pageSize: number,
  searchText: string
): Promise<ReturnType<DataType<ICategory>>> =>
  request.get(
    `/category/getCategoryList`,{
      params:{
        currentPage,
        pageSize,
        searchText
      }
    }
  );

export const deleteCategoryListApi = (categoryList: number[]) =>
  request.post(`/category/deleteCategoryList`, { categoryList });

export const insertCategoryApi = (category:ICategory) =>request.post("/category/insertCategory", category);

export const editCategoryApi = (category:ICategory) =>request.post("/category/editCategory", category);
