import React from "react"
import { ICategory } from "@/api/category"
import OperationButton from "@/component/OperationButton"
import { ITableConfig } from "@/hooks/useTable/types"
import { formatTime } from "@/utils"
const categoryTableConfig: ITableConfig<ICategory> = ({
  editClick,
  batchDelete
}) => {
  return [
    {
      title: "分类名",
      dataIndex: "categoryName",
      render: (categoryName) => {
        return <span style={{ fontWeight: "600" }}>{categoryName}</span>
      }
    },
    {
      title: "分类图片",
      dataIndex: "categoryCover",
      render: (categoryCover) => {
        return (
          <span style={{ fontWeight: "600" }}>
            <img
              style={{ width: "50px", height: "50px" }}
              src={categoryCover}
            ></img>
          </span>
        )
      }
    },
    {
      title: "分类描述",
      dataIndex: "categoryDescription",
      render: (categoryDescription) => {
        return <span style={{ fontWeight: "600" }}>{categoryDescription}</span>
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
      render: (text, record) => {
        return (
          <>
            <OperationButton
              clickEdit={() => {
                editClick(record)
              }}
              clickDelete={async () => {
                batchDelete([record.categoryId])
              }}
            />
          </>
        )
      },
      width: "250px"
    }
  ]
}
export default categoryTableConfig
