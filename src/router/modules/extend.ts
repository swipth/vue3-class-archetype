import {RouteRecordRaw} from "vue-router";

export const extendRoutes: Array<RouteRecordRaw> = [
  {
    path: "/workbench",
    name: "Workbench",
    component: () => import(/* webpackChunkName: "Workbench" */ "@/views/admin/portal/Workbench.vue"),
    meta: {
      title: "工作台",
    }
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    component: () => import(/* webpackChunkName: "DictionarySetting" */ "@/views/admin/system/DictionarySetting.vue"),
    meta: {
      title: "数据字典"
    }
  },
  {
    path: "/dictionaryType",
    name: "DictionaryType",
    component: () => import(/* webpackChunkName: "DictionaryType" */ "@/views/admin/system/DictionaryType.vue"),
    meta: {
      title: "数据字典分类"
    }
  },
]
