import AdminLayout from "@/layouts/CommonLayout.vue";
import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/workbench"
  },
  {
    path: "/workbench",
    name: "Workbench",
    component: () => import(/* webpackChunkName: "Workbench" */ "../views/admin/portal/Workbench.vue"),
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    component: () => import(/* webpackChunkName: "DictionarySetting" */ "../views/admin/system/DictionarySetting.vue")
  },
  {
    path: "/dictionaryType",
    name: "DictionaryType",
    component: () => import(/* webpackChunkName: "DictionaryType" */ "../views/admin/system/DictionaryType.vue")
  },
  {
    path: "/exception",
    name: "Exception",
    component: () => import(/* webpackChunkName: "Exception" */ "./../views/exception/Exception.vue"),
    meta: {title:"Exception"},
    children: [
      {
        path: "404",
        name: "Page404",
        component: () => import(/* webpackChunkName: "Page404" */ "./../views/exception/Page404.vue"),
      },
      {
        path: "500",
        name: "Page500",
        component: () => import(/* webpackChunkName: "Page500" */ "./../views/exception/Page500.vue"),
      },
      {
        path: "501",
        name: "Page501",
        component: () => import(/* webpackChunkName: "Page501" */ "./../views/exception/Page501.vue"),
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

export const routes: Array<RouteRecordRaw> = window.__POWERED_BY_WUJIE__?commonRoutes:devRoutes;

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
});
export default router;
