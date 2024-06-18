import {RouteRecordRaw} from "vue-router";

export const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: "/exception",
    name: "Exception",
    component: () => import(/* webpackChunkName: "Exception" */ "@/views/exception/Exception.vue"),
    meta: {title: "Exception"},
    children: [
      {
        path: "404",
        name: "Page404",
        component: () => import(/* webpackChunkName: "Page404" */ "@/views/exception/Page404.vue"),
      },
      {
        path: "500",
        name: "Page500",
        component: () => import(/* webpackChunkName: "Page500" */ "@/views/exception/Page500.vue"),
      },
      {
        path: "501",
        name: "Page501",
        component: () => import(/* webpackChunkName: "Page501" */ "@/views/exception/Page501.vue"),
      },
    ]
  },
  // {
  //   name: "NotFound",
  //   path: "/:pathMatch(.*)*",
  //   redirect: "/exception/404",
  // },
];
