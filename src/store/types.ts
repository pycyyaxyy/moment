import { ILoginState } from "./login/types"
import { IMomentState } from "./moment/types"
import { ICommentState } from "./comment/types"

export interface IRootState {
  name: string
}

export interface IRootWithModule {
  login: ILoginState
  moment: IMomentState
  comment: ICommentState
}

export type IStoreType = IRootState & IRootWithModule
