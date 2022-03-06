import peRequest from "../index"
import { ILabel } from "./type"

enum LabelAPI {
  labelListUrl = "/label", //实际上的路径是/label?offset=x&size=y
}

export function labelListRequest(label: ILabel) {
  return peRequest.get({
    url: LabelAPI.labelListUrl,
    params: {
      offset: label.offset,
      size: label.size,
    },
  })
}
