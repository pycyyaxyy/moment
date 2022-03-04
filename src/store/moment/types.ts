export interface IMomentState {
  momentList: momentDetailInList[]
  singleMomentDetail?: singleMomentType
}

export interface momentDetailInList {
  id: number
  content: string
  createTime: string
  updateTime: string
  author: any
  labelCount: number
  commentCount: number
  images: any
}

export interface singleMomentType {
  id: number
  content: string
  createTime: string
  updateTime: string
  author: any
  labels: any
  comments: any
  images: any
}
