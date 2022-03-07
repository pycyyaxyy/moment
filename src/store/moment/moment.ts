import { Module } from "vuex"
import { IMomentState, singleMomentType } from "./types"
import { IRootState } from "../types"
import { IMoment } from "@/service/moment/type"
import {
  MomentListRequest,
  MomentDetailRequest,
  MomentInsertRequest,
  MomentAddLabels,
  MomentDelete,
  MomentPatch,
} from "@/service/moment/moment"

const MomentModule: Module<IMomentState, IRootState> = {
  namespaced: true,
  state() {
    return {
      insertId: 0, //插入动态的时候会用
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
    changeInsertId(state, insertId: number) {
      state.insertId = insertId
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
      // console.log("来到了获取动态详情")

      const momentDetail = await MomentDetailRequest(payload)
      // console.log("momentDetail:", momentDetail)
      commit("changeSingleMomentDetail", momentDetail)
    },

    //插入动态
    async insertMomentAction({ commit }, payload: string) {
      const { insertId } = await MomentInsertRequest(payload)

      commit("changeInsertId", insertId)
    },

    //为动态添加标签
    async addLabelsToMomentAction({ commit }, payload: any) {
      const res = await MomentAddLabels(payload)
      console.log("为动态添加标签后的返回值:", res)
    },

    //根据动态id删除动态
    async deleteMomentAction({ commit }, payload: number) {
      const res = await MomentDelete(payload)
      console.log("删除动态之后的返回值:", res)
    },

    //根据动态id修改动态
    async patchMomentAction({ commit }, payload: any) {
      const res = await MomentPatch(payload)
      console.log("修改动态之后的返回值:", res)
    },
  },
}

export default MomentModule
