import AdminLayout from "@/views/admin/AdminLayout.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/workbench"
  },
  {
    path: "/workbench",
    name: "Workbench",
    component: () => import("../views/admin/portal/Workbench.vue"),
  },
  {
    path: "/exception",
    name: "Exception",
    component: () => import("./../views/exception/Exception.vue"),
    meta: {},
    children: [
      {
        path: "404",
        name: "Page404",
        component: () => import("./../views/exception/Page404.vue"),
      },
      {
        path: "500",
        name: "Page500",
        component: () => import("./../views/exception/Page500.vue"),
      },
      {
        path: "501",
        name: "Page501",
        component: () => import("./../views/exception/Page501.vue"),
      },
    ]
  },
  {
    path: "*",
    redirect: "/404",
  },
];
const devRoutes = [
  {
    path: "",
    name: "Admin",
    component: AdminLayout,
    children: commonRoutes,
  },
];

export let routes: Array<RouteRecordRaw> = [];
// @ts-ignore
if (process.env.NODE_ENV === "development" && !window.__POWERED_BY_WUJIE__) {
  routes = [...devRoutes];
} else {
  routes = [...commonRoutes];
}
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
});
export default router;
