import { FormInstance } from "antd"
import React, { useRef, useState } from "react"
import { FormItem } from "../ModalForm/types"
import { uploadImageApi } from "@/api/upload"
const App: React.FC<{ src?: string; form: FormInstance; item: FormItem }> = (
  props
) => {
  const [src, setSrc] = useState<string | undefined>(props.src)
  const inputRef = useRef<HTMLInputElement>(null)
  // 转换为base64
  const changeBASE64 = (file: File) =>
    new Promise<string>((resolve) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = (ev) => resolve(ev.target?.result as string)
    })
  const onChange = async (e: any) => {
    console.log(e.target)

    const originFile = e.target.files[0]
    const fileBase64 = await changeBASE64(originFile)
    const file = encodeURIComponent(fileBase64)
    const res = await uploadImageApi({ file, fileName: originFile.name })
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
        <div onClick={() => inputRef.current?.click()}>点我</div>
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
