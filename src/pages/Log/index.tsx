import React from "react"
import PageHeader from "@/component/PageHeader"
import { Pagination, Table } from "antd"
import ButtonHeader from "@/component/ButtonHeader"
import ModalForm from "@/component/ModalForm"
import {
  deleteLogListApi,
  editLogApi,
  getLogListApi,
  insertLogApi
} from "@/api/log"
import useColumns from "./table.config"
import { useModal, useTable } from "@/hooks"
import { ILog } from "@/api/log"
import { modalConfig } from "./modal.config"
function Log() {
  const {
    flushTable,
    tableInfo,
    setTableInfo,
    rowSelection,
    batchDelete,
    onSearch,
    selectedRowKeys
  } = useTable<ILog>(getLogListApi, deleteLogListApi)
  const { visible, modalInfo, addClick, editClick } = useModal(
    "日志",
    "logId",
    flushTable,
    insertLogApi,
    editLogApi,
    modalConfig
  )

  const columns = useColumns({ editClick, batchDelete })

  return (
    <>
      <PageHeader title="日志管理" />
      <ButtonHeader
        batchDelete={() => {
          batchDelete(selectedRowKeys as number[])
        }}
        newAdd={addClick}
        placeHolder="请输入日志名"
        onSearch={onSearch}
      ></ButtonHeader>
      <Table
        bordered
        rowKey="logId"
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

export default Log
