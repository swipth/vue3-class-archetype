import NProgress from "nprogress"; // Progress 进度条
import router from "@/router/index";

NProgress.configure({showSpinner: false});
router.beforeEach((to, from, next: () => void) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
