import { ModalInfoType } from "@/component/ModalForm/types"

export const modalConfig: ModalInfoType["formItem"] = [
  {
    name: "projectName",
    label: "项目名称",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入项目名称"
      }
    ]
  },
  {
    name: "projectDescription",
    label: "项目描述",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入项目描述"
      }
    ]
  },
  {
    name: "projectLink",
    label: "项目链接",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入项目链接"
      }
    ]
  },
  {
    name: "projectCover",
    label: "项目图片",
    type: "upload",
    valuePropName: "src",
    rules: [
      {
        required: true,
        message: "请输入项目图片"
      }
    ],
    getValueFromEvent: (e) => {
      if (e.file.status === "done") {
        return e?.file.response[0].src
      }
    }
  }
]
