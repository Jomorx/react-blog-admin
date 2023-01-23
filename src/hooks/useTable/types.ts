import { ColumnsType } from "antd/lib/table"

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
export type IDeleteDataApi = (deleteIdList: number[]) => void

export type IDeleteClick = (deleteIdList: number[]) => void
export type IEditClick<T> = (arg: T) => void
export type ITableConfig<T> = ({
  editClick,
  batchDelete
}: {
  editClick: IEditClick<T>
  batchDelete: IDeleteClick
}) => ColumnsType<T>
