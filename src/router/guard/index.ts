import NProgress from "nprogress"; // Progress 进度条
import router from "@/router/index";
import setPageTitle from "@/config/pageTitle";

NProgress.configure({showSpinner: false});
router.beforeEach((to, from, next: () => void) => {
  NProgress.start();
  next();
});
router.afterEach((to) => {
  setPageTitle(to.meta)
  NProgress.done(); // 结束Progress
});
