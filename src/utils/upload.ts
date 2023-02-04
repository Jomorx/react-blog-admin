import { uploadImageApi } from "@/api/upload"

export const uploadImageUtil = async (originFile: File) => {
  const fileBase64 = await changeBASE64(originFile)
  const file = encodeURIComponent(fileBase64)
  const res = await uploadImageApi({ file, fileName: originFile.name })
  return res
}
// 转换为base64
const changeBASE64 = (file: File) =>
  new Promise<string>((resolve) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (ev) => resolve(ev.target?.result as string)
  })
