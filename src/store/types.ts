import { ILoginState } from "./login/types"
import { IMomentState } from "./moment/types"

export interface IRootState {
  name: string
}

export interface IRootWithModule {
  login: ILoginState
  moment: IMomentState
}

export type IStoreType = IRootState & IRootWithModule
