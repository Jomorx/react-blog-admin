import React from "react"
import PageHeader from "@/component/PageHeader"
import { Pagination, Table } from "antd"
import { ITag } from "@/api/tag"
import {
  deleteTagListApi,
  editTagApi,
  getTagListApi,
  insertTagApi
} from "@/api/tag/TagApi"
import ButtonHeader from "@/component/ButtonHeader"
import ModalForm from "@/component/ModalForm"
import { useTable, useModal } from "@/hooks"
import { modalConfig } from "./modal.config"
import tagTableConfig from "./table.config"

function TagManage() {
  const {
    tableInfo,
    setTableInfo,
    flushTable,
    rowSelection,
    batchDelete,
    onSearch,
    selectedRowKeys
  } = useTable<ITag>(getTagListApi, deleteTagListApi)
  const { addClick, visible, modalInfo, editClick } = useModal(
    "标签",
    "tagId",
    flushTable,
    insertTagApi,
    editTagApi,
    modalConfig
  )

  const columns = tagTableConfig({editClick,batchDelete})
  columns.forEach((item) => {
    item.align = "center"
  })

  return (
    <>
      <PageHeader title="标签管理" />
      <ButtonHeader
        batchDelete={()=>batchDelete(selectedRowKeys as number[])}
        newAdd={addClick}
        placeHolder="请输入标签名"
        onSearch={onSearch}
      ></ButtonHeader>
      <Table
        bordered
        rowKey="tagId"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableInfo.data}
        pagination={false}
      ></Table>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Pagination
          style={{ marginTop: "10px" }}
          total={tableInfo.count}
          current={tableInfo.currentPage}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          onChange={(page, pageSize) => {
            setTableInfo((e) => {
              return { ...e, pageSize, currentPage: page }
            })
          }}
        />
      </div>
      <ModalForm visible={visible} ModalInfo={modalInfo}></ModalForm>
    </>
  )
}

export default TagManage
