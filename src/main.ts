import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "./store";
import { setupI18n } from "@/locales";
import { setup } from "@/plugins/antd";
import "./registerServiceWorker";
import "./styles/index.less";
import "./router/guard"

if (window.__POWERED_BY_WUJIE__) {
  let instance:any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(App);
    instance.use(router);
    setup(instance);
    setupStore(instance);
    setupI18n(instance);
    instance.mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
} else {
  const app = createApp(App);
  setupI18n(app);
  setupStore(app);
  setup(app);
  app.use(router).mount("#app");
}
