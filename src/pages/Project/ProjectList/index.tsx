
import { deleteProjectListApi, getProjectListApi } from "@/api/ProjectApi";
import OperationButton from "@/component/OperationButton";
import { formatTime } from "@/utils";
import { Button, Table, Pagination } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../component/PageHeader";
import { TableInfo } from "./types";
import { RowType } from "./types";

function index() {
  const columns: ColumnsType<RowType> = [
    {
      title: "项目图片",
      dataIndex: "projectCover",
      render: (text) => (
        <img src={text} style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "项目名称",
      dataIndex: "projectName",
    },
    {
      title:"项目链接",
      dataIndex:"projectLink"
    },

    {
      title: "创建时间",
      dataIndex: "createdAt",
      render:(time)=>(
        <span>{formatTime(time)}</span>
      )
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record, index) => {
        return (
          <>
            <OperationButton
              clickEdit={() => {
                navigate(`/project/project-publish/${record.projectId}`,{})
              }}
              clickDelete={async() => {
                await deleteProjectListApi([record.projectId] as number[]);
                flushTable()
              }}
            />
          </>
        );
      },
      width: "250px",
    },
  ];
  //元素居中
  columns.forEach((item) => {
    item.align = "center";
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableInfo, setTableInfo] = useState<TableInfo>({
    currentPage: 1,
    pageSize: 10,
    data: [],
    count: 0,
    searchText: "",
  });
  const navigate = useNavigate()
  const deleteSelect = async () => {
    setLoading(true);
    await deleteProjectListApi(selectedRowKeys as number[]);
    flushTable();
    setLoading(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const flushTable = async () => {
    const { data } = await getProjectListApi(
      tableInfo.pageSize,
      tableInfo.currentPage,
      tableInfo.searchText
    );
    setTableInfo({ ...tableInfo, ...{ count: data.count, data: data.rows } });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  //每次更新时刷新页面
  useEffect(() => {
    flushTable();
  }, [tableInfo.pageSize, tableInfo.currentPage]);

  return (
    <>
      <PageHeader title="项目列表"></PageHeader>

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={deleteSelect}
          disabled={!hasSelected}
          loading={loading}
          danger
        >
          批量删除
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
      scroll={{ x: 1100 }}
        bordered
        rowKey="projectId"
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
          current={tableInfo.currentPage}
          onChange={(page, pageSize) => {
            setTableInfo({ ...tableInfo, pageSize, currentPage: page });
          }}
        />
      </div>
    </>
  );
}

export default index;
