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
import { useModal, useTable } from "@/hooks"
import { modalConfig } from "./modal.config"
import { IProject } from "@/api/project"
import tableConfig from "./table.config"
function Log() {
  const {
    flushTable,
    tableInfo,
    setTableInfo,
    rowSelection,
    batchDelete,
    onSearch,
    selectedRowKeys
  } = useTable<IProject>(getLogListApi, deleteLogListApi)
  const { visible, modalInfo, addClick, editClick } =
    useModal("项目", "projectId", flushTable, insertLogApi, editLogApi, modalConfig)
  const columns = tableConfig({editClick,batchDelete})

  return (
    <>
      <PageHeader title="项目管理" />
      <ButtonHeader
        batchDelete={()=>batchDelete(selectedRowKeys as number[] )}
        newAdd={addClick}
        placeHolder="请输入项目名"
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
