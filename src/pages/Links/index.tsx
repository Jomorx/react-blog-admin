import React, { useEffect, useState } from "react";
import PageHeader from "@/component/PageHeader";
import OperationButton from "@/component/OperationButton";
import { Pagination, Table } from "antd";
import { TableInfo } from "./types";
import { ColumnsType } from "antd/lib/table";
import ButtonHeader from "@/component/ButtonHeader";
import ModalForm from "@/component/ModalForm";
import { ModalInfoType } from "@/component/ModalForm/types";
import { formatTime } from "@/utils";
import {
  IFriendChain,
  deleteFriendChainListApi,
  editFriendChainApi,
  getFriendChainListApi,
  insertFriendChainApi,
} from "@/api/friendChain";
import { useTable } from "@/hooks";
function index() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {tableInfo,setTableInfo,flushTable} = useTable<IFriendChain>(getFriendChainListApi);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [modalInfo, setModalInfo] = useState<ModalInfoType>({
    title: "编辑标签",
    onCreate: () => {},
    onCancel: () => {},
    formItem: [],
  });
  const [visible, setVisible] = useState<boolean>(false);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: ColumnsType<IFriendChain> = [
    {
      title: "友链名",
      dataIndex: "friendChainName",
      render: (categoryName) => {
        return <span style={{ fontWeight: "600" }}>{categoryName}</span>;
      },
    },
    {
      title: "友链图片",
      dataIndex: "friendChainAvatar",
      render: (categoryCover) => {
        return (
          <span style={{ fontWeight: "600" }}>
            <img
              style={{ width: "50px", height: "50px" }}
              src={categoryCover}
            ></img>
          </span>
        );
      },
    },
    {
      title: "友链描述",
      dataIndex: "friendChainDescription",
      render: (categoryDescription) => {
        return <span style={{ fontWeight: "600" }}>{categoryDescription}</span>;
      },
    },
    {
      title: "友链链接",
      dataIndex: "friendChainLink",
      render: (articleCount) => {
        return <span style={{ fontWeight: "600" }}>{articleCount}</span>;
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      render: (createdAt) => {
        return (
          <span style={{ fontWeight: "600" }}>{formatTime(createdAt)}</span>
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
                setModalInfo({
                  title: "编辑友链",
                  onCreate: async (value) => {
                    await editFriendChainApi({
                      ...value,
                      friendChainId: record.friendChainId,
                    });
                    flushTable();
                    setVisible(false);
                  },
                  onCancel: () => {
                    setVisible(false);
                  },
                  formItem: [
                    {
                      name: "friendChainName",
                      label: "友链名称",
                      type: "input",
                      initialValue: record.friendChainName,
                      rules: [
                        {
                          required: true,
                          message: "请输入友链名",
                        },
                      ],
                    },
                    {
                      name: "friendChainDescription",
                      label: "友链描述",
                      type: "input",
                      initialValue: record.friendChainDescription,
                      rules: [
                        {
                          required: true,
                          message: "请输入友链描述",
                        },
                      ],
                    },
                    {
                      name: "friendChainLink",
                      label: "友链链接",
                      type: "input",
                      initialValue: record.friendChainLink,
                      rules: [
                        {
                          required: true,
                          message: "请输入友链链接",
                        },
                      ],
                    },
                    {
                      name: "friendChainAvatar",
                      label: "友链图片",
                      type: "upload",
                      initialValue: record.friendChainAvatar,
                      rules: [
                        {
                          required: true,
                          message: "请上传友链图片",
                        },
                      ],
                      valuePropName: "src",
                      getValueFromEvent: (e: any) => {
                        console.log("Upload event:", e.file.status);
                        if (e.file.status === "done") {
                          return e?.file.response[0].src;
                        }
                      },
                    },
                  ],
                });
                setVisible(true);
              }}
              clickDelete={async () => {
                await deleteFriendChainListApi([
                  record.friendChainId as number,
                ]);
                flushTable();
              }}
            />
          </>
        );
      },
      width: "250px",
    },
  ];

  columns.forEach((item) => {
    item.align = "center";
  });

  const batchDelete = async () => {
    const res = await deleteFriendChainListApi(selectedRowKeys as number[]);
    flushTable()
  };
  const newAdd = () => {
    setModalInfo({
      title: "新增友链",
      onCreate: async (value) => {
        await insertFriendChainApi(value);
        flushTable();
        setVisible(false);
      },
      onCancel: () => {
        setVisible(false);
      },
      formItem: [
        {
          name: "friendChainName",
          label: "友链名称",
          type: "input",
          rules: [
            {
              required: true,
              message: "请输入友链名称",
            },
          ],
        },
        {
          name: "friendChainDescription",
          label: "友链描述",
          type: "input",
          rules: [
            {
              required: true,
              message: "请输入友链描述",
            },
          ],
        },
        {
          name: "friendChainLink",
          label: "友链链接",
          type: "input",
          rules: [
            {
              required: true,
              message: "请输入友链链接",
            },
          ],
        },
        {
          name: "friendChainAvatar",
          label: "友链图片",
          type: "upload",
          rules: [
            {
              required: true,
              message: "请上传友链图片",
            },
          ],
          valuePropName: "src",
          getValueFromEvent: (e: any) => {
            console.log("Upload event:", e.file.status);
            if (e.file.status === "done") {
              return e?.file.response[0].src;
            }
          },
        },
      ],
    });
    setVisible(true);
  };
  const onSearch = (value: string, event: any) => {
    setTableInfo({ ...tableInfo, ...{ searchText: value, currentPage: 1 } });
  };
  return (
    <>
      <PageHeader title="友链管理" />
      <ButtonHeader
        batchDelete={batchDelete}
        newAdd={newAdd}
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
            console.log(page);
            setTableInfo((e) => {
              return { ...e, pageSize, currentPage: page };
            });
          }}
          // defaultCurrent={tableInfo.currentPage}
          current={tableInfo.currentPage}
        />
      </div>
      <ModalForm visible={visible} ModalInfo={modalInfo!}></ModalForm>
    </>
  );
}

export default index;
