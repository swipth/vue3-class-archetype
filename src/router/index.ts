import AdminLayout from "@/layouts/CommonLayout.vue";
import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {commonRoutes} from "@/router/modules/common";
import {extendRoutes} from "@/router/modules/extend";

// 合并路由
const allRoutes = extendRoutes.concat(commonRoutes)
const devRoutes = [
  {
    path: "",
    name: "Admin",
    component: AdminLayout,
    children: allRoutes,
  },
];
export const routes: Array<RouteRecordRaw> = window.__POWERED_BY_WUJIE__ ? allRoutes : devRoutes;

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
});
export default router;
