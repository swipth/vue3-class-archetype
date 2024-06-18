import {ajax} from "@/api/ajax";

export const checkVersion = () => ajax({url: process.env.VUE_APP_BASE_URL + "static/version.json", method: "GET", baseURL: "/"});
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {currentVersion} = require("../version/info");
import {Modal} from "ant-design-vue";
import {AjaxRes} from "@/types/common/apiResponse";

const showVersionModal = false;

export function versionCheck(callback?: () => void) {
  if (process.env.NODE_ENV === "development") {
    callback?.();
    return;
  }
  checkVersion().then((res: AjaxRes) => {
    if (res.success) {
      if (currentVersion !== res.data.version) {
        if (!showVersionModal) refreshPage(); else {
          if (!getErrorModalNumber()) {
            Modal.info({centered: true, title: "Tip", content: "New Version " + res.data.version + "will be updated", okText: "Confirm", onOk: refreshPage,});
          }
          setErrorModalNumber();
        }
      } else callback?.();
    }
  });
}

export function refreshPage() {
  removeErrorModalNumber();
  window.$wujie?.props?.reload();
  // const url = new URL(location.href);
  // if (url.searchParams.get("t")) location.reload(); else url.searchParams.append("t", String(Date.now()));
  // location.href = url.href;
}

function getUrlQuery(params: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(params);
}

export function compareTimeValid() {
  const oldTime = Number(getUrlQuery("t"));
  return Date.now() - oldTime < 2 * 60 * 1000;
}

export const setErrorModalNumber = () => {
  sessionStorage.setItem("ErrorModalNumber", "1");
};
export const getErrorModalNumber = () => sessionStorage.getItem("ErrorModalNumber");
export const removeErrorModalNumber = () => sessionStorage.removeItem("ErrorModalNumber");
