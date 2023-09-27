import { createStore } from "vuex";
import app from "./modules/app";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { app }
});

export function setupStore(app:any):void {
  app.use(store);
}

export default store;
