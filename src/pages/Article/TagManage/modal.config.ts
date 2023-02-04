import { ModalInfoType } from "@/component/ModalForm/types"

export const modalConfig: ModalInfoType["formItem"] = [
  {
    name: "tagName",
    label: "标签名称",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入标签名"
      }
    ]
  },
  {
    name: "tagColor",
    label: "标签颜色",
    type: "color",
    rules: [
      {
        required: true,
        message: "请输入颜色"
      }
    ]
  }
]
