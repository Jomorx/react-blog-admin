import request from "@/config"
import { IFileObj, IUploadImage } from "./types"
import Qs from "qs"
import { ReturnType } from "../types"
export const uploadImageApi = ({ file, fileName }: IFileObj):Promise<ReturnType<IUploadImage>> =>
  request.post("/upload/image", Qs.stringify({ file, fileName }), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
