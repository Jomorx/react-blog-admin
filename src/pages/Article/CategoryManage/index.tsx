import React from "react"
import PageHeader from "@/component/PageHeader"
import { Pagination, Table } from "antd"
import ButtonHeader from "@/component/ButtonHeader"
import ModalForm from "@/component/ModalForm"
import {
  deleteCategoryListApi,
  editCategoryApi,
  getCategoryListApi,
  insertCategoryApi,
  ICategory
} from "@/api/category"
import { useTable, useModal } from "@/hooks"
import { modalConfig } from "./modal.config"
import categoryTableConfig from "./table.config"
function CategoryManage() {
  const {
    tableInfo,
    setTableInfo,
    flushTable,
    rowSelection,
    batchDelete,
    onSearch,
    selectedRowKeys
  } = useTable<ICategory>(getCategoryListApi, deleteCategoryListApi)
  const { visible, modalInfo, addClick, editClick } = useModal(
    "分类",
    "categoryId",
    flushTable,
    insertCategoryApi,
    editCategoryApi,
    modalConfig
  )

  const columns = categoryTableConfig({ editClick, batchDelete })
  columns.forEach((item) => {
    item.align = "center"
  })

  return (
    <>
      <PageHeader title="分类管理" />
      <ButtonHeader
        batchDelete={() => batchDelete(selectedRowKeys as number[])}
        newAdd={addClick}
        placeHolder="请输入分类名"
        onSearch={onSearch}
      ></ButtonHeader>
      <Table
        bordered
        rowKey="categoryId"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableInfo.data}
        pagination={false}
      ></Table>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Pagination
          style={{ marginTop: "10px" }}
          total={tableInfo.count}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          onChange={(currentPage, pageSize) => {
            setTableInfo((e) => {
              return { ...e, pageSize, currentPage }
            })
          }}
          current={tableInfo.currentPage}
        />
      </div>
      <ModalForm visible={visible} ModalInfo={modalInfo}></ModalForm>
    </>
  )
}

export default CategoryManage
