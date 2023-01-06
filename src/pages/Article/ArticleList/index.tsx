import {
  deleteArticleListApi,
  getArticleListApi,
  switchIsTopApi,
  IArticle
} from "@/api/article";
import OperationButton from "@/component/OperationButton";
import { Button, Table, Switch, Tag, Pagination } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../component/PageHeader";
import { TableInfo } from "./types";

function index() {
  const columns: ColumnsType<IArticle> = [
    {
      title: "文章封面",
      dataIndex: "articleCover",
      render: (text) => (
        <img src={text} style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "文章标题",
      dataIndex: "articleTitle",
    },
    {
      title: "分类",
      dataIndex: "category",
      render:(category)=>{
        return <span>{category.categoryName}</span>
      }
    },
    {
      title: "标签",
      dataIndex: "tagList",
      render: (list) => {
        return list.map((item: any) => {
          return (
            <Tag key={item.tagId} color={"#2db7f5"}>
              {item.tagName}
            </Tag>
          );
        });
      },
    },
    {
      title: "阅读量",
      dataIndex: "viewCount",
    },
    {
      title: "置顶",
      dataIndex: "isTop",
      render: (text, record) => {
        return (
          <Switch
            defaultChecked={!!text}
            onClick={async () => {
              await switchIsTopApi(record.articleId as number, text);
            }}
          ></Switch>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record, index) => {
        return (
          <>
            <OperationButton
              clickEdit={() => {
                navigate(`/article/article-publish/${record.articleId}`,{})
              }}
              clickDelete={async() => {
                await deleteArticleListApi([record.articleId] as number[]);
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
    await deleteArticleListApi(selectedRowKeys as number[]);
    flushTable();
    setLoading(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const flushTable = async () => {
    const { data } = await getArticleListApi(
      tableInfo.currentPage,
      tableInfo.pageSize,
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
      <PageHeader title="文章列表"></PageHeader>

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
        rowKey="articleId"
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
          // defaultCurrent={1}
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
