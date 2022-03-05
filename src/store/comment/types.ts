export interface ICommentState {
  insertId?: number
  commentDetail?: ICommentDetail
}

export interface ICommentDetail {
  id: number
  content: string
  moment_id: number
  user_id: number
  comment_id: number
  createAt: string
  updateAt: string
}
