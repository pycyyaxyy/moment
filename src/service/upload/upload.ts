import peRequest from "../index"
import { IUpload } from "./type"

enum UploadAPI {
  UploadFile = "upload/picture", //实际上的接口是/upload/picture?momentId=xx，并且用formdata来传数据
}

export function uploadFileRequest(payload: IUpload) {
  return peRequest.post({
    url: UploadAPI.UploadFile,
    params: {
      momentId: payload.momentId,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: payload.fileList,
  })
}
