import { ITag } from "@/api/tag"
export interface TableInfo {
  count: number
  currentPage: number
  pageSize: number
  data: ITag[]
  searchText: string
}
