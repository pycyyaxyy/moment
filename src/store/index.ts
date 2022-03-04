import { createStore, Store, useStore as useVuexStore } from "vuex"
import { IRootState, IStoreType } from "./types"
import login from "./login/login"
import moment from "./moment/moment"

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "eason",
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    moment,
  },
})

//初始化派发给login模块中的这个action，看是否用户已经登录过
export function setupStore() {
  store.dispatch("login/loadLocalLogin")
}

//封装一个useStore，为了做类型检测
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
