import { ModalInfoType } from "@/component/ModalForm/types"

export const modalConfig: ModalInfoType["formItem"] = [
  {
    name: "projectCover",
    label: "项目图片",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入分类名"
      }
    ]
  }
]
