import { ModalInfoType } from "@/component/ModalForm/types"

export const modalConfig: ModalInfoType["formItem"] = [
  {
    name: "friendChainName",
    label: "友链名称",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入友链名"
      }
    ]
  },
  {
    name: "friendChainDescription",
    label: "友链描述",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入友链描述"
      }
    ]
  },
  {
    name: "friendChainLink",
    label: "友链链接",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入友链链接"
      }
    ]
  },
  {
    name: "friendChainAvatar",
    label: "友链图片",
    type: "upload",
    rules: [
      {
        required: true,
        message: "请上传友链图片"
      }
    ],
    valuePropName: "src",
    getValueFromEvent: (e) => {
      console.log("Upload event:", e.file.status)
      if (e.file.status === "done") {
        return e?.file.response[0].src
      }
    }
  }
]
