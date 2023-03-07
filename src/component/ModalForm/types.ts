import { FormInstance } from "antd"
import { FunctionComponent, ReactElement, ReactNode } from "react"

export interface FormItem {
  name: string
  label: string
  type:
    | "input"
    | "textarea"
    | "upload"
    | "ButtonWithPopover"
    | "switch"
    | "color"
  rules: {
    required: boolean
    message?: string
  }[]
  popoverItem?: "tagContent"|"categoryContent"
  initialValue?: any
  valuePropName?: string
  getValueFromEvent?: (...args: any) => any
}
export interface ModalInfoType {
  onCreate: ((values: any) => void) | undefined
  onCancel: (() => void) | undefined
  title: string
  formItem: FormItem[]
}
