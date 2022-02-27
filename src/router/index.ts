import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
