import React, { useState } from "react"
import PageHeader from "@/component/PageHeader"
import OperationButton from "@/component/OperationButton"
import { Pagination, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import ButtonHeader from "@/component/ButtonHeader"
import ModalForm from "@/component/ModalForm"
import { ModalInfoType } from "@/component/ModalForm/types"
import { formatTime } from "@/utils"
import {
  IFriendChain,
  deleteFriendChainListApi,
  editFriendChainApi,
  getFriendChainListApi,
  insertFriendChainApi
} from "@/api/friendChain"
import { useModal, useTable } from "@/hooks"
import { modalConfig } from "./modal.config"
import { tableConfig } from "./table.config"
function Links() {
  const {
    tableInfo,
    setTableInfo,
    flushTable,
    rowSelection,
    batchDelete,
    onSearch
  } = useTable<IFriendChain>(getFriendChainListApi, deleteFriendChainListApi)
  const { addClick, visible, modalInfo, editClick } = useModal(
    "友链",
    "friendChainId",
    flushTable,
    insertFriendChainApi,
    editFriendChainApi,
    modalConfig
  )

  const columns = tableConfig(flushTable, editClick)
  columns.forEach((item) => {
    item.align = "center"
  })

  return (
    <>
      <PageHeader title="友链管理" />
      <ButtonHeader
        batchDelete={batchDelete}
        newAdd={addClick}
        placeHolder="请输入友链名"
        onSearch={onSearch}
      ></ButtonHeader>
      <Table
        bordered
        rowKey="friendChainId"
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
          onChange={(page, pageSize) => {
            console.log(page)
            setTableInfo((e) => {
              return { ...e, pageSize, currentPage: page }
            })
          }}
          // defaultCurrent={tableInfo.currentPage}
          current={tableInfo.currentPage}
        />
      </div>
      <ModalForm visible={visible} ModalInfo={modalInfo!}></ModalForm>
    </>
  )
}

export default Links
