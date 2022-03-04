import { Module } from "vuex"
import { IMomentState, singleMomentType } from "./types"
import { IRootState } from "../types"
import { IMoment } from "@/service/moment/type"
import { MomentListRequest, MomentDetailRequest } from "@/service/moment/moment"

const MomentModule: Module<IMomentState, IRootState> = {
  namespaced: true,
  state() {
    return {
      momentList: [],
      singleMomentDetail: {
        id: 0,
        content: "",
        createTime: "",
        updateTime: "",
        author: {},
        labels: [],
        comments: [],
        images: [],
      },
    }
  },
  mutations: {
    changeMomentList(state, momentList: any) {
      state.momentList = momentList
    },
    changeSingleMomentDetail(state, singleMomentDetail: singleMomentType) {
      state.singleMomentDetail = singleMomentDetail
    },
  },
  getters: {},
  actions: {
    //获取动态列表
    async getMomentListAction({ commit }, payload: IMoment) {
      const { offset, size } = payload

      //1.调用service的操作读取数据库中的momentlist
      const momentList = await MomentListRequest({ offset, size })

      //2.将momentList保存在state中
      commit("changeMomentList", momentList)

      // console.log("动态列表：", momentList)
    },

    //获取单条动态详情(通过动态id)
    async getSingleMomentDetialAction({ commit }, payload: number) {
      const momentDetail = await MomentDetailRequest(payload)
      // console.log("momentDetail:", momentDetail)
      commit("changeSingleMomentDetail", momentDetail)
    },
  },
}

export default MomentModule
