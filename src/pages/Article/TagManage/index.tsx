import React, { useState } from "react";
import PageHeader from "@/component/PageHeader";
import OperationButton from "@/component/OperationButton";
import { Pagination, Table } from "antd";
import { ITag } from "@/api/tag";
import { ColumnsType } from "antd/lib/table";
import {
  deleteTagListApi,
  editTagApi,
  getTagListApi,
  insertTagApi,
} from "@/api/tag/TagApi";
import ButtonHeader from "@/component/ButtonHeader";
import ModalForm from "@/component/ModalForm";
import { ModalInfoType } from "@/component/ModalForm/types";
import { formatTime } from "@/utils";
import { useTable,useModal } from "@/hooks";
import { modalConfig } from "./modal.config";
import { tableConfig } from "./table.config";

function index() {

  const {
    tableInfo,
    setTableInfo,
    flushTable,
    rowSelection,
    batchDelete,
    onSearch,
  } = useTable<ITag>(getTagListApi, deleteTagListApi);
  const {addClick,visible,modalInfo,editClick} = useModal("标签",flushTable,insertTagApi,deleteTagListApi,modalConfig);


  const columns = tableConfig(flushTable,editClick)
  columns.forEach((item) => {
    item.align = "center";
  });


  return (
    <>
      <PageHeader title="标签管理" />
      <ButtonHeader
        batchDelete={batchDelete}
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
              return { ...e, pageSize, currentPage: page };
            });
          }}
        />
      </div>
      <ModalForm visible={visible} ModalInfo={modalInfo!}></ModalForm>
    </>
  );
}

export default index;
