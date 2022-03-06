import { Module } from "vuex"
import { IRootState } from "../types"
import { ILabelState } from "./types"
import { ILabel } from "@/service/label/type"
import { labelListRequest } from "@/service/label/label"

const LabelModule: Module<ILabelState, IRootState> = {
  namespaced: true,
  state() {
    return {
      insertId: 0, //创建标签的时候会用到
      labelList: [],
    }
  },
  mutations: {
    changeLabelList(state, labelList: any) {
      state.labelList = labelList
    },
  },
  getters: {},
  actions: {
    async getLabelListAction({ commit }, payload: ILabel) {
      const { offset, size } = payload
      const labelList = await labelListRequest({ offset, size })
      commit("changeLabelList", labelList)
    },
  },
}

export default LabelModule
