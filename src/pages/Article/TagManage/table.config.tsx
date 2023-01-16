import React from "react"
import { deleteTagListApi, ITag } from "@/api/tag"
import OperationButton from "@/component/OperationButton"
import { formatTime } from "@/utils"
import { ColumnsType } from "antd/lib/table"
import { IEditClick, IFlushTable } from "@/hooks/useTable/types"
export const tableConfig = (
  flushTable: IFlushTable,
  editClick: IEditClick<ITag>
): ColumnsType<ITag> => {
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
      render: (text, record, index) => {
        return (
          <>
            <OperationButton
              clickEdit={() => {
                editClick(record)
              }}
              clickDelete={async () => {
                await deleteTagListApi([record.tagId as number])
                flushTable()
              }}
            />
          </>
        )
      },
      width: "250px"
    }
  ]
}
