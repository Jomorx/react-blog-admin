import { IDeleteDataApi, IGetDataApi, TableInfo } from "./types"
import React, { useEffect, useState, useCallback } from "react"

export const useTable = <T>(
  getDataApi: IGetDataApi,
  deleteDataApi: IDeleteDataApi
) => {
  const [tableInfo, setTableInfo] = useState<TableInfo<T>>({
    currentPage: 1,
    pageSize: 10,
    data: [],
    count: 0,
    searchText: ""
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const onSearch = (value: string) => {
    setTableInfo({ ...tableInfo, searchText: value, currentPage: 1 })
  }
  const flushTable = useCallback(async () => {
    const { data } = await getDataApi(
      tableInfo.currentPage,
      tableInfo.pageSize,
      tableInfo.searchText
    )
    setTableInfo({ ...tableInfo, ...{ count: data.count, data: data.rows } })
  }, [getDataApi, tableInfo])

  useEffect(() => {
    flushTable()
  }, [tableInfo.pageSize, tableInfo.currentPage, tableInfo.searchText])
  //删除
  const batchDelete = async (selectKeys: number[]) => {
    await deleteDataApi(selectKeys)
    flushTable()
  }
  return {
    tableInfo,
    setTableInfo,
    flushTable,
    selectedRowKeys,
    rowSelection,
    batchDelete,
    onSearch,
  }
}
