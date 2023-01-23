import React from "react"
import { IFriendChain } from "@/api/friendChain"
import { formatTime } from "@/utils"
import OperationButton from "@/component/OperationButton"
import { ITableConfig } from "@/hooks/useTable/types"
 const friendChainTableConfig:ITableConfig<IFriendChain> = ({editClick,batchDelete}) => [
  {
    title: "友链名",
    dataIndex: "friendChainName",
    render: (friendChainName) => {
      return <span style={{ fontWeight: "600" }}>{friendChainName}</span>
    }
  },
  {
    title: "友链图片",
    dataIndex: "friendChainAvatar",
    render: (friendChainAvatar) => {
      return (
        <span style={{ fontWeight: "600" }}>
          <img
            style={{ width: "50px", height: "50px" }}
            src={friendChainAvatar}
          ></img>
        </span>
      )
    }
  },
  {
    title: "友链描述",
    dataIndex: "friendChainDescription",
    render: (friendChainDescription) => {
      return <span style={{ fontWeight: "600" }}>{friendChainDescription}</span>
    }
  },
  {
    title: "友链链接",
    dataIndex: "friendChainLink",
    render: (friendChainLink) => {
      return <span style={{ fontWeight: "600" }}>{friendChainLink}</span>
    }
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    render: (createdAt) => {
      return <span style={{ fontWeight: "600" }}>{formatTime(createdAt)}</span>
    }
  },
  {
    title: "操作",
    dataIndex: "operation",
    render: (text, record) => {
      return (
        <>
          <OperationButton
            clickEdit={() => {
              editClick(record)
            }}
            clickDelete={ () => {
              batchDelete([record.friendChainId])
            }}
          />
        </>
      )
    },
    width: "250px"
  }
]
export default friendChainTableConfig
