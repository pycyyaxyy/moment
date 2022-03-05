import peRequest from "../index"
import { IPublish } from "./type"

enum CommentAPI {
  Publish = "/comment", //实际上的接口是通过body来传递momentId，和content
}

export function commentPublishRequest(publishData: IPublish) {
  return peRequest.post({
    url: CommentAPI.Publish,
    data: publishData,
  })
}
