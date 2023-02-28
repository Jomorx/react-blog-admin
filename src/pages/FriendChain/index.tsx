import React from "react"
import PageHeader from "@/component/PageHeader"
import { Pagination, Table } from "antd"
import ButtonHeader from "@/component/ButtonHeader"
import ModalForm from "@/component/ModalForm"
import {
  IFriendChain,
  deleteFriendChainListApi,
  editFriendChainApi,
  getFriendChainListApi,
  insertFriendChainApi
} from "@/api/friendChain"
import { useModal, useTable } from "@/hooks"
import { modalConfig } from "./modal.config"
import friendChainTableConfig from "./table.config"
function FriendChian() {
  const {
    tableInfo,
    setTableInfo,
    flushTable,
    rowSelection,
    batchDelete,
    onSearch,
    selectedRowKeys
  } = useTable<IFriendChain>(getFriendChainListApi, deleteFriendChainListApi)
  const { addClick, visible, modalInfo, editClick } = useModal(
    "友链",
    "friendChainId",
    flushTable,
    insertFriendChainApi,
    editFriendChainApi,
    modalConfig
  )

  const columns = friendChainTableConfig({ editClick, batchDelete })
  columns.forEach((item) => {
    item.align = "center"
  })

  return (
    <>
      <PageHeader title="友链管理" />
      <ButtonHeader
        batchDelete={() => batchDelete(selectedRowKeys as number[])}
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
            setTableInfo((e) => {
              return { ...e, pageSize, currentPage: page }
            })
          }}
          current={tableInfo.currentPage}
        />
      </div>
      <ModalForm visible={visible} ModalInfo={modalInfo}></ModalForm>
    </>
  )
}

export default FriendChian
