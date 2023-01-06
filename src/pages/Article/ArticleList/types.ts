import { IArticle } from "@/api/article";

export type TableInfo = {
  count: number;
  currentPage: number;
  pageSize: number;
  data: IArticle[];
  searchText: string;
};
