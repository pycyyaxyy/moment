import peRequest from "../index"
import { IMoment } from "./type"

enum MomentAPI {
  MomentListUrl = "/moment", //实际上的路径是/moment?offset=20&size=10
  MomentDetailUrl = "/moment", //实际上的路径是/moment/:momentId
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
