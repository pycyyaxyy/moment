import { Module } from "vuex"
import { ICommentState } from "./types"
import { IRootState } from "../types"
import { IPublish } from "@/service/comment/type"
import { commentPublishRequest } from "@/service/comment/comment"

const commentMoudle: Module<ICommentState, IRootState> = {
  namespaced: true,
  state() {
    return {
      insertId: 0,
      commentDetail: {
        id: 0,
        content: "",
        moment_id: 0,
        user_id: 0,
        comment_id: 0,
        createAt: "",
        updateAt: "",
      },
    }
  },
  mutations: {
    changeInsertId(state, insertId) {
      state.insertId = insertId
    },
  },
  getters: {},
  actions: {
    async publishCommentAction({ commit }, payload: IPublish) {
      // const { momentId, content } = payload

      //插入成功后拿到insertId，那这个就是comment的id
      const { insertId } = await commentPublishRequest(payload)
      commit("changeInsertId", insertId)
    },
  },
}

export default commentMoudle
