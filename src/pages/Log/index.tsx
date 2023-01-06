import React from "react";
import PageHeader from "@/component/PageHeader";
import { Pagination, Table } from "antd";
import ButtonHeader from "@/component/ButtonHeader";
import ModalForm from "@/component/ModalForm";
import { deleteLogListApi, editLogApi, getLogListApi, insertLogApi } from "@/api/log";
import useColumns from "./table.config";
import { useModal, useTable } from "@/hooks";
import { ILog } from "@/api/log";
import { modalConfig } from "./modal.config";
function index() {
  const {
    flushTable,
    tableInfo,
    setTableInfo,
    rowSelection,
    batchDelete,
    onSearch,
  } = useTable<ILog>(getLogListApi, deleteLogListApi);
  const { visible, modalInfo, addClick, setModalInfo, setVisible,editClick } = useModal(
    "日志",
    flushTable,
    insertLogApi,
    editLogApi,
    modalConfig,
  );

  const columns = useColumns(setModalInfo, setVisible, flushTable,editClick);

  return (
    <>
      <PageHeader title="日志管理" />
      <ButtonHeader
        batchDelete={batchDelete}
        newAdd={addClick}
        placeHolder="请输入日志名"
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
          onChange={(page, pageSize) => {
            setTableInfo((e) => {
              return { ...e, pageSize, currentPage: page };
            });
          }}
          current={tableInfo.currentPage}
        />
      </div>
      <ModalForm visible={visible} ModalInfo={modalInfo!}></ModalForm>
    </>
  );
}

export default index;
