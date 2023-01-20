import { deleteArticleListApi, IArticle, switchIsTopApi } from "@/api/article"
import OperationButton from "@/component/OperationButton"
import { IFlushTable } from "@/hooks/useTable/types"
import { formatTime } from "@/utils"
import { Tag, Switch } from "antd"
import { ColumnsType } from "antd/lib/table"
import React from "react"
import { NavigateFunction } from "react-router-dom"

export const tableConfig = (
  flushTable: IFlushTable,
  navigate: NavigateFunction
): ColumnsType<IArticle> => [
  {
    title: "创建时间",
    dataIndex: "createdAt",
    render: (createdAt) => {
      return <span>{formatTime(createdAt)}</span>
    }
  },
  {
    title: "文章封面",
    dataIndex: "articleCover",
    render: (text) => (
      <img src={text} style={{ width: "50px", height: "50px" }} />
    )
  },
  {
    title: "文章标题",
    dataIndex: "articleTitle"
  },
  {
    title: "分类",
    dataIndex: "category",
    render: (article) => {
      return <span>{article.categoryName}</span>
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
        )
      })
    }
  },
  {
    title: "阅读量",
    dataIndex: "viewCount"
  },
  {
    title: "置顶",
    dataIndex: "isTop",
    render: (text, record) => {
      return (
        <Switch
          defaultChecked={!!text}
          onClick={async () => {
            await switchIsTopApi(record.articleId as number, text)
          }}
        />
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
              navigate(`/article/article-publish/${record.articleId}`, {})
            }}
            clickDelete={async () => {
              await deleteArticleListApi([record.articleId] as number[])
              flushTable()
            }}
          />
        </>
      )
    },
    width: "250px"
  }
]
