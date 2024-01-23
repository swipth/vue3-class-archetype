// 版本监控
import {ajax} from "@/api/ajax";

export const checkVersion = () => ajax({ url: process.env.VUE_APP_BASE_URL + "static/version.json", method: "GET", baseURL: "/" });
const { currentVersion } = require("../../version/info");
import { Modal } from "ant-design-vue";
export interface AjaxRes {
  code: number;
  data: any | null;
  result?: any | null;
  success: boolean;
  timestamp: string;
  message: string;
}

// 是否显示弹框提示刷新
const showVersionModal=false;

/**
 * 版本检测
 */
export function versionCheck(callback?: () => void) {
  if (process.env.NODE_ENV === "development") {
    callback?.();
    return;
  }
  checkVersion().then((res: AjaxRes) => {
    if (res.success) {
      if (currentVersion !== res.data.version) {
        if (!showVersionModal) refreshPage();
        else {
          if (!getErrorModalNumber()) {
            Modal.info({
              centered: true,
              title: "Tip",
              content: "New Version " + res.data.version + "will be updated",
              okText: "Confirm",
              onOk: refreshPage,
            });
          }
          setErrorModalNumber();
        }
      } else callback?.();
    }
  });
}

// 刷新当前页面
export function refreshPage() {
  removeErrorModalNumber();
  const url = new URL(location.href);
  if (url.searchParams.get("t")) location.reload();
  else url.searchParams.append("t", String(Date.now()));
  location.href = url.href;
}

/**
 * 获取 url中参数
 * @param params
 */
function getUrlQuery(params: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(params);
}

/**
 * @return 返回一个当前url地址参数t是否有效的结果
 */
export function compareTimeValid() {
  const oldTime = Number(getUrlQuery("t"));
  return Date.now() - oldTime < 2 * 60 * 1000;
}
// 记录退出弹框数量
export const setErrorModalNumber = () => {
  sessionStorage.setItem("ErrorModalNumber", "1");
};
export const getErrorModalNumber = () => sessionStorage.getItem("ErrorModalNumber");
export const removeErrorModalNumber = () => sessionStorage.removeItem("ErrorModalNumber");
