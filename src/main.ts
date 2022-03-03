import { createApp } from "vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElIcons from "@element-plus/icons-vue"
import "normalize.css"
import "./assets/css/index.less"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { setupStore } from "./store"

const app = createApp(App)
//给全局注册element-plus-icons
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}

app.use(store)
setupStore() //重定向之前先给我执行这个函数看看有没有登录过，然后恢复vuex中的数据
app.use(router).use(ElementPlus).mount("#app")

// peRequest.request({
//   url: "/moment",
//   method: "GET",
//   params: {
//     offset: 0,
//     size: 10,
//   },
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log("单独请求的config")
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log("单独响应的response")
//       return res
//     },
//   },
// })

// peRequest
//   .get({
//     url: "/moment",
//     // method: "GET",
//     params: {
//       offset: 0,
//       size: 10,
//     },
//     // showLoading: false,
//   })
//   .then((res) => {
//     console.log(res)
//   })

// axios
//   .request({
//     url: "/api/moment",
//     method: "GET",
//     params: {
//       offset: 0,
//       size: 10,
//     },
//   })
//   .then((res) => {
//     console.log(res)
//   })
