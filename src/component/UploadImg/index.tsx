import { Button, FormInstance } from "antd"
import React, { useRef, useState } from "react"
import { FormItem } from "../ModalForm/types"
import { uploadImageUtil } from "@/utils/upload"
const App: React.FC<{ src?: string; form: FormInstance; item: FormItem }> = (
  props
) => {
  const [src, setSrc] = useState<string | undefined>(props.src)
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = async (e: any) => {
    const originFile = e.target.files[0]
    const res = await uploadImageUtil(originFile)
    setSrc(res.data.url)
    props.form.setFieldValue(props.item.name, res.data.url)
  }
  return (
    <>
      {src ? (
        <img
          src={props.src}
          onClick={() => inputRef.current?.click()}
          style={{ width: "390px", height: "141px" }}
        />
      ) : (
        <Button onClick={() => inputRef.current?.click()} type="primary">上传图片</Button>
      )}
      <input
        onChange={onChange}
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
      />
    </>
  )
}
export default App
