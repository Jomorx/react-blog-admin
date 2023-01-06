import React, { ReactNode } from "react";

export interface FormItem {
  name: string;
  label: string;
  type: "input" | "textarea"|'upload'|'ButtonWithPopover'|'switch';
  rules: {
    required: boolean;
    message?: string;
  }[];
  popoverItem?:(form:any,item:any)=>ReactNode
  initialValue?: any;
  valuePropName?:string
  getValueFromEvent?:(...args: any) => any
}
export interface ModalInfoType{
    onCreate: (values: any) => void;
    onCancel: () => void;
    title: string;
    formItem: FormItem[];
}
