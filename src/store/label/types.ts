export interface ILabelState {
  insertId?: number
  labelList: IlabelList[]
}

export interface IlabelList {
  id: number
  name: string
  createAt: string
  updateAt: string
}
