import { ModalInfoType } from "@/component/ModalForm/types";

export const modalConfig:ModalInfoType['formItem'] = [
  {
    name: "logContent",
    label: "日志内容",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入分类名",
      },
    ],
  },
]

