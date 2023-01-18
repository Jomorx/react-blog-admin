import React from "react"
import {
  deleteArticleListApi,
  getArticleListApi,
  IArticle
} from "@/api/article"
import { useTable } from "@/hooks"
import { Button, Table, Pagination } from "antd"
import { useNavigate } from "react-router-dom"
import PageHeader from "../../../component/PageHeader"
import { tableConfig } from "./table.config"

function ArticleList() {
  const {
    tableInfo,
    setTableInfo,
    flushTable,
    rowSelection,
    batchDelete,
    onSearch
  } = useTable<IArticle>(getArticleListApi, deleteArticleListApi)
  const navigate = useNavigate()

  const columns = tableConfig(flushTable, navigate)
  //元素居中
  columns.forEach((item) => {
    item.align = "center"
  })

  return (
    <>
      <PageHeader title="文章列表"></PageHeader>

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={batchDelete}
          disabled={rowSelection.selectedRowKeys.length === 0}
          danger
        >
          批量删除
        </Button>
        <span style={{ marginLeft: 8 }}>
          {rowSelection.selectedRowKeys.length === 0
            ? `Selected ${rowSelection.selectedRowKeys.length} items`
            : ""}
        </span>
      </div>
      <Table
        scroll={{ x: 1100 }}
        bordered
        rowKey="articleId"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableInfo.data}
        pagination={false}
      />
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Pagination
          style={{ marginTop: "10px" }}
          total={tableInfo.count}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          // defaultCurrent={1}
          current={tableInfo.currentPage}
          onChange={(page, pageSize) => {
            setTableInfo({ ...tableInfo, pageSize, currentPage: page })
          }}
        />
      </div>
    </>
  )
}

export default ArticleList
