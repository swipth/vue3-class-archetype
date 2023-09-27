/**
 * @Author: swipth
 * @Description: axios 下载文件并保存
 *  下载请求示例  默认get请求 参照此示例 不要在组件中直接调用  ajaxDownload
 *  export const downloadExcel = ajaxDownload("/stock/excel/total/data",{time: this.selectedTime})
 *  downloadExcel()
 */
import { Modal } from "ant-design-vue";
import { ModalConfirm } from "ant-design-vue/types/modal";
import axios, { AxiosResponse, Method } from "axios";
import NProgress from "nprogress";
import i18n from "@/locales/i18n";
import { AjaxRes } from "@/types/common";
import { messageName } from "@/config/network";

let modal: ModalConfirm;
/**
 * 自定义axios下载
 * @param url
 * @param params
 * @param method
 * @param data
 * @param name
 */
export const ajaxDownload = (url: string, params: Record<string, unknown> = {}, method: Method = "GET", data: Record<string, unknown> = {}, name?: string) => {
  return new Promise<void>((resolve, reject) => {
    NProgress.start();
    fileDownload(url, params, method, data)
      .then((response: AxiosResponse) => {
        convertRes2Blob(response, name);
        resolve();
      })
      .catch((error) => {
        NProgress.done();
        // 存在弹窗再销毁
        if (modal) modal.destroy();
        if (typeof error === "object") {
          if (error.type) {
            if (error.type === 404) {
              Modal.error({ content: "服务端找不到文件", centered: true });
            }
            if (error.response) {
              if (error.response.status === 404) {
                Modal.error({ content: "服务端找不到文件", centered: true });
              } else {
                Modal.error({ content: "文件下载失败了", centered: true });
              }
            } else {
              Modal.error({ content: "文件内容解析失败", centered: true });
            }
          }
          reject(error);
        }
      });
  });
};

const fileDownload = (url: string, params: Record<string, unknown>, method: Method, data: Record<string, unknown>) => {
  modal = Modal.info({ title: i18n.t("文件下载"), content: i18n.t("开始下载"), centered: true, okText: i18n.t("关闭") as string });
  // tips: 这里直接返回的是response整体!
  return axios({
    url,
    method,
    params,
    data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
    responseType: "blob",
    timeout: 120000, // 如果服务器文件较大的，这里超时时间可以设置长一点
    onDownloadProgress: (e) => {
      if (e.lengthComputable) {
        // 对原生进度事件的处理
        // parseInt((e.loaded / e.total) * 100) };
        // 下载完成
        modal.update({ content: i18n.t("当前文件下载进度") + "：" + ((e.loaded / e.total) * 100).toFixed(2) + "%" });
        if (e.loaded === e.total) {
          NProgress.set(e.loaded / e.total);
          modal.destroy();
          // message.success(`下载耗时：${e.timeStamp.toFixed(0)/1000}s`)
        }
      }
    },
  });
};

// 将响应体转换为文件下载
const convertRes2Blob = async (response: AxiosResponse, name?: string) => {
  // 提取文件名
  let fileName = "";
  const responseJson: AjaxRes = await blobToObj(response.data);
  if (!responseJson.success) {
    Modal.error({
      title: i18n.t("接口温馨提醒"),
      content: responseJson[messageName] as string,
    });
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
  // 将二进制流转为blob
  const blob = new Blob([response.data]);
  // @ts-ignore
  if (typeof window.navigator["msSaveBlob"] !== "undefined") {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    // @ts-ignore
    window.navigator.msSaveBlob(blob, decodeURI(fileName));
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob);
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", decodeURI(fileName));
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    // 挂载a标签
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL);
  }
};

// 下载过程中断请求
/*
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
}).catch(err => console.dir(err));
// 取消请求
controller.abort();
*/

// import streamSaver from 'streamsaver'

/**
 * 原生fetch 下载 Download
 * @param url
 * @param params
 * @param method
 * @param data
 * @param name
 */
// export function fileDownloadHandle(url: string, method: Method, params = {}, data: any, name = "文件下载") {
//   let newUrl = url
//   if (JSON.stringify(params) !== "{}") {
//     if (!newUrl.includes("?")) newUrl += "?"
//     Object.keys(params).forEach(key => newUrl += (key + "=" + params[key]));
//   }
//   fetch(newUrl, {
//     method,
//     body: data,
//   }).then(res => {
//     const fileStream = streamSaver.createWriteStream(name, {
//       size: Number(res.headers.get("content-length") || 0)
//     })
//     const readableStream = res.body;
//     if (window.WritableStream && readableStream && readableStream.pipeTo) {
//       return readableStream.pipeTo(fileStream).then(() => {
//
//       })
//     }
//     // @ts-ignore
//     window.writer = fileStream.getWriter();
//     const reader = res.body?.getReader();
//     // @ts-ignore
//     const pump = () => reader?.read().then(res => res.done ? window.writer.close() : window.writer.write(res.value).then(pump))
//     pump();
//   })
// }

// 转换方法
export const blobToObj = (data: Blob): Promise<AjaxRes> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(data, "utf-8");
    reader.onload = function () {
      try {
        resolve(JSON.parse(reader.result as string));
      } catch (error) {
        resolve({
          code: 200,
          success: true,
          data: null,
          message: "当前信息为数据流信息，接口正常",
          timestamp: "2023-10-06",
        });
      }
    };
  });
};
