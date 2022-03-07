import peRequest from "../index"
import { IMoment } from "./type"

enum MomentAPI {
  MomentListUrl = "/moment", //实际上的路径是/moment?offset=20&size=10
  MomentDetailUrl = "/moment", //实际上的路径是/moment/:momentId
  MomentInsertUrl = "/moment", //实际上的路径是/moment 在data中用json传递数据
  MomentAddLabelsUrl = "/moment", //实际上的路径是/moment/:momentId/labels
  MomentDeleteUrl = "/moment", //实际上的路径是/moment/:momentId
  MomentPatchUrl = "/moment", //实际上的路径是/moment/:momentId,在data中传数据
}

export function MomentListRequest(moment: IMoment) {
  return peRequest.get({
    url: MomentAPI.MomentListUrl,
    params: {
      offset: moment.offset,
      size: moment.size,
    },
  })
}

export function MomentDetailRequest(momentId: number) {
  return peRequest.get({
    url: MomentAPI.MomentDetailUrl + `/${momentId}`,
  })
}

export function MomentInsertRequest(content: string) {
  return peRequest.post({
    url: MomentAPI.MomentInsertUrl,
    data: { content },
  })
}

export function MomentAddLabels(payload: any) {
  return peRequest.post({
    url: MomentAPI.MomentAddLabelsUrl + `/${payload.momentId}` + `/labels`,
    data: {
      labels: payload.labels,
    },
  })
}

export function MomentDelete(momentId: number) {
  return peRequest.delete({
    url: MomentAPI.MomentDeleteUrl + `/${momentId}`,
  })
}

export function MomentPatch(payload: any) {
  return peRequest.patch({
    url: MomentAPI.MomentPatchUrl + `/${payload.momentId}`,
    data: {
      content: payload.content,
    },
  })
}
