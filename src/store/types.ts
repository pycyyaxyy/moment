import { ILoginState } from "./login/types"
import { IMomentState } from "./moment/types"
import { ICommentState } from "./comment/types"
import { ILabelState } from "./label/types"

export interface IRootState {
  name: string
}

export interface IRootWithModule {
  login: ILoginState
  moment: IMomentState
  comment: ICommentState
  label: ILabelState
}

export type IStoreType = IRootState & IRootWithModule
