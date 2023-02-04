import { FormInstance } from "antd"
import React, { ChangeEvent } from "react"
import { FormItem } from "../ModalForm/types"
type IColorSelector = {
  item: FormItem,
  form:FormInstance
}
const ColorSelector = ({ item,form }: IColorSelector) => {
  const handleOnBlur = (e:ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(item.name,e.target.value)
  }
  return (
    <div>
      <input type="color" defaultValue={item.initialValue} onBlur={handleOnBlur} />
    </div>
  )
}

export default ColorSelector
