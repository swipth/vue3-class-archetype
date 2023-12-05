import antd from "ant-design-vue";
import {App} from "vue";
// const language = window.$wujie.props.language;

export const setup = (app:App) => {
  app.use(antd);
};
