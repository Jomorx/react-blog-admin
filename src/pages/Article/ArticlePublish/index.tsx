import React, { useEffect, useState } from "react"
import { Button, Input } from "antd"
import MdEditor from "md-editor-rt"
import PageHeader from "@/component/PageHeader"
import style from "./index.module.less"
import ModalForm from "@/component/ModalForm"
import { ModalInfoType } from "@/component/ModalForm/types"
import categoryContent from "@/component/CategoryContent"
import tagContent from "@/component/TagContent"
import {
  getArticleByIdApi,
  updateArticleApi,
  uploadArticleApi
} from "@/api/article/ArticleApi"
import { useParams } from "react-router-dom"
import { IArticle } from "@/api/article"

const ArticlePublish = () => {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [visible, setVisible] = useState<boolean>(false)
  const [initValue, setInitValue] = useState<IArticle>()
  const param = useParams()
  const modalInfo: ModalInfoType = {
    onCreate: async (value) => {
      if (param.id === "-1") {
        await uploadArticleApi({
          ...value,
          articleTitle: title,
          articleContent: text
        })
      } else {
        await updateArticleApi({
          articleId: initValue?.articleId,
          ...value,
          articleTitle: title,
          articleContent: text
        })
      }
      setVisible(false)
    },
    onCancel: () => {
      setVisible(false)
    },
    formItem: [
      {
        label: "文章分类",
        name: "categoryId",
        type: "ButtonWithPopover",
        rules: [
          {
            required: true,
            message: "请输入文章分类"
          }
        ],
        popoverItem: categoryContent,
        initialValue: initValue?.category
      },
      {
        label: "文章标签",
        name: "tags",
        type: "ButtonWithPopover",
        rules: [
          {
            required: true,
            message: "请输入标签"
          }
        ],
        popoverItem: tagContent,
        initialValue: initValue?.tagList
      },
      {
        label: "上传封面",
        name: "articleCover",
        type: "upload",
        rules: [
          {
            required: true,
            message: "请上传封面"
          }
        ],
        valuePropName: "src",
        initialValue: initValue?.articleCover
      },
      {
        label: "是否置顶",
        name: "isTop",
        type: "switch",
        rules: [
          {
            required: true
          }
        ],
        getValueFromEvent: (isSwitch) => (isSwitch ? 1 : 0),
        valuePropName: "checked",
        initialValue: !!initValue?.isTop
      }
    ],
    title: "发布文章"
  }
  const publishArticle = () => {
    setVisible(true)
  }

  const init = async () => {
    if (param.id !== "-1") {
      const res = await getArticleByIdApi(Number(param.id))
      setInitValue(res.data)
      setText(res.data.articleContent)
      setTitle(res.data.articleTitle)
    }
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <PageHeader title="发布文章"></PageHeader>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className={style.title}
      >
        <span style={{ width: "60px" }}>标题:</span>
        <Input
          showCount
          maxLength={20}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <Button size="large" danger className={style.button}>
          保存草稿
        </Button>
        <Button
          size="large"
          type="primary"
          danger
          className={style.button}
          onClick={() => {
            publishArticle()
          }}
        >
          发布文章
        </Button>
      </div>
      <MdEditor modelValue={text} onChange={setText} />
      <ModalForm visible={visible} ModalInfo={modalInfo}></ModalForm>
    </>
  )
}

export default ArticlePublish
