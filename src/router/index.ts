import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import LocalCache from "@/utils/cache"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

//由于默认重定向到首页，看看缓存里面有没有token和其他的属性（修改登录的逻辑，让查到的信息都在缓存中留存），没有token才让他重新登录
//这里搞一个路由导航守卫
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = LocalCache.getCache("token")
    const userMoment = LocalCache.getCache("userMoment")
    const userInfo = LocalCache.getCache("userInfo")

    //只要有一个不存在就直接返回登录页面
    if (!token || !userMoment || !userInfo) {
      return "/login"
    }
  }
})

export default router
