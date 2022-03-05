import { Module } from "vuex"
import router from "@/router/index"
import { ILoginState } from "./types"
import { IRootState } from "../types"
import {
  accountLoginRequest,
  accountUserInfoRequest,
  accountUserMomentRequest,
} from "@/service/login/login"
import { IAccount } from "@/service/login/type"
import LocalCache from "@/utils/cache"

const LoginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMoment: [],
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMoment(state, userMoment: any) {
      state.userMoment = userMoment
    },
  },
  getters: {},
  actions: {
    //用户登录
    async accountLoginAction({ commit }, payload: IAccount) {
      // console.log("执行了accountLoginAction", payload)

      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)

      //只有成功登录才有后面这些东西
      if (loginResult) {
        const { id, token } = loginResult
        commit("changeToken", token)
        LocalCache.setCache("token", token) //将token保存在缓存中

        // 2.其他网络请求 ，获取用户的个人信息
        const userInfo = await accountUserInfoRequest(id)
        commit("changeUserInfo", userInfo)
        LocalCache.setCache("userInfo", userInfo)

        // 3.其他网络请求，获取用户发表的动态
        const userMoment = await accountUserMomentRequest(id)
        commit("changeUserMoment", userMoment)
        LocalCache.setCache("userMoment", userMoment)
      } else {
        throw new Error("用户名或者密码错误，请重新检查输入")
      }

      //登录成功后跳转到首页
      //4.跳到首页 (通过路由跳转即可)
      router.push("/main/momentList")
    },

    //为了恢复vuex数据，如果已经登录的状况下，防止刷新或者关闭浏览器再打开丢失vuex的数据
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache("token")
      if (token) {
        commit("changeToken", token)
      }

      const userInfo = LocalCache.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }

      const userMoment = LocalCache.getCache("userMoment")
      if (userMoment) {
        commit("changeUserMoment", userMoment)
      }
    },
  },
}

export default LoginModule
