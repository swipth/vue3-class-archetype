import {defaultLanguage} from "@/config/setting";

// @ts-ignore
export const getLanguage = () => window.$wujie?.props.language || defaultLanguage;

// @ts-ignore
export const getToken = () => window.$wujie?.props.token

// 记录退出弹框数量
export const setErrorModalNumber = () => {
  sessionStorage.setItem("ErrorModalNumber", "1");
};
export const getErrorModalNumber = () => sessionStorage.getItem("ErrorModalNumber");
export const removeErrorModalNumber = () => sessionStorage.removeItem("ErrorModalNumber");
