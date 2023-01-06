import { ModalInfoType } from "@/component/ModalForm/types";

export const modalConfig:ModalInfoType["formItem"] = [
  {
    name: "categoryName",
    label: "分类名称",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入分类名",
      },
    ],
  },
  {
    name: "categoryDescription",
    label: "分类描述",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入分类描述",
      },
    ],
  },
  {
    name: "categoryCover",
    label: "分类图片",
    type: "upload",
    rules: [
      {
        required: true,
        message: "请上传分类图片",
      },
    ],
    valuePropName: "src",
    getValueFromEvent: (e: any) => {
      console.log("Upload event:", e.file.status);
      if (e.file.status === "done") {
        return e?.file.response[0].src;
      }
    },
  },
]
