export interface TableInfo<T> {
  count: number
  currentPage: number
  pageSize: number
  data: T[]
  searchText: string
}
export type IGetDataApi = (
  currentPage: number,
  pageSize: number,
  searchText: string
) => any
export type IDeleteDataApi = (deleteIdList: number[]) => any
export type IEditClick<T> =(arg:T)=>void
export type IFlushTable = ()=>void
