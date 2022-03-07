import { ILoginState } from "./login/types"
import { IMomentState } from "./moment/types"
import { ICommentState } from "./comment/types"
import { ILabelState } from "./label/types"
import { IUploadState } from "./upload/types"

export interface IRootState {
  name: string
}

export interface IRootWithModule {
  login: ILoginState
  moment: IMomentState
  comment: ICommentState
  label: ILabelState
  upload: IUploadState
}

export type IStoreType = IRootState & IRootWithModule
