import { TableInfo } from "./types";
import { useEffect, useState } from "react";

export const useTable = <T>(getDataApi: Function,deleteDataApi:Function) => {
  const [tableInfo, setTableInfo] = useState<TableInfo<T>>({
    currentPage: 1,
    pageSize: 10,
    data: [],
    count: 0,
    searchText: "",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (value: string, event: any) => {
    setTableInfo({ ...tableInfo, ...{ searchText: value, currentPage: 1 } });
  };
  const flushTable = async () => {
    const { data } = await getDataApi(
      tableInfo.currentPage,
      tableInfo.pageSize,
      tableInfo.searchText
    );
    setTableInfo({ ...tableInfo, ...{ count: data.count, data: data.rows } });
  };
  useEffect(() => {
    flushTable();
  }, [tableInfo.pageSize, tableInfo.currentPage, tableInfo.searchText]);
  const batchDelete = async () => {
    const res = await deleteDataApi(selectedRowKeys as number[]);
    flushTable();
  };
  return {
    tableInfo,
    setTableInfo,
    flushTable,
    selectedRowKeys,
    rowSelection,
    batchDelete,
    onSearch
  };
};
