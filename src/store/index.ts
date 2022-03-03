import { createStore } from "vuex"
import { IRootState, IStoreType } from "./types"
import login from "./login/login"

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
  },
})

export function setupStore() {
  store.dispatch("login/loadLocalLogin")
}

export default store
