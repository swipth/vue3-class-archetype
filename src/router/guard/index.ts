import {Route} from "vue-router";
import NProgress from "nprogress"; // Progress 进度条
import router from "@/router/index";

NProgress.configure({showSpinner: false});
router.beforeEach((to: Route, from: Route, next: () => void) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
