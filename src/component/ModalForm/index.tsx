import { Form, Input, Modal, Switch } from "antd"
import { FormInstance } from "antd/lib/form/Form"
import React from "react"
import { ColorSelector } from "../ColorSelector"
import UploadImg from "../UploadImg"
import { FormItem, ModalInfoType } from "./types"
interface IProps {
  visible: boolean
  ModalInfo: ModalInfoType
}
const switchRender = (type: string, item: FormItem, form: FormInstance) => {
  switch (type) {
    case "input": {
      return <Input />
    }
    case "textarea": {
      return <Input type="textarea" />
    }
    case "upload": {
      return <UploadImg item={item} form={form} />
    }
    case "ButtonWithPopover": {
      return item.popoverItem?.(form, item)
    }
    case "switch": {
      return <Switch />
    }
    case "color": {
      return <ColorSelector item={item} form={form} />
    }
  }
}
const CollectionCreateForm: React.FC<IProps> = ({ visible, ModalInfo }) => {
  const [form] = Form.useForm()
  return (
    <Modal
      destroyOnClose={true}
      open={visible}
      title={ModalInfo.title}
      okText="确定"
      cancelText="取消"
      onCancel={ModalInfo.onCancel}
      getContainer={false}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            await ModalInfo.onCreate?.(values)
            form.resetFields()
          })
          .catch((info) => {
            console.log("Validate Failed:", info)
          })
      }}
    >
      <Form
        preserve={false}
        form={form}
        layout="horizontal"
        name="form_in_modal"
      >
        {ModalInfo.formItem.map((item: FormItem) => {
          return (
            <Form.Item
              key={item.name}
              name={item.name}
              label={item.label}
              rules={item.rules}
              initialValue={item.initialValue}
              valuePropName={item.valuePropName}
              getValueFromEvent={item.getValueFromEvent}
            >
              {switchRender(item.type, item, form)}
            </Form.Item>
          )
        })}
      </Form>
    </Modal>
  )
}
export default CollectionCreateForm
