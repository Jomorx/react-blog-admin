import React from "react"
import { ITag } from "@/api/tag"
import OperationButton from "@/component/OperationButton"
import { formatTime } from "@/utils"
import { ITableConfig } from "@/hooks/useTable/types"
const tagTableConfig: ITableConfig<ITag> = ({ editClick, batchDelete }) => {
  return [
    {
      title: "标签名",
      dataIndex: "tagName",
      render: (tagName) => {
        return <span style={{ fontWeight: "600" }}>{tagName}</span>
      }
    },
    {
      title: "文章数量",
      dataIndex: "articleCount",
      render: (articleCount) => {
        return <span style={{ fontWeight: "600" }}>{articleCount}</span>
      }
    },
    {
      title: "标签颜色",
      dataIndex: "tagColor",
      render: (tagColor) => {
        return (
          <div
            style={{
              background: tagColor,
              width: "30px",
              height: "30px",
              margin:"0 auto"
            }}
          ></div>
        )
      }
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      render: (createdAt) => {
        return (
          <span style={{ fontWeight: "600" }}>{formatTime(createdAt)}</span>
        )
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
              clickDelete={() => {
                batchDelete([record.tagId])
              }}
            />
          </>
        )
      },
      width: "250px"
    }
  ]
}
export default tagTableConfig
