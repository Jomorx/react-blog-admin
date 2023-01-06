import { IConfig } from "@/api/config";

export interface TableInfo {
  count: number;
  currentPage: number;
  pageSize: number;
  data: IConfig[];
  searchText: string;
}
