import { ICategory } from "@/api/category";


export interface TableInfo {
  count: number;
  currentPage: number;
  pageSize: number;
  data: ICategory[];
  searchText: string;
}
