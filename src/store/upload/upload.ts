import { Module } from "vuex"
import { IRootState } from "../types"
import { IUploadState } from "./types"
import { IUpload } from "@/service/upload/type"
import { uploadFileRequest } from "@/service/upload/upload"

const UploadModule: Module<IUploadState, IRootState> = {
  namespaced: true,
  state() {
    return {
      res: "",
    }
  },
  mutations: {},
  getters: {},
  actions: {
    async uploadMomentPicturesAction({ commit }, payload: IUpload) {
      console.log("上传的动态id为:", payload.momentId)
      console.log("上传的图片信息:", payload.fileList)

      let res = ""
      try {
        res = await uploadFileRequest(payload)
      } catch (error) {
        console.log(error)
      }

      console.log("上传图片后的返回值:", res)
    },
  },
}

export default UploadModule
