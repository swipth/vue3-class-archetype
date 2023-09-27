import antd from "ant-design-vue";

// @ts-ignore
import PbDesignVue3 from "pb-design-vue3";
// const language = window.$wujie.props.language;

// @ts-ignore
export const setup = (app) => {
  app.use(PbDesignVue3);
  app.use(antd);
};
