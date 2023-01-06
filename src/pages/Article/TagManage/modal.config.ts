import { ModalInfoType } from "@/component/ModalForm/types";

export const modalConfig:ModalInfoType["formItem"] = [
  {
    name: "tagName",
    label: "标签名称",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入标签名",
      },
    ],
  },
]
