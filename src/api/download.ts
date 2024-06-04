import {Modal} from "ant-design-vue";
import axios, {AxiosResponse, Method} from "axios";
import NProgress from "nprogress";
import {networkKey} from "@/api/config/network";
import {AjaxRes} from "@/types/common/apiResponse";

let modal: any;
export const ajaxDownload = (url: string, params: Record<string, unknown> = {}, method: Method = "GET", data: Record<string, unknown> = {}, name?: string) => {
  return new Promise<void>((resolve, reject) => {
    NProgress.start();
    fileDownload(url, params, method, data).then((response: AxiosResponse) => {
      convertRes2Blob(response, name);
      resolve();
    }).catch((error) => {
      NProgress.done();
      if (modal) modal.destroy();
      if (typeof error === "object") {
        if (error.type) {
          if (error.type === 404) {
            Modal.error({content: "Not Found File", centered: true});
          }
          if (error.response) {
            if (error.response.status === 404) {
              Modal.error({content: "Not Found File", centered: true});
            } else {
              Modal.error({content: "Download Error", centered: true});
            }
          } else {
            Modal.error({content: "File Parse Error", centered: true});
          }
        }
        reject(error);
      }
    });
  });
};
const fileDownload = (url: string, params: Record<string, unknown>, method: Method, data: Record<string, unknown>) => {
  modal = Modal.info({title: "File Download", content: "Starting Download", centered: true, okText: "Close"});
  return axios({
    url,
    method,
    params,
    data,
    headers: {Accept: "application/json", "Content-Type": "application/json; charset=utf-8",},
    responseType: "blob",
    timeout: 120000,
    onDownloadProgress: (e: any) => {
      if (e.lengthComputable) {
        modal.update({content: +"Current Progress ：" + ((e.loaded / e?.total) * 100).toFixed(2) + "%"});
        if (e.loaded === e.total) {
          NProgress.set(e.loaded / e.total);
          modal.destroy();
        }
      }
    },
  });
};
const convertRes2Blob = async (response: AxiosResponse, name?: string) => {
  let fileName = "";
  const responseJson: AjaxRes = await blobToObj(response.data);
  if (!responseJson.success) {
    showErrorModal(responseJson[networkKey.messageName]);
    modal.destroy();
    NProgress.done();
    return;
  }
  try {
    fileName = response.headers["content-disposition"]?.replace(/^attachment;file(N|n)ame=/, "");
  } catch (error) {
    throw new Error("服务端找不到文件");
  }
  fileName = name ? name : fileName;
  const blob = new Blob([response.data]);
  if (typeof window.navigator["msSaveBlob"] !== "undefined") {
    window.navigator.msSaveBlob(blob, decodeURI(fileName));
  } else {
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", decodeURI(fileName));
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
};
export const blobToObj = (data: Blob): Promise<AjaxRes> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(data, "utf-8");
    reader.onload = function () {
      try {
        resolve(JSON.parse(reader.result as string));
      } catch (error) {
        if (typeof reader.result === "string" && (reader.result as string).includes("不存在"))
          resolve({code: 500, success: false, data: null, message: (reader.result as string) || "The file does not exist", timestamp: "2023-10-06",}); else
          resolve({code: 200, success: true, data: null, message: "数据流返回正常", timestamp: "",});
      }
    };
  });
};
