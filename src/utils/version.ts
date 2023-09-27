// 版本监控
import { checkVersion } from "@/api/interface/version";

const { currentVersion } = require("../../version/info");
import { Modal } from "ant-design-vue";
import { AjaxRes } from "@/types/common";
import i18n from "@/locales/i18n";
import { getErrorModalNumber, removeErrorModalNumber, setErrorModalNumber } from "@/utils/clientStorage";
import { showVersionModal } from "@/config/setting";

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
              title: i18n.t("提示"),
              content: i18n.t("系统发现新版本") + res.data.version + i18n.t("即将进行更新"),
              okText: i18n.t("确定") as string,
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
