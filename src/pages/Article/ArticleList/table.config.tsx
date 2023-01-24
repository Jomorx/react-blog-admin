import { IArticle, switchIsTopApi } from "@/api/article"
import OperationButton from "@/component/OperationButton"
import { ITableConfig } from "@/hooks/useTable/types"
import { formatTime } from "@/utils"
import { Tag, Switch } from "antd"
import React from "react"

const articleTableConfig: ITableConfig<IArticle> = ({
  editClick,
  batchDelete
}) => [
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
    render: (list: IArticle["tagList"]) => {
      return list.map((item) => {
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
              editClick(`/article/article-publish/${record.articleId}` as any)
            }}
            clickDelete={() => {
              batchDelete([record.articleId])
            }}
          />
        </>
      )
    },
    width: "250px"
  }
]
export default articleTableConfig
