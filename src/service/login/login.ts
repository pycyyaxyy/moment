import peRequest from "../index"
import { IAccount } from "./type"

enum LoginAPI {
  AccountLogin = "/login",
  UserInfo = "/users", //实际上接口是/users/:userId
  UserMoment = "/moment/userId", //实际上接口是/moment/userId/:userId
}

export function accountLoginRequest(account: IAccount) {
  return peRequest.post({
    url: LoginAPI.AccountLogin,
    data: account,
  })
}

export function accountUserInfoRequest(userId: number) {
  return peRequest.get({
    url: LoginAPI.UserInfo + `/${userId}`,
  })
}

export function accountUserMomentRequest(userId: number) {
  return peRequest.get({
    url: LoginAPI.UserMoment + `/${userId}`,
  })
}
