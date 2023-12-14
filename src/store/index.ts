import { createStore } from "vuex";
import app from "./modules/app";
import {App} from "vue";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { app }
});

export function setupStore(app:App):void {
  app.use(store);
}

export default store;
